import { FormEvent, useState, useEffect } from "react";
import dataBank, { potNames, getPotCode } from "../../utils/dataBank.ts";
import {
  sanitizeString,
  isValidPot,
  getPotMapSvgUrl,
  getDistanceWithUnitBySetting,
  getDirectionEmoji,
} from "../../utils/utils.ts";
import { GameState } from "../../types/data.ts";
import defaultGameState from "../../utils/gameState.ts";
import { useTranslation } from "react-i18next";
import { GameRoundProps } from "../../types/GameRoundProps.ts";
import { PotCode } from "../../types/data.ts";
import { AutoSuggestInput } from "../AutoSuggestInput/AutoSuggestInput.tsx";
import { GuessButton } from "../GuessButton/GuessButton.tsx";
//import { calculateAngle } from "../../utils/geo.ts";

function GameRoundNeighbors({
  currentRoundStatus,
  setCurrentRoundStatus,
}: GameRoundProps) {
  const { t } = useTranslation();
  // const t = i18n.getFixedT("LOLcalize");

  //const numFlagsToShow = 6;
  //export function GameRound1( currentRoundStatus, setCurrentRoundStatus) {
  //const [newGameState, setNewGameState] = useState(defaultGameState);
  const gameState: GameState = defaultGameState; // TODO: why useState() ?, just a shortCut for here
  const neighbors: string[] = dataBank[gameState.potCode as PotCode].neighbors;

  // TODO: should move to GameProps? as quasi-const it's of for the proof-of-concept
  // TODO: remove ts-ignore
  // @ts-ignore
  const { potCode, currentRound } = gameState;

  const maxAttempts = 3;
  //let currentRoundStatus: GameRoundStatus = "pending";
  const [guesses, setGuesses] = useState<string[]>([]);
  //const [giveupCnt, setGiveupCnt] = useState<number>(0);

  const addGuess = (guess: string): void => {
    setGuesses([...guesses, guess]);
  };

  const [currentGuess, setCurrentGuess] = useState("");

  //const [currentRoundStatus, setCurrentRoundStatus] =
  //  useState<GameRoundStatus>("pending");

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

    if (
      sanitizeString(dataBank[potCode as PotCode].name) ===
      sanitizeString(currentGuess)
    ) {
      console.log("You guessed it!");
      setCurrentRoundStatus("won");
    } else if (guesses.length + 1 === maxAttempts) {
      setCurrentRoundStatus("lost");
    } else {
      console.log("You didn't guess it!");
    }

    addGuess(currentGuess);
    console.log("currentRoundStatus:", currentRoundStatus);
  };

  const handleGuessButtonClicked = (): void => {
    console.log("Guess button clicked.");
  };

  //const numCols = 4;
  return (
    <div>
      {/* page part 1: the problem statement - not shown on original Worldle on 1st round
      <div className="gap-1 text-center">
        <p>Name the province or territory</p>
      </div>
       */}
      <div className={`grid grid-cols-4 gap-1 text-center py-0.5 my-5`}>
        {Array.from({ length: neighbors.length }, (_, i) => {
          const pot2 = dataBank[gameState.potCode as PotCode].neighbors[i];
          return (
            <div className="col-span-2">
              <img
                src={getPotMapSvgUrl(pot2 as PotCode)}
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
          <div className="my-span-2">
            <span
              className={`my-span-3 text-white ${currentRoundStatus === "won" ? "bg-green-700" : "bg-red-600"}`}
            >
              {dataBank[potCode as PotCode].name}
            </span>
          </div>
        )}
        {/* page part 3b: feedback: list of submitted guesses  */}
        <div>
          {Array.from({ length: maxAttempts }, (_, i) => {
            const guessCode = getPotCode(guesses[i]);
            //   {calculateDistance(potCode, guesses[i])} km
            //   {getDirectionFromSolution(potCode, guesses[i]) ?? "-"}
            return guesses[i] ? (
              <div
                key={i}
                className="grid grid-cols-7 gap-1 text-center py-0.5"
              >
                <div className="my-guess-div col-span-4">
                  <p className="my-guess-p">{guesses[i] || "-"}</p>
                </div>
                <div className="my-guess-div col-span-2">
                  <p className="my-guess-p">
                    {getDistanceWithUnitBySetting(
                      guessCode as PotCode,
                      potCode as PotCode
                    )}
                  </p>
                </div>
                <div className="my-guess-div">
                  {/* add commented-outs here, TO BE DELETED
                    <img src={arrowImageUrl} className={"rotate-90 " + getCssRotate(getImgRotateFromSolution(potCode, guessCode)) + " max-h-6 object-cover"} />
                     getcalculateDirectionOf(potCode, guessCode)
                    */}
                  <p className="my-guess-p text-xl">
                    {getDirectionEmoji(
                      guessCode as PotCode,
                      potCode as PotCode
                    )}
                  </p>

                  <div className={`-rotate-45`}>
                    {getDirectionEmoji("mb", "nu")}
                  </div>
                  {/* <div className={`rotate-${Math.floor(calculateAngle(
    dataBank[guessCode as PotCode].coordinates,dataBank[potCode as PotCode].coordinates))}`}>{getDirectionEmoji("mb","nu")}</div>  */}
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
