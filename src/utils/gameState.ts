import { getTodaysPotCode } from "./dataBank.ts";
import { GameState } from "../types/data.ts";

const defaultGameState: GameState = {
  potCode: getTodaysPotCode(),
  currentRound: 1,
};

export default defaultGameState;
