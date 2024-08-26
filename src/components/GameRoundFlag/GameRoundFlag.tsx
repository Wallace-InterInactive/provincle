import { useState, useEffect } from "react";
import {
  getPotFlagSvgUrl,
  getColorOfStatus,
  shuffle,
  //changeHtmlItemClass,
} from "../../utils/utils.ts";
import defaultGameState from "../../utils/gameState.ts";
import "../../ImageGrid.css";
import { useTranslation } from "react-i18next";
import { GameRoundProps } from "../../types/GameRoundProps.ts";
import { PotCode } from "../../types/data.ts";
import { potCodes } from "../../utils/dataBank.ts";

const maxAttempts = 3;
const numFlagsToShow = 6;

function GameRoundFlag({
  currentRoundStatus,
  setCurrentRoundStatus,
}: GameRoundProps) {
  const { t } = useTranslation();
  // const t = i18n.getFixedT("LOLcalize");
  const { t: tGeo } = useTranslation("geo");

  const gameState = defaultGameState; // TODO: why useState() ?, just a shortCut for here
  const myPotList: string[] = Array.from(
    { length: potCodes.length },
    (_, i) => potCodes[i]
  );
  shuffle(myPotList);

  const [guesses, setGuesses] = useState<string[]>([]);

  const addGuess = (guess: string): void => {
    setGuesses([...guesses, guess]);
  };

  useEffect(() => {
    if (guesses.length === maxAttempts) {
      console.log(`Game over! (${currentRoundStatus})`);
    }
    //setCurrentGuess("");
  }, [guesses]);

  //const handleGuessButtonClickedRound2 = (guess:number): void => {
  const handleFlagGuessClicked = (e: any): void => {
    // TODO: get the id of the image clicked at...
    const guessedItem = `${e.target.id}`;
    const guess = guessedItem.split("-")[1];
    console.log(`Guess button clicked: '${e.target.id}'`);
    if (currentRoundStatus !== "pending" || guesses.includes(guess)) {
      return;
    }

    console.log(`current guess ${guessedItem}`);
    addGuess(guessedItem.split("-")[1]);
    if (`guess-${gameState.potCode}` == guessedItem) {
      setCurrentRoundStatus("won");
    } else if (guesses.length + 1 === maxAttempts) {
      setCurrentRoundStatus("lost");
    }
    // changeHtmlItemClass( guessedItem, border-won-lost )
  };

  return (
    <div>
      <div className="gap-1 text-center">
        <p>
          {t("gameFlagRoundInstruction")}{" "}
          <i>{tGeo(`of_${gameState.potCode}`)}</i>
          {"!"}
        </p>
      </div>
      <div>
        <div
          id="main"
          className="grid image-grid justify-items-stretch grid-cols-2"
        >
          {Array.from({ length: numFlagsToShow }, (_, i) => {
            // todo: extract these out
            // note: i0 is to ensure that myPotList[i0.. +6] to contains gameState.potCode
            // class...  transition-transform duration-500 ease-in
            const i0: number =
              myPotList.indexOf(gameState.potCode) < numFlagsToShow
                ? 0
                : myPotList.indexOf(gameState.potCode) - 4;
            const i1 = (i0 + i) % myPotList.length;
            const aPot: PotCode = myPotList[i1] as PotCode;
            const myBorder: string = !guesses.includes(aPot)
              ? "border-4 border-black"
              : aPot === gameState.potCode
                ? "border-4 border-green-700"
                : "border-4 border-red-600";
            const bgColor: string = !guesses.includes(aPot)
              ? getColorOfStatus("pending")
              : aPot === gameState.potCode
                ? getColorOfStatus("won")
                : getColorOfStatus("lost");
            return (
              <div className="image-item justify-self-auto rounded-lg m-4">
                <img
                  src={getPotFlagSvgUrl(aPot)}
                  alt={`flag of a pot:${i}:${aPot}`}
                  className={`cursor-pointer max-h-24 m-auto my-5 h-20 ${myBorder}`}
                  onClick={handleFlagGuessClicked}
                  id={`guess-${aPot}`}
                />
                <p
                  className={`visible h-6 rounded-2xl -m-1 text-black bg-${bgColor}`}
                >
                  {currentRoundStatus === "pending" && !guesses.includes(aPot) // or display if already guessed (show names or wrong guess)
                    ? t("guessVerb")
                    : tGeo(myPotList[i1])}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <br />
      <div>
        {currentRoundStatus === "pending" ? (
          <div
            className={`grid grid-cols-${numFlagsToShow} gap-1 text-center py-0.5`}
          >
            <div className="my-div-1">
              <span className="opacity-70">
                {t("guessNoun")} {guesses.length + 1} / {maxAttempts}
              </span>
            </div>
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

export default GameRoundFlag;
