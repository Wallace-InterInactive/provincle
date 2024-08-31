import { GameRoundStatus } from "../../types/data.ts";
import { useTranslation } from "react-i18next";

interface NextRoundButtonProps {
  currentRoundStatus: GameRoundStatus;
  handleNextButtonClicked: () => void;
  handleGiveUpButtonClicked: () => void;
  giveUpCnt: number;
}

export function NextRoundButton({
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
            "w-full rounded-xl flex-shrink-0 font-medium px-4 py-2 bg-custom-green-1"
          }
        >
          🍁 {t("nextRound")}
        </button>
      ) : (
        <button
          onClick={handleGiveUpButtonClicked}
          className="border-2 rounded-xl flex-shrink-1 px-2 text-gray text-opacity-50 "
        >
          😱 {t("giveUp")} (clicked: {giveUpCnt}) 😱
        </button>
      )}
    </div>
  );
}
