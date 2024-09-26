import { GameRoundStatus } from "../../types/data.ts";
import { useTranslation } from "react-i18next";

interface NextRoundButtonProps {
  currentRound: number;
  currentRoundStatus: GameRoundStatus;
  handleNextButtonClicked: () => void;
  handleGiveUpButtonClicked: () => void;
  giveUpCnt: number;
}

export function NextRoundButton({
  currentRound,
  currentRoundStatus,
  handleNextButtonClicked,
  handleGiveUpButtonClicked,
  giveUpCnt,
}: NextRoundButtonProps) {
  const { t } = useTranslation();

  return (
    <div className="container flex flex-col items-center mt-4">
      {currentRoundStatus !== "pending" ? (
        <button
          onClick={handleNextButtonClicked}
          className={
            "w-full rounded-xl flex-shrink-0 font-medium px-4 py-2 bg-custom-green-1 hover:bg-green-700"
          }
        >
          🍁 {t("nextRound")}
        </button>
      ) : currentRound > 1 ? (
        <button
          onClick={handleGiveUpButtonClicked}
          className="rounded-xl flex-shrink-0 font-medium px-4 py-2 text-black bg-custom-light-blue-2"
          // className=  "border-2 rounded-xl flex-shrink-1 px-2 text-gray text-opacity-50 "
        >
          {giveUpCnt === 0 ? `🤷‍♀️ ${t("giveUp")}` : `️🙀 ${t("areYouSure")}?`}
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
