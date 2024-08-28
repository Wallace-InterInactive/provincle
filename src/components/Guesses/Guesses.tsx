import { GuessRow } from "../GuessRow/GuessRow.tsx";
import { GameRoundStatus, PotCode } from "../../types/data.ts";
import { useTranslation } from "react-i18next";
import { getColorOfStatus } from "../../utils/utils.ts";

export interface GuessesProps {
  currentRoundStatus: GameRoundStatus;
  guesses: string[];
  maxAttempts: number;
  solutionCode: PotCode;
  guessNum: number;
}

export function Guesses({
  currentRoundStatus,
  guesses,
  maxAttempts,
  solutionCode,
  guessNum,
}: GuessesProps) {
  const { t } = useTranslation();
  // const t = i18n.getFixedT("LOLcalize");
  const { t: tGeo } = useTranslation("geo");

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
            className={`my-span-3 text-black  bg-${getColorOfStatus(currentRoundStatus)}`}
          >
            {tGeo(solutionCode)}
          </span>
        </div>
      )}
      <div>
        {Array.from({ length: maxAttempts }, (_, i) => {
          return (
            <GuessRow
              guess={guesses[i]}
              solutionCode={solutionCode as PotCode}
            />
          );
        })}
      </div>
    </div>
  );
}
