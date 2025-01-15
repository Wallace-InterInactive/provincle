import { FormEvent, useState, useEffect } from "react";
import { GameRoundResult, PotCode, DataBank } from "../../types/data.ts";
import {
  getOkNokEmoji,
  getColorOfStatus,
  getAllCityCodes,
  getKeyMatchingSanitizedValue,
} from "../../utils/utils.ts";
import { GameRoundProps } from "../../types/GameRoundProps.ts";
import { GameRoundPropsExtended } from "../../types/GameRoundPropsExtended.ts";
import { AutoSuggestInput } from "../AutoSuggestInput/AutoSuggestInput.tsx";
import { GuessButton } from "../GuessButton/GuessButton.tsx";
import {
  SQUARE_ANIMATION_LENGTH,
  squares,
  toastError,
  toastSuccess,
} from "../../utils/animations.ts";
import confetti from "canvas-confetti";

export function GameRoundCapital(props: GameRoundProps) {
  const gameState = props.gameState;
  const dataBank: DataBank = props.dataBank;
  const extendedProps: GameRoundPropsExtended = {
    ...props,
    roundInstructionId: "gameCapitalRoundInstruction",
    target: dataBank.data[gameState.potCode as PotCode].capital,
    possibleValues: dataBank.getCities(dataBank.tGeo),
    maxAttempts: 3,
  };
  return GameRoundTextInputWithImage(extendedProps);
}

function GameRoundTextInputWithImage({
  gameRoundId,
  gameState,
  currentRoundStatus,
  setCurrentRoundStatus,
  dataBank,
  setRoundResult,
  roundInstructionId,
  target,
  possibleValues,
  maxAttempts,
}: GameRoundPropsExtended) {
  const potNameOf: string = dataBank.tGeo(`of_${gameState.potCode}`);
  if (potNameOf === `of_${gameState.potCode}`) {
    // add default, when i18n:of_pot is not defined
    potNameOf === `of ${dataBank.tGeo(gameState.potCode)}`;
  }

  const cityCodeList: string[] = getAllCityCodes(dataBank);

  //export function GameRound1( currentRoundStatus, setCurrentRoundStatus) {
  //const [gameState] = useState(defaultGameState);
  const [guesses, setGuesses] = useState<string[]>([]);

  // TODO: these two can and should be extracted to the input component easily (can be defined there)
  const [currentGuess, setCurrentGuess] = useState("");

  useEffect(() => {
    if (guesses.length === maxAttempts) {
      console.log(`Game over! (${currentRoundStatus})`);
    }
    setCurrentGuess("");
  }, [guesses]);

  // prettier-ignore
  function grade(guessedCityCode: string): GameRoundResult {
    if (guessedCityCode === target) {
      return guesses.length === 0 ? GameRoundResult.Excellent
           : guesses.length === 1 ? GameRoundResult.Good
           :                        GameRoundResult.Fair;
    } else {
      return guesses.length === 0 ? GameRoundResult.NotStarted
                                  : GameRoundResult.Failed;
    }
  }

  const handleFormSubmission = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const cityCode = getKeyMatchingSanitizedValue(
      currentGuess,
      cityCodeList,
      dataBank.tGeo
    );

    if (cityCode === "invalid") {
      toastError(dataBank.tLang("unknownCity"));
      return;
    }

    if (guesses.includes(cityCode)) {
      toastError(dataBank.tLang("alreadyGuessed"));
      return;
    }

    setGuesses([...guesses, cityCode]);

    if (cityCode === target) {
      toastSuccess(dataBank.tLang("guessedIt"));
      confetti();
      setCurrentRoundStatus("won");
      setRoundResult(gameRoundId, grade(cityCode));
    } else if (guesses.length + 1 === maxAttempts) {
      //setCurrentRoundStatus("lost");
      setTimeout(() => {
        setCurrentRoundStatus("lost");
      }, SQUARE_ANIMATION_LENGTH * squares.length);
      setRoundResult(gameRoundId, grade(cityCode));
    }
  };

  function getGuessResult(guess: string, target: string): string {
    return getOkNokEmoji(guess === target);
  }

  const handleGuessButtonClicked = (): void => {
    console.log("Guess button clicked.");
  };

  const guessNoun: string = dataBank.tLang("guessNoun");

  return (
    <div>
      {dataBank.tLang(roundInstructionId) === "" ? (
        <div />
      ) : (
        <div className="gap-1 text-center">
          <p>{`${dataBank.tLang(roundInstructionId)} ${potNameOf}?`}</p>
        </div>
      )}
      <div>
        <img
          src={dataBank.getPotMapSvgUrl(gameState.potCode as PotCode)}
          alt="silhouette of a province or territory"
          className="max-h-52 m-auto my-5 transition-transform duration-700 ease-in dark:invert h-full"
        />
      </div>
      {/* page part 2: the input field */}
      <form
        onSubmit={handleFormSubmission}
        className={`flex flex-col dark:bg-slate-800 py-0.5 ${currentRoundStatus !== "pending" ? "hidden" : ""}`}
      >
        <div className="flex flex-grow">
          <AutoSuggestInput
            currentGuess={currentGuess}
            setCurrentGuess={setCurrentGuess}
            placeholder={`${dataBank.tLang("capitalCity")}`}
            suggestionsArray={possibleValues}
          />
          <GuessButton
            handler={handleGuessButtonClicked}
            text={`${dataBank.getGuessEmoji()} ${dataBank.tLang("guessVerb")}`}
          />
        </div>
      </form>
      {/* page part 3a: feedback part, won/lost/etc */}
      <div>
        {currentRoundStatus === "pending" ? (
          <div className="grid grid-cols-6 gap-1 text-center py-0.5">
            <div className="my-div-1">
              <span className="opacity-70">
                {guessNoun} {guesses.length + 1} / {maxAttempts}
              </span>
            </div>
          </div>
        ) : (
          <div className="my-span-2">
            <span
              className={`my-span-3 text-black  bg-${getColorOfStatus(currentRoundStatus)}`}
            >
              {dataBank.tGeo(target)}
            </span>
          </div>
        )}
        {/* page part 3b: feedback: list of submitted guesses  */}
        <div>
          {Array.from({ length: maxAttempts }, (_, i) => {
            const guess: string = guesses[i];
            return guesses[i] ? (
              <div
                key={i}
                className="grid grid-cols-[5fr_1fr] gap-1 text-center py-0.5"
              >
                <div className="my-guess-div">
                  <p className="my-guess-p">
                    {dataBank.tGeo(guesses[i]) || "-"}
                  </p>
                </div>
                <div className="my-guess-div">
                  <p className="my-guess-p text-xl">
                    {getGuessResult(guess, target)}
                  </p>
                </div>
              </div>
            ) : (
              <div
                key={i}
                className="grid grid-cols-6 gap-1 text-center py-0.5"
              >
                <div className="my-guess-open col-span-6" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default GameRoundCapital;
