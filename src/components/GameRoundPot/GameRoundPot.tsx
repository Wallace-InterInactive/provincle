import { FormEvent, useState, useEffect } from "react";
import { sanitizeString } from "../../utils/utils.ts";
import { TFunction } from "i18next";
import { GameRoundProps } from "../../types/GameRoundProps.ts";
import { GameRoundResult, PotCode } from "../../types/data.ts";
import { AutoSuggestInput } from "../AutoSuggestInput/AutoSuggestInput.tsx";
import { GuessButton } from "../GuessButton/GuessButton.tsx";
import {
  SQUARE_ANIMATION_LENGTH,
  squares,
  toastError,
  toastFailed,
  toastSuccess,
} from "../../utils/animations.ts";
import { Guesses } from "../Guesses/Guesses.tsx";
import confetti from "canvas-confetti";

function GameRoundPot({
  gameRoundId,
  gameState,
  currentRoundStatus,
  dataBank,
  setCurrentRoundStatus,
  setRoundResult,
}: GameRoundProps) {
  const t: TFunction = dataBank.tLang;
  const tGeo = dataBank.tGeo;

  //const potCode: string = gameState.potCode;

  const maxAttempts = 3;

  const [guessNum, setGuessNum] = useState<number>(1);
  const incGuessNum = (): void => {
    setGuessNum(guessNum + 1);
  };

  const [guesses, setGuesses] = useState<string[]>([]);
  const addGuess = (guess: string): void => {
    setGuesses([...guesses, guess]);
  };

  const [currentGuess, setCurrentGuess] = useState("");

  useEffect(() => {
    // if (guesses.length === maxAttempts) {
    //   console.log(`Game over! (${currentRoundStatus})`);
    // }
    setCurrentGuess("");
  }, [guesses]);

  // prettier-ignore
  function grade(guess: string): GameRoundResult {
    //if (guess === gameState.potCode) {
    if (sanitizeString(tGeo(gameState.potCode)) === sanitizeString(guess)) {
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

    const guessedPot = dataBank.getPotCodeByName(currentGuess, tGeo); // sanitizeString(currentGuess) ??

    if (guessedPot === "invalid") {
      //if (!dataBank.isValidCode(currentGuess, tGeo)) {
      toastError(t("unknownPot"));
      return;
    }

    if (guesses.includes(guessedPot)) {
      toastError(t("alreadyGuessed"));
      return;
    }

    //if (sanitizeString(tGeo(potCode)) === sanitizeString(currentGuess)) {
    if (guessedPot === gameState.potCode) {
      setTimeout(() => {
        setCurrentRoundStatus("won");
        const guessedItText = t("guessedItList", {
          returnObjects: true,
        }) as string[];
        const randomText =
          guessedItText[Math.floor(Math.random() * guessedItText.length)];
        toastSuccess(randomText);
        confetti();
      }, SQUARE_ANIMATION_LENGTH * squares.length);
      setRoundResult(gameRoundId, grade(currentGuess));
      console.log("grade " + grade(currentGuess));
    } else if (guesses.length + 1 === maxAttempts) {
      setTimeout(() => {
        toastFailed(t("failedIt"));
        setCurrentRoundStatus("lost");
      }, SQUARE_ANIMATION_LENGTH * squares.length);
      setRoundResult(gameRoundId, grade(currentGuess));
    }

    //addGuess(currentGuess);
    addGuess(guessedPot);
    setTimeout(() => {
      incGuessNum();
    }, SQUARE_ANIMATION_LENGTH * squares.length);
    // console.log("currentRoundStatus:", currentRoundStatus);
  };

  const handleGuessButtonClicked = (): void => {
    console.log("Guess button clicked.");
  };

  return (
    <div>
      {/* page part 1: the problem statement - not shown on original Worldle on 1st round
      <div className="gap-1 text-center">
        <p>Name the province or territory</p>
      </div>
       */}
      <div>
        <img
          src={dataBank.getPotMapSvgUrl(gameState.potCode as PotCode)}
          alt="silhouette of a province or territory"
          className="max-h-52 m-auto my-5 transition-transform duration-700 ease-in dark:invert h-full"
        />
      </div>
      <form
        onSubmit={handleFormSubmission}
        className={`flex flex-col py-0.5 ${currentRoundStatus !== "pending" ? "hidden" : ""}`}
      >
        <div className="flex flex-grow">
          <AutoSuggestInput
            currentGuess={currentGuess}
            setCurrentGuess={setCurrentGuess}
            placeholder={`${t("province")}, ${t("territory")}`}
            suggestionsArray={dataBank.getPotNamesByLang(tGeo)}
          />
          <GuessButton
            handler={handleGuessButtonClicked}
            text={`${dataBank.getGuessEmoji()} ${t("guessVerb")}`}
          />
        </div>
      </form>
      <Guesses
        currentRoundStatus={currentRoundStatus}
        guesses={guesses}
        maxAttempts={maxAttempts}
        solutionCode={gameState.potCode as PotCode}
        guessNum={guessNum}
        dataBank={dataBank}
      />
    </div>
  );
}

export default GameRoundPot;
