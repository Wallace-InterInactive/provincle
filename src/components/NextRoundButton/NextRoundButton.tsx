import { DataBank, GameRoundStatus } from "../../types/data.ts";
import { useTranslation } from "react-i18next";

interface NextRoundButtonProps {
  currentRound: number;
  currentRoundStatus: GameRoundStatus;
  handleNextButtonClicked: () => void;
  handleGiveUpButtonClicked: () => void;
  giveUpCnt: number;
  dataBank: DataBank;
}

export function NextRoundButton({
  currentRound,
  currentRoundStatus,
  handleNextButtonClicked,
  handleGiveUpButtonClicked,
  giveUpCnt,
  dataBank,
}: NextRoundButtonProps) {
  const { t } = useTranslation();

  return (
    <div
      className="container flex flex-col items-center mt-4"
      data-testid="next-round-btn-wrapper-div"
    >
      {currentRoundStatus !== "pending" ? (
        <button
          onClick={handleNextButtonClicked}
          className={
            "w-full rounded-xl flex-shrink-0 font-medium px-4 py-2 bg-custom-green-1 hover:bg-green-700"
          }
          data-testid={"next-round-btn-finished"}
        >
          {dataBank.getGuessEmoji() + " " + t("nextRound")}
        </button>
      ) : currentRound > 1 ? (
        <button
          onClick={handleGiveUpButtonClicked}
          className="rounded-xl flex-shrink-0 font-medium px-4 py-2 text-black bg-custom-light-blue-2"
          data-testid={"give-up-btn"}
        >
          {giveUpCnt === 0 ? `🤷‍♀️ ${t("giveUp")}` : `️🙀 ${t("areYouSure")}?`}
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
