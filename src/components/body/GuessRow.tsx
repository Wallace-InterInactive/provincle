import {
  calculateDistance,
  getDirectionFromSolution,
} from "src/services/utils";
import { Guess } from "../gamedata/gameState";
import React from "react";
//import CountUp from "react-countup";
//import { SettingsData } from "../hooks/useSettings";

//const SQUARE_ANIMATION_LENGTH = 250;
//type AnimationState = "NOT_STARTED" | "RUNNING" | "ENDED";

interface GuessRowProps {
  key: number;
  guess: Guess;
  //settingsData: SettingsData;
}

export const GuessRow: React.FC<GuessRowProps> = (props: GuessRowProps) => {
  //const { distanceUnit, theme } = settingsData;
  //const proximity=guess != null ? computeProximityPercent(guess.distance) : 0;
  //const squares = generateSquareCharacters(proximity, theme);
  //const [animationState, setAnimationState] =
  //  useState<AnimationState>("NOT_STARTED");

  //switch (animationState) {

  if (false /* "NOT_STARTED" === props.guess.result */) {
    return (
      <div
        className={
          "col-span-10 border-2 rounded h-8 bg-gray-200 dark:bg-slate-600"
        }
      />
    );
  } /* "ENDED" */ else {
    return (
      <>
        <div
          className={
            "flex col-span-7 items-center justify-center border-2 rounded h-8" +
            "animate-reveal"
          }
        >
          <p className="text-ellipsis overflow-hidden whitespace-nowrap">
            {props.guess.name}
          </p>
        </div>

        <div
          className={
            "flex col-span-2 items-center justify-center border-2 rounded " +
            "h-8 animate-reveal"
          }
        >
          {calculateDistance("", props.guess.name)}
        </div>
        <div
          className={
            "flex col-span-1 items-center justify-center border-2 rounded " +
            "h-8 animate-reveal"
          }
        >
          {getDirectionFromSolution("", props.guess.name)}
        </div>
      </>
    );
  }
};

/*
import {
  computeProximityPercent,
  Direction,
  formatDistance,
  generateSquareCharacters,
} from "../domain/geography";

const DIRECTION_ARROWS: Record<Direction, string> = {
  N: "⬆️",
  NE: "↗️",
  E: "➡️",
  SE: "↘️",
  S: "⬇️",
  SW: "↙️",
  W: "⬅️",
  NW: "↖️",
};

    case "RUNNING":
      return (
        <>
          <div
            className={`flex text-2xl w-full justify-evenly
              items-center col-span-6 border-2 h-8`}
          >
            {squares.map((character, index) => (
              <div
                key={index}
                className="opacity-0 animate-reveal"
                style={{
                  animationDelay: `${SQUARE_ANIMATION_LENGTH * index}ms`,
                }}
              >
                {character}
              </div>
            ))}
          </div>
          <div className="border-2 h-8 col-span-1 animate-reveal">
            <CountUp
              end={proximity}
              suffix="%"
              duration={(SQUARE_ANIMATION_LENGTH * 5) / 1000}
            />
          </div>
        </>
      );

*/
