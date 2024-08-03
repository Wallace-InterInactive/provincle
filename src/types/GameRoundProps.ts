import React from "react";
import { GameRoundStatus } from "./data.ts";

export interface GameRoundProps {
  currentRoundStatus: GameRoundStatus;
  setCurrentRoundStatus: React.Dispatch<React.SetStateAction<GameRoundStatus>>;
}
