import { useState } from "react";
import defaultGameState from "../../utils/gameState.ts";
import { GameRoundStatus } from "../../types/data.ts";
import GameRoundPot from "../GameRoundPot/GameRoundPot.tsx";
import GameRoundFlag from "../GameRoundFlag/GameRoundFlag.tsx";
import GameRoundCapital from "../GameRoundCapital/GameRoundCapital.tsx";
import GameRoundNeighbors from "../GameRoundNeighbors/GameRoundNeighbors.tsx";
import GameRoundFinale from "../GameRoundFinale/GameRoundFinale.tsx";
import { toast } from "react-toastify";
import { NextRoundButton } from "../NextRoundButton/NextRoundButton.tsx";

export function Game() {
  const maxRounds = 10;
  const [newGameState, setNewGameState] = useState(defaultGameState);

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

  const [roundResult, setRoundResult] = useState<string[]>([]);
  const addRoundResult = (result: string): void => {
    setRoundResult([...roundResult, result]);
  };
  // const setPotCode = (newPotCode: string): void => {
  //   updateGameState("potCode", newPotCode);
  // };

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
    toast.dismiss(); // dismiss actively showing toasts from the previous round
    console.log(`lovas: round: ${currentRound}, status: ${currentRoundStatus}`);
  };

  const handleGiveUpButtonClicked = (): void => {
    console.log("GiveUp button clicked.");
    if (giveupCnt >= 1) {
      setGiveupCnt(0);
      handleNextButtonClicked();
    } else {
      setGiveupCnt(giveupCnt + 1);
    }
  };

  return (
    <>
      <div>
        {currentRound === 1 ? (
          <GameRoundPot
            currentRoundStatus={currentRoundStatus}
            setCurrentRoundStatus={setCurrentRoundStatus}
            addRoundResult={addRoundResult}
          />
        ) : currentRound === 2 ? (
          <GameRoundNeighbors
            currentRoundStatus={currentRoundStatus}
            setCurrentRoundStatus={setCurrentRoundStatus}
            addRoundResult={addRoundResult}
          />
        ) : currentRound === 3 ? (
          <GameRoundCapital
            currentRoundStatus={currentRoundStatus}
            setCurrentRoundStatus={setCurrentRoundStatus}
            addRoundResult={addRoundResult}
          />
        ) : currentRound === 4 ? (
          <GameRoundFlag
            currentRoundStatus={currentRoundStatus}
            setCurrentRoundStatus={setCurrentRoundStatus}
            addRoundResult={addRoundResult}
          />
        ) : (
          /* currentRound >= 5 ? */ <GameRoundFinale
            roundResults={roundResult}
          />
        )}
      </div>
      {currentRound < maxRounds ? (
        <NextRoundButton
          currentRoundStatus={currentRoundStatus}
          giveUpCnt={giveupCnt}
          handleGiveUpButtonClicked={handleGiveUpButtonClicked}
          handleNextButtonClicked={handleNextButtonClicked}
        />
      ) : (
        <div />
      )}
    </>
  );
}
