import { useState } from "react";
//import dataBank, { potNames, getPotCode } from "../../utils/dataBank.ts";
import GameRound_Pot from "./GameRound_Pot.tsx";
import GameRound_Flag from "./GameRound_Flag.tsx";
import GameRound_Finale from "./GameRound_Finale.tsx";
import defaultNewGameState from "../../utils/gameState.ts";
import { GameRoundStatus } from "../../utils/dataBank.ts";

export function Game() {
  const maxRounds = 10;
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
  const [giveupCnt, setGiveupCnt] = useState<number>(0);

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
  const handleGiveUpButtonClicked = (): void => {
    console.log("GiveUp button clicked.");
    if (giveupCnt >= 1) {
      setGiveupCnt(0);
      handleNextButtonClicked()
    } else {
      setGiveupCnt(giveupCnt + 1);
    }
  };
  function nextRoundButton() {
    return (
      <div className="container flex flex-col items-center">
      {currentRoundStatus !== "pending" ? (
        <button
            onClick={handleNextButtonClicked}
            className={"border-2 rounded-xl uppercase flex-shrink-0 px-2 font-semibold" + getColorOfStatus()}
          >
            🍁 Proceed to next question 🍁
          </button>
        ) : (
          <button
            onClick={handleGiveUpButtonClicked}
            className="border-2 rounded-xl flex-shrink-1 px-2 text-gray text-opacity-50 "
          >
            😱 Give up, skip  question! (clicked: {giveupCnt}) 😱
          </button>
        ) 
      }
    </div>
    )
  }
  function getColorOfStatus() {
    return currentRoundStatus === "won" ? " bg-green-700"
         : currentRoundStatus === "lost" ? " bg-red-600"
         : "";  // not changed, or could be set to gray
  }

  
  return (
    <div>
      <div>
        {currentRound === 1 ? (
          <GameRound_Pot
            currentRoundStatus={currentRoundStatus} 
            setCurrentRoundStatus={setCurrentRoundStatus} />
        ) : currentRound === 2 ? (
          <GameRound_Flag
            currentRoundStatus={currentRoundStatus}
            setCurrentRoundStatus={setCurrentRoundStatus} />
        ) : currentRound === 3 ? (
          <GameRound_Finale
            currentRoundStatus={currentRoundStatus}
            setCurrentRoundStatus={setCurrentRoundStatus} />
        ) : currentRound === 4 ? (
          <GameRound_Finale
            currentRoundStatus={currentRoundStatus}
            setCurrentRoundStatus={setCurrentRoundStatus} />
        ) : currentRound === 5 ? (
          <GameRound_Finale
            currentRoundStatus={currentRoundStatus}
            setCurrentRoundStatus={setCurrentRoundStatus} />
        ) : currentRound === 6 ? (
          <GameRound_Finale
            currentRoundStatus={currentRoundStatus}
            setCurrentRoundStatus={setCurrentRoundStatus} />
        ) : currentRound === 7 ? (
          <GameRound_Finale
            currentRoundStatus={currentRoundStatus}
            setCurrentRoundStatus={setCurrentRoundStatus} />
        ) : currentRound === 8 ? (
          <GameRound_Finale
            currentRoundStatus={currentRoundStatus}
            setCurrentRoundStatus={setCurrentRoundStatus} />
        ) : currentRound === 9 ? (
          <GameRound_Finale
            currentRoundStatus={currentRoundStatus}
            setCurrentRoundStatus={setCurrentRoundStatus} />
        ) : currentRound === 10 ? (
          <GameRound_Finale
            currentRoundStatus={currentRoundStatus}
            setCurrentRoundStatus={setCurrentRoundStatus} />
        ) : (
          <GameRound_Finale
            currentRoundStatus={currentRoundStatus}
            setCurrentRoundStatus={setCurrentRoundStatus} />
        )}
      </div>
      {currentRound < maxRounds ? (
        nextRoundButton()
      ) : (
        <div />
      )}
    </div>
  );
}
