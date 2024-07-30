import { useState } from "react";
//import dataBank, { potNames, getPotCode } from "../../utils/dataBank.ts";
import GameRound1 from "./GameRound1.tsx";
import GameRound2 from "./GameRound2.tsx";
import defaultNewGameState from "../../utils/gameState.ts";
import { GameRoundStatus } from "../../utils/dataBank.ts";

export function Game() {
  const [newGameState, setNewGameState] = useState(defaultNewGameState);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const updateGameState = (key: string, val: any): void => {
    setNewGameState(prevState => ({
      ...prevState,
      [key]: val,
    }));
  };

  // TODO: remove ts-ignore
  // @ts-ignore
  const { potCode, currentRound } = newGameState;

  // TODO: remove ts-ignore
  // @ts-ignore
  const setPotCode = (newPotCode: string): void => {
    updateGameState("potCode", newPotCode);
  };

  // TODO: remove ts-ignore
  // @ts-ignore
  const setCurrentRound = (newCurrentRound: number): void => {
    updateGameState("currentRound", newCurrentRound);
  };

  const [currentRoundStatus, setCurrentRoundStatus] =
    useState<GameRoundStatus>("pending");
  // note: currentRound == 1 comes from gameState.ts default

  const handleNextButtonClicked = (): void => {
    console.log("Next button clicked.");
    setCurrentRound(currentRound + 1);
    setCurrentRoundStatus("pending");
    //setGuesses([]);  // -- rounds might have to reset themselves
    console.log(`lovas: round: ${currentRound}, status: ${currentRoundStatus}`);
  };
  function nextRoundButton() {
    return (
      <div className="container flex flex-col items-center">
      {currentRoundStatus !== "pending" ? (
        <button
            //type="submit"
            onClick={handleNextButtonClicked}
            className="border-2 rounded-xl uppercase flex-shrink-0 px-2 font-semibold"
          >
            🍁 Proceed to next question 🍁
          </button>
        ) : (
          <p>&lt;placoholder for Next button, To be hidden&gt;</p>
        ) 
      }
    </div>
    )
  }
  
  return (
    <div>
      <div>
        {currentRound === 1 ? (
          <GameRound1
            currentRoundStatus={currentRoundStatus} 
            setCurrentRoundStatus={setCurrentRoundStatus} />
        ) : currentRound === 2 ? (
          <GameRound2
            currentRoundStatus={currentRoundStatus} 
            setCurrentRoundStatus={setCurrentRoundStatus} />
        ) : (
          <div>
          <p>&lt;placoholder of end-game, To be hidden&gt;</p>
          </div>
        )}
      </div>
      {nextRoundButton()}
    </div>
  );
}
