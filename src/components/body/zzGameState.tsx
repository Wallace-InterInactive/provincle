import { Guess } from "../gamedata/gameState";
import { GuessRow } from "./GuessRow";
import React from "react";
//import { SettingsData } from "../hooks/useSettings";

interface GameStateProps {
  roundNum: number;

  rowCount: number;
  guesses: Guess[];
}

export function GameState({ rowCount, guesses }: GameStateProps) {
  return (
    <div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {Array.from(Array(rowCount).keys()).map(index => (
          <GuessRow
            key={index}
            guess={guesses[index]}
            distance={"1234 km"}
            direction={"⬆️"}
          />
        ))}
      </div>
    </div>
  );
}
