import { useState, useEffect } from "react";
import { getColorOfStatus, shuffle } from "../../utils/utils.ts";
import "../../ImageGrid.css";
import { GameRoundProps } from "../../types/GameRoundProps.ts";
import { GameRoundResult, PotCode } from "../../types/data.ts";
import confetti from "canvas-confetti";
import { toastSuccess } from "../../utils/animations.ts";

const maxAttempts = 3;
const numFlagsToShow = 6;

function GameRoundFlag({
  gameRoundId,
  gameState,
  currentRoundStatus,
  setCurrentRoundStatus,
  dataBank,
  setRoundResult,
}: GameRoundProps) {
  const potNameOf: string = dataBank.tGeo(`of_${gameState.potCode}`);
  const potCodes = Object.keys(dataBank.data) as PotCode[];

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
    if (`guess-${gameState.potCode}` == guessedItem) {
      setCurrentRoundStatus("won");
      toastSuccess(dataBank.tLang("guessedIt"));
      confetti();
      setRoundResult(gameRoundId, grade(guess));
    } else if (guesses.length + 1 === maxAttempts) {
      setCurrentRoundStatus("lost");
      setRoundResult(gameRoundId, grade(guess));
    }
    addGuess(guess);
  };

  // prettier-ignore
  function grade(guess: string): GameRoundResult {
    if (guess === gameState.potCode) {
      return guesses.length === 0 ? GameRoundResult.Excellent
           : guesses.length === 1 ? GameRoundResult.Good
           :                        GameRoundResult.Fair;
    } else {
      return guesses.length == 0 ? GameRoundResult.NotStarted
                                 : GameRoundResult.Failed;
    }
  }

  const guessNoun: string = dataBank.tLang("guessNoun");

  return (
    <div>
      <div className="gap-1 text-center">
        <p>{`${dataBank.tLang("gameFlagRoundInstruction")} ${potNameOf}?`}</p>
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
                  src={dataBank.getPotFlagSvgUrl(aPot)}
                  alt={`flag of a pot:${i}:${aPot}`}
                  className={`cursor-pointer max-h-24 m-auto h-20 ${myBorder}`}
                  onClick={handleFlagGuessClicked}
                  id={`guess-${aPot}`}
                />
                <p
                  className={`visible h-6 rounded-xl -mx-2 px-2 text-black bg-${bgColor}`}
                >
                  {currentRoundStatus === "pending" && !guesses.includes(aPot) // or display if already guessed (show names or wrong guess)
                    ? dataBank.tLang("guessVerb")
                    : dataBank.tGeo(myPotList[i1])}
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
                {guessNoun} {guesses.length + 1} / {maxAttempts}
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
