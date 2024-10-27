import React from "react";
import {
  GameState,
  DataBank,
  GameRoundStatus,
  GameRoundResult,
} from "./data.ts";

export interface GameRoundProps {
  gameRoundId: string;
  gameState: GameState;
  currentRoundStatus: GameRoundStatus;
  dataBank: DataBank;
  setCurrentRoundStatus: React.Dispatch<React.SetStateAction<GameRoundStatus>>;
  setRoundResult: (roundId: string, result: GameRoundResult) => void;
}
