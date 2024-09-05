import { useState } from "react";
import defaultGameState from "../../utils/gameState.ts";
import {
  GameRoundStatus,
  GameRoundStat,
  GameState,
  GameRoundResult,
} from "../../types/data.ts";
import { getTodaysPotCode } from "../../utils/dataBank.ts"; // lovas: see below use
import GameRoundPot from "../GameRoundPot/GameRoundPot.tsx";
import GameRoundFlag from "../GameRoundFlag/GameRoundFlag.tsx";
import GameRoundCapital from "../GameRoundCapital/GameRoundCapital.tsx";
import GameRoundNeighbors from "../GameRoundNeighbors/GameRoundNeighbors.tsx";
import GameRoundFinale from "../GameRoundFinale/GameRoundFinale.tsx";
import { toast } from "react-toastify";
import { NextRoundButton } from "../NextRoundButton/NextRoundButton.tsx";

// lovas: just thinking aloud indexing options, idx->info
// if GameState.rounds is Map, we need to map the roundIndex->roundId, see state.round[id[state.currentRound]]
// ??? we could drop
//const gameRoundIds: string[] = [ "_start", "pot", "neighbor", "capital", "flag" ];

// Todo: could be extracted or it's just the place to centralize game-configuration
// prettier-ignore
function initGameState(): GameState {
  const ret = defaultGameState;
  ret.potCode = getTodaysPotCode(); // lovas: shall we raise here?
  ret.rounds.set("pot",       { i18nId: "gamePotRoundInstruction",      result: GameRoundResult.NotStarted });
  ret.rounds.set("neighbors", { i18nId: "gameNeighborRoundInstruction", result: GameRoundResult.NotStarted, });
  ret.rounds.set("capital",   { i18nId: "gameCapitalRoundInstruction",  result: GameRoundResult.NotStarted, });
  ret.rounds.set("flag",      { i18nId: "gameFlagRoundInstruction",     result: GameRoundResult.NotStarted, });
  return ret;
}

export function Game() {
  const [gameState, setGameState] = useState(() => initGameState()); // warning: useState(initGameState()) sux!

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const updateGameState = (key: string, val: any): void => {
    setGameState(prevState => ({
      ...prevState,
      [key]: val,
    }));
  };
  const setCurrentRound = (newCurrentRound: number): void => {
    updateGameState("currentRound", newCurrentRound);
  };

  // prettier-ignore
  function getRoundStat(id: string): GameRoundStat {
    console.log(`rounds ${typeof gameState.rounds} ==> ${gameState.rounds} ${Array.from(gameState.rounds.entries())}`);
    return ( gameState.rounds.get(id) ?? { i18nId: "na", result: GameRoundResult.NotStarted } );
  }

  const setRoundResult = (roundId: string, result: GameRoundResult): void => {
    console.log(`set ${roundId} ==> ${result}`);
    const newState: GameState = gameState;
    // lovas: not really good, it's not deep copy
    // lovas it should be merged into one expression
    newState.rounds.set(roundId, {
      ...getRoundStat(roundId), // ...newState.rounds.get(roundId),
      result: result,
    });

    setGameState(newState);
  };

  // TODO: remove ts-ignore
  // @ts-ignore
  const { potCode, currentRound } = gameState;
  const [giveupCnt, setGiveupCnt] = useState<number>(0);

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
            gameRoundId="pot"
            gameState={gameState}
            currentRoundStatus={currentRoundStatus}
            setCurrentRoundStatus={setCurrentRoundStatus}
            setRoundResult={setRoundResult}
          />
        ) : currentRound === 2 ? (
          <GameRoundNeighbors
            gameRoundId="neighbors"
            gameState={gameState}
            currentRoundStatus={currentRoundStatus}
            setCurrentRoundStatus={setCurrentRoundStatus}
            setRoundResult={setRoundResult}
          />
        ) : currentRound === 3 ? (
          <GameRoundCapital
            gameRoundId="capital"
            gameState={gameState}
            currentRoundStatus={currentRoundStatus}
            setCurrentRoundStatus={setCurrentRoundStatus}
            setRoundResult={setRoundResult}
          />
        ) : currentRound === 4 ? (
          <GameRoundFlag
            gameRoundId="flag"
            gameState={gameState}
            currentRoundStatus={currentRoundStatus}
            setCurrentRoundStatus={setCurrentRoundStatus}
            setRoundResult={setRoundResult}
          />
        ) : (
          <GameRoundFinale
            roundStats={gameState} //{roundResult}
          />
        )}
      </div>
      {currentRound <= gameState.rounds.size ? (
        <NextRoundButton
          currentRound={currentRound}
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
