import { useState } from "react";
import defaultGameState from "../../utils/gameState.ts";
import { useTranslation } from "react-i18next";
import { GameRoundStatus } from "../../types/data.ts";
import GameRoundPot from "../GameRoundPot/GameRoundPot.tsx";
import GameRoundFlag from "../GameRoundFlag/GameRoundFlag.tsx";
import GameRoundCapital from "../GameRoundCapital/GameRoundCapital.tsx";
import GameRoundNeighbors from "../GameRoundNeighbors/GameRoundNeighbors.tsx";
import GameRoundFinale from "../GameRoundFinale/GameRoundFinale.tsx";
import { toast } from "react-toastify";

export function Game() {
  const { t } = useTranslation();
  // const t = i18n.getFixedT("LOLcalize");

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

  function nextRoundButton() {
    return (
      <div className="container flex flex-col items-center mt-4">
        {currentRoundStatus !== "pending" ? (
          <button
            onClick={handleNextButtonClicked}
            className={
              "border-2 rounded-xl uppercase flex-shrink-0 p-2 font-semibold" +
              getColorOfStatus()
            }
          >
            🍁 {t("nextRound")} 🍁
          </button>
        ) : (
          <button
            onClick={handleGiveUpButtonClicked}
            className="border-2 rounded-xl flex-shrink-1 px-2 text-gray text-opacity-50 "
          >
            😱 {t("giveUp")} (clicked: {giveupCnt}) 😱
          </button>
        )}
      </div>
    );
  }

  function getColorOfStatus(): string {
    return currentRoundStatus === "won"
      ? " bg-green-700"
      : currentRoundStatus === "lost"
        ? " bg-red-600"
        : ""; // not changed, or could be set to gray
  }

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
        ) : /* currentRound >= 5 ? */ (
          <GameRoundFinale roundResults={roundResult} />
        )}
      </div>
      {currentRound < maxRounds ? nextRoundButton() : <div />}
    </>
  );
}
