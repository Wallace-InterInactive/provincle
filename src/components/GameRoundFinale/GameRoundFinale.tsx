import { useState } from "react";
import { getColorOfStatus, mapGradeToEmoji } from "../../utils/utils.ts";
import { getPotMapSvgUrl } from "../../canadata/dataBank.ts";
import defaultGameState from "../../canadata/gameState.ts";
import { useTranslation } from "react-i18next";
//import { GameFinaleProps } from "../../types/GameFinaleProps.ts";
import { PotCode, GameState } from "../../types/data.ts";

export interface GameFinaleProps {
  roundStats: GameState;
}

function GameRoundFinale({
  roundStats /*, setCurrentRoundStatus*/,
}: GameFinaleProps) {
  const { t } = useTranslation();
  const { t: tGeo } = useTranslation("geo");

  //export function GameRound1( currentRoundStatus, setCurrentRoundStatus) {
  const [newGameState] = useState(defaultGameState);

  // TODO: should move to GameProps? as quasi-const it's of for the proof-of-concept
  // TODO: remove ts-ignore
  // @ts-ignore
  const { potCode, currentRound } = newGameState;

  return (
    <div>
      {/* page part 1: the problem statement */}
      <div>
        <img
          src={getPotMapSvgUrl(potCode as PotCode)}
          alt="silhouette of a province or territory"
          className="max-h-32 m-auto my-5 transition-transform duration-700 ease-in dark:invert h-full"
        />
      </div>
      {/* page part 2: the input field */}
      {/* page part 3a: feedback part, won/lost/etc 
      className={`my-span-3 text-white ${currentRoundStatus === "won" ? "bg-green-700" : "bg-red-600"}`}
          >*/}
      <div>
        <div className="my-span-2">
          <span
            className={`my-span-3 text-black bg-${getColorOfStatus("won")}`}
          >
            {tGeo(potCode)}
          </span>
        </div>
        {/* page part 3b: feedback: list of submitted guesses  */}
        <div className="grid grid-cols-6 gap-1 text-center py-0.5">
          <div className="my-guess-div col-start-2 col-span-2">
            <a
              className="my-guess-p"
              href={
                "https://en.wikipedia.org/wiki/Provinces_and_territories_of_Canada"
              } // TODO: corresponding wiki
              target="_blank"
            >
              Wikipedia
            </a>
          </div>
          <div className="my-guess-div col-span-2">
            <a
              className="my-guess-p"
              href={`https://www.google.com/maps?q=${tGeo(potCode)},Canada`}
              target="_blank"
            >
              Google Maps
            </a>
          </div>
        </div>
        <div className="gap-1 text-center py-0.5">
          <br />
          <p>{t("gamePotRoundFinaleStats")}</p>
        </div>
        {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          Array.from(roundStats.rounds.entries()).map(([_, stat], _i) => {
            // lovas: think on the OkNok Emoji, maybe useless if we have stars
            return (
              <div className="grid grid-cols-4 gap-1 text-center py-0.5">
                <div className="my-guess-open col-span-3">
                  <p className="my-guess-p">{t(stat.i18nId)}</p>
                </div>
                <div className="my-guess-open">
                  <p className="my-guess-p">
                    {mapGradeToEmoji.get(stat.result) ?? "-"}
                  </p>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default GameRoundFinale;
