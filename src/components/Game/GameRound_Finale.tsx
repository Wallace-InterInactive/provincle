import { useState } from "react";
import dataBank from "../../utils/dataBank.ts";
import { getPotMapSvgUrl } from "../../utils/utils.ts";
import defaultNewGameState from "../../utils/gameState.ts";
import { GameRoundProps } from "./GameRoundProps.ts";

const GameRound_Finale: React.FC<GameRoundProps> = ({
  currentRoundStatus /*, setCurrentRoundStatus*/,
}) => {
  //export function GameRound1( currentRoundStatus, setCurrentRoundStatus) {
  const [newGameState] = useState(defaultNewGameState);

  // TODO: should move to GameProps? as quasi-const it's of for the proof-of-concept
  // TODO: remove ts-ignore
  // @ts-ignore
  const { potCode, currentRound } = newGameState;

  return (
    <div>
      {/* page part 1: the problem statement */}
      <div>
        <img
          src={getPotMapSvgUrl(potCode)}
          alt="silhouette of a province or territory"
          className="max-h-52 m-auto my-5 transition-transform duration-700 ease-in dark:invert h-full"
        />
      </div>
      {/* page part 2: the input field */}
      {/* page part 3a: feedback part, won/lost/etc */}
      <div>
        <div className="my-span-2">
          <span
            className={`my-span-3 text-white ${currentRoundStatus === "won" ? "bg-green-700" : "bg-red-600"}`}
          >
            {dataBank[potCode].name}
          </span>
        </div>
        {/* page part 3b: feedback: list of submitted guesses  */}
        <div className="grid grid-cols-4 gap-1 text-center py-0.5">
          <div className="my-guess-div">
            <a className="my-guess-p" href="#">
              WikiPedia
            </a>
          </div>
          <div className="my-guess-div">
            <a className="my-guess-p" href="#">
              Google Maps
            </a>
          </div>
        </div>
        <div className="gap-1 text-center py-0.5">
          <br />
          <p>Your game stats...</p>
        </div>
        <div className="grid grid-cols-6 gap-1 text-center py-0.5">
          <div className="my-guess-div">
            <p className="my-guess-p">province</p>
          </div>
          <div className="my-guess-div">
            <p className="my-guess-p">attempts N</p>
          </div>
          <div className="my-guess-div">
            <p className="my-guess-p">;)</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GameRound_Finale;
