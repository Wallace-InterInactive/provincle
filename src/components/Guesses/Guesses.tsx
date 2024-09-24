import { GuessRow } from "../GuessRow/GuessRow.tsx";
import { GameRoundStatus, PotCode, DataBank } from "../../types/data.ts";
import { getColorOfStatus } from "../../utils/utils.ts";
import { MyGeoMapping } from "../../utils/utils.ts";

export interface GuessesProps {
  currentRoundStatus: GameRoundStatus;
  guesses: string[];
  maxAttempts: number;
  solutionCode: PotCode;
  guessNum: number;
  t: MyGeoMapping;
  tGeo: MyGeoMapping;
  dataBank: DataBank;
}

export function Guesses({
  currentRoundStatus,
  guesses,
  maxAttempts,
  solutionCode,
  guessNum,
  t,
  tGeo,
  dataBank,
}: GuessesProps) {
  return (
    <div>
      {currentRoundStatus === "pending" ? (
        <div className="grid grid-cols-6 gap-1 text-center py-0.5">
          <div className="my-div-1">
            <span className="opacity-70">
              {t("guessNoun")} {guessNum} / {maxAttempts}
            </span>
          </div>
        </div>
      ) : (
        <div className="my-span-2">
          <span
            // TODO: use custom class name for colors
            className={`my-span-3 text-black bg-${getColorOfStatus(currentRoundStatus)}`}
          >
            {tGeo(solutionCode)}
          </span>
        </div>
      )}
      <div>
        {Array.from({ length: maxAttempts }, (_, i) => {
          console.log(`guesses.${i} = ${guesses[i]}`);
          return (
            <GuessRow
              guess={guesses[i]}
              solutionCode={solutionCode as PotCode}
              tGeo={tGeo}
              dataBank={dataBank}
            />
          );
        })}
      </div>
    </div>
  );
}
