//import React from "react";
import { GameRoundProps } from "./GameRoundProps.ts";

export interface GameRoundPropsExtended extends GameRoundProps {
  roundInstructionId: string;
  target: string;
  //possibleValues: string[];
  maxAttempts: number;
  //generateValueList: () => string[];
}
