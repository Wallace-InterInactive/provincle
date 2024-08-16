import { FormEvent, useState, useEffect } from "react";
import dataBank, { potNames, getPotCode } from "../../utils/dataBank.ts";
import {
  sanitizeString,
  isValidPot,
  getPotMapSvgUrl,
  getOkNokEmoji,
  changeHtmlItemClass,
} from "../../utils/utils.ts";
import { GameState } from "../../types/data.ts";
import defaultGameState from "../../utils/gameState.ts";
import { useTranslation } from "react-i18next";
import { GameRoundProps } from "../../types/GameRoundProps.ts";
import { PotCode } from "../../types/data.ts";
import { AutoSuggestInput } from "../AutoSuggestInput/AutoSuggestInput.tsx";
import { GuessButton } from "../GuessButton/GuessButton.tsx";

function GameRoundNeighbors({
  currentRoundStatus,
  setCurrentRoundStatus,
}: GameRoundProps) {
  const { t } = useTranslation();
  const idPrefix: string = "roundNbor-";
  // const t = i18n.getFixedT("LOLcalize");

  const gameState: GameState = defaultGameState;
  const neighbors: string[] = dataBank[gameState.potCode as PotCode].neighbors;

  const maxAttempts = neighbors.length + 2;
  const [guesses, setGuesses] = useState<string[]>([]);
  const [correctGuessNum, setCorrectGuessNum] = useState<number>(0);
  const [currentGuess, setCurrentGuess] = useState("");

  useEffect(() => {
    if (guesses.length === maxAttempts) {
      console.log(`Game over! (${currentRoundStatus})`);
    }
    setCurrentGuess("");
  }, [guesses]);

  const handleFormSubmission = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!isValidPot(currentGuess)) {
      console.log("Unknown province or territory!");
      return;
    }

    if (guesses.includes(currentGuess)) {
      console.log("Already Guessed!");
      return;
    }

    const isGuessCorrect = neighbors.some(
      apot =>
        sanitizeString(dataBank[apot as PotCode].name) ===
        sanitizeString(currentGuess)
    );
    const guessedPot = getPotCode(currentGuess);
    if (isGuessCorrect) {
      console.log(`You guessed it! : ${guessedPot} neighbors:${neighbors}`);
      changeHtmlItemClass(`guess-${idPrefix}-${guessedPot}`, "bg-green-700");
      if (correctGuessNum == neighbors.length - 1) {
        setCurrentRoundStatus("won");
      }
      setCorrectGuessNum(correctGuessNum + 1);
    } else if (guesses.length + 1 === maxAttempts) {
      setCurrentRoundStatus("lost");
    } else {
      console.log("You didn't guess it!");
    }

    setGuesses([...guesses, currentGuess]);
    console.log("currentRoundStatus:", currentRoundStatus);
  };

  const handleGuessButtonClicked = (): void => {
    console.log("Guess button clicked.");
  };

  //const numCols = 4;
  return (
    <div>
      <div className="gap-1 text-center">
        <p>
          {t("gameNeighborRoundInstruction")}{" "}
          <i>{dataBank[gameState.potCode as PotCode].name}</i>
        </p>
      </div>
      <div className={`grid grid-cols-4 gap-1 text-center py-0.5 my-5`}>
        {Array.from({ length: neighbors.length }, (_, i) => {
          const aPot = dataBank[gameState.potCode as PotCode].neighbors[i];
          const lastRowOdd = i == neighbors.length - 1 && i % 2 == 0;
          return (
            <div
              id={`guess-${idPrefix}-${aPot}`}
              className={`col-span-2 ${lastRowOdd ? "col-start-2" : ""} border-2 rounded-xl border-gray-700`}
            >
              <img
                src={getPotMapSvgUrl(aPot as PotCode)}
                alt="silhouette of a province or territory"
                className="max-h-24 m-auto my-5 transition-transform duration-700 ease-in dark:invert h-full"
              />
            </div>
          );
        })}
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
            suggestionsArray={potNames}
          />
          <GuessButton
            onClick={handleGuessButtonClicked}
            text={`🍁 ${t("guessVerb")}`}
          />
        </div>
      </form>
      {/* page part 3a: feedback part, won/lost/etc */}
      <div>
        {currentRoundStatus === "pending" ? (
          <div className="grid grid-cols-6 gap-1 text-center py-0.5">
            <div className="my-div-1">
              <span className="opacity-70">
                {t("guessNoun")} {guesses.length + 1} / {maxAttempts}
              </span>
            </div>
          </div>
        ) : (
          <div />
        )}
        {/* page part 3b: feedback: list of submitted guesses  */}
        <div>
          {Array.from({ length: maxAttempts }, (_, i) => {
            const guessCode = getPotCode(guesses[i]);
            return guesses[i] ? (
              <div
                key={i}
                className="grid grid-cols-7 gap-1 text-center py-0.5"
              >
                <div className="my-guess-div col-span-6">
                  <p className="my-guess-p">{guesses[i] || "-"}</p>
                </div>
                <div className="my-guess-div">
                  <p className="my-guess-p text-xl">
                    {getOkNokEmoji(neighbors.includes(guessCode))}
                  </p>
                </div>
              </div>
            ) : (
              <div
                key={i}
                className="grid grid-cols-6 gap-1 text-center py-0.5"
              >
                <div className="my-div-2"></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default GameRoundNeighbors;
