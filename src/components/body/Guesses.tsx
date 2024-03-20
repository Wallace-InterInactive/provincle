import { Guess } from "../gamedata/gameState";
import { GuessRow } from "./GuessRow";
import React from "react";

interface GuessesProps {
  rowCount: number;
  guesses: Guess[];
  //settingsData: SettingsData;
}

export const Guesses: React.FC<GuessesProps> = (props: GuessesProps) => {
  return (
    <div className="grid grid-cols-10 gap-1 text-center p-2">
      {Array.from(Array(props.rowCount).keys()).map(index => (
        <GuessRow
          key={index}
          guess={props.guesses[index]}
          // distance={"1234 km"}
          // direction={"⬆️"}
          //settingsData={settingsData}
        />
      ))}
    </div>
  );
};
