import { FormEvent, useState, useEffect } from "react";
import dataBank, {
  getPotNamesByLang,
  getPotCodeByName,
  getPotName,
} from "../../utils/dataBank.ts";
import {
  sanitizeString,
  isValidPot,
  getPotMapSvgUrl,
  getOkNokEmoji,
  changeHtmlItemClass,
  getColorOfStatus,
} from "../../utils/utils.ts";
import { GameState } from "../../types/data.ts";
import defaultGameState from "../../utils/gameState.ts";
import { useTranslation } from "react-i18next";
import { GameRoundProps } from "../../types/GameRoundProps.ts";
import { PotCode } from "../../types/data.ts";
import { AutoSuggestInput } from "../AutoSuggestInput/AutoSuggestInput.tsx";
import { GuessButton } from "../GuessButton/GuessButton.tsx";
import i18n from "../../utils/i18n.ts";

function GameRoundNeighbors({
  currentRoundStatus,
  setCurrentRoundStatus,
}: GameRoundProps) {
  const { t } = useTranslation();
  const { t: tGeo } = useTranslation("geo");
  const idPrefix: string = "roundNbor-";
  // const t = i18n.getFixedT("LOLcalize");

  const gameState: GameState = defaultGameState;
  const neighbors: string[] = dataBank[gameState.potCode as PotCode].neighbors;

  const maxAttempts = neighbors.length + 2;
  const [guesses, setGuesses] = useState<string[]>([]);
  const [guessedCodes, setGuessedCodes] = useState<string[]>([]);
  const [correctGuessNum, setCorrectGuessNum] = useState<number>(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [zoomedPot, setZoomedPot] = useState<string>("");

  useEffect(() => {
    if (guesses.length === maxAttempts) {
      console.log(`Game over! (${currentRoundStatus})`);
    }
    setCurrentGuess("");
  }, [guesses, zoomedPot]);

  const handleFormSubmission = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!isValidPot(currentGuess, i18n.language)) {
      console.log("Unknown province or territory!");
      return;
    }

    if (guesses.includes(currentGuess)) {
      console.log("Already Guessed!");
      return;
    }

    const isGuessCorrect = neighbors.some(
      apot => sanitizeString(tGeo(apot)) === sanitizeString(currentGuess)
    );
    const guessedPot = getPotCodeByName(currentGuess);
    if (isGuessCorrect) {
      console.log(`You guessed it! : ${guessedPot} neighbors:${neighbors}`);
      changeHtmlItemClass(`guess-${idPrefix}-${guessedPot}`, "bg-green-500");
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
    setGuessedCodes([...guessedCodes, guessedPot]);
    console.log(
      `guess:${guessedPot} status: ${currentRoundStatus} guesses:[${guesses}] neighbors:[${neighbors}]`
    );
  };

  const handleGuessButtonClicked = (): void => {
    console.log("Guess button clicked.");
  };

  const toggleZoom = (aPot: string) => {
    console.log(`zoom: pot:${aPot} current: ${zoomedPot}`);
    if (zoomedPot === aPot) {
      setZoomedPot("");
    } else {
      setZoomedPot(aPot);
    }
  };

  //const numCols = 4;
  return (
    <div>
      <div className="gap-1 text-center">
        <p>
          {t("gameNeighborRoundInstruction")}{" "}
          <i>{tGeo(`of_${gameState.potCode}`)}</i>
          {"?"}
        </p>
      </div>
      <div className={`grid grid-cols-4 gap-1 text-center py-0.5 my-5`}>
        {Array.from({ length: neighbors.length }, (_, i) => {
          const aPot = dataBank[gameState.potCode as PotCode].neighbors[i];
          const lastRowOdd = i == neighbors.length - 1 && i % 2 == 0;
          const bgColor: string = guessedCodes.includes(neighbors[i])
            ? getColorOfStatus("won")
            : getColorOfStatus(currentRoundStatus);
          return (
            <div
              id={`guess-${idPrefix}-${aPot}`}
              className={`cursor-zoom-in col-span-2 ${lastRowOdd ? "col-start-2" : ""} border-2 rounded-xl border-gray-700`}
              onClick={() => toggleZoom(aPot)}
            >
              <img
                src={getPotMapSvgUrl(aPot as PotCode)}
                alt="silhouette of a province or territory"
                className="max-h-24 m-auto my-5 transition-transform duration-700 ease-in dark:invert h-full"
              />
              <p
                className={`visible rounded-2xl -m-1 text-black bg-${bgColor}`}
              >
                {guessedCodes.includes(neighbors[i]) ||
                currentRoundStatus !== "pending"
                  ? tGeo(neighbors[i])
                  : t("guessVerb")}
              </p>
            </div>
          );
        })}
      </div>
      {zoomedPot !== "" ? (
        <div
          className="fixed bottom-1/2 left-1/2 w-64 transform -translate-x-1/2 bg-custom-light-blue-2 text-white p-4 border-4 rounded-2xl shadow-lg z-50"
          onClick={() => toggleZoom(zoomedPot)}
        >
          <img
            src={getPotMapSvgUrl(zoomedPot as PotCode)}
            alt="silhouette of a province or territory"
            className="max-h-64 m-auto my-5 transition-transform duration-700 ease-in dark:invert h-full"
          />
        </div>
      ) : (
        <></>
      )}
      <form
        onSubmit={handleFormSubmission}
        className={`flex flex-col py-0.5 ${currentRoundStatus !== "pending" ? "hidden" : ""}`}
      >
        <div className="flex flex-grow">
          <AutoSuggestInput
            currentGuess={currentGuess}
            setCurrentGuess={setCurrentGuess}
            placeholder={`${t("province")}, ${t("territory")}`}
            suggestionsArray={getPotNamesByLang(i18n.language)}
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
        <div>
          {Array.from({ length: maxAttempts }, (_, i) => {
            const guessCode: string = guessedCodes[i]; // guessedCodes[i]
            return guessedCodes[i] ? (
              <div
                key={i}
                className="grid grid-cols-7 gap-1 text-center py-0.5"
              >
                <div className="my-guess-div col-span-6">
                  <p className="my-guess-p">
                    {getPotName(guessCode as PotCode) || "-"}
                  </p>
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
