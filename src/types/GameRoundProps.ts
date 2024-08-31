import React from "react";
import { GameState, GameRoundStatus, GameRoundResult } from "./data.ts";

export interface GameRoundProps {
  gameRoundId: string;
  gameState: GameState;
  currentRoundStatus: GameRoundStatus;
  setCurrentRoundStatus: React.Dispatch<React.SetStateAction<GameRoundStatus>>;
  setRoundResult: (roundId: string, result: GameRoundResult) => void;
}
