import { useState, useEffect } from "react";
import {
  getPotFlagSvgUrl,
  getColorOfStatus,
  shuffle,
} from "../../utils/utils.ts";
import "../../ImageGrid.css";
import { useTranslation } from "react-i18next";
import { GameRoundProps } from "../../types/GameRoundProps.ts";
import { GameRoundResult, PotCode, GameRoundStatus } from "../../types/data.ts";
import { potCodes } from "../../utils/dataBank.ts";
import confetti from "canvas-confetti";
import { toastSuccess } from "../../utils/animations.ts";

const maxAttempts = 3;
const numFlagsToShow = 6;

function GameRoundFlag({
  gameRoundId,
  gameState,
  currentRoundStatus,
  setCurrentRoundStatus,
  setRoundResult,
}: GameRoundProps) {
  const { t } = useTranslation();
  // const t = i18n.getFixedT("LOLcalize");
  const { t: tGeo } = useTranslation("geo");
  const potNameOf: string = tGeo(`of_${gameState.potCode}`);

  // const gameState = defaultGameState; // TODO: why useState() ?, just a shortCut for here
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
      toastSuccess(t("guessedIt"));
      confetti();
      setRoundResult(gameRoundId, getResult("won", guesses.length + 1));
    } else if (guesses.length + 1 === maxAttempts) {
      setCurrentRoundStatus("lost");
      setRoundResult(gameRoundId, getResult("lost"));
    }
    // changeHtmlItemClass( guessedItem, border-won-lost )
  };

  function getResult(status:GameRoundStatus, num: number = 0): GameRoundResult {
    return (status !== "won") ? GameRoundResult.Abandoned
         : (num === 3) ? GameRoundResult.OneStar
         : (num === 2) ? GameRoundResult.TwoStars
         : (num === 1) ? GameRoundResult.ThreeStars
         : GameRoundResult.Abandoned;
  }

  return (
    <div>
      <div className="gap-1 text-center">
        <p>{`${t("gameFlagRoundInstruction")} ${potNameOf}!`}</p>
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
                  className={`cursor-pointer max-h-24 m-auto h-20 ${myBorder}`}
                  onClick={handleFlagGuessClicked}
                  id={`guess-${aPot}`}
                />
                <p
                  className={`visible h-6 rounded-xl -mx-2 px-2 text-black bg-${bgColor}`}
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
