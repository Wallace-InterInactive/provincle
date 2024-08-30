import { FormEvent, useState, useEffect } from "react";
import { getPotNamesByLang } from "../../utils/dataBank.ts";
import {
  sanitizeString,
  isValidPot,
  getPotMapSvgUrl,
} from "../../utils/utils.ts";
import { useTranslation } from "react-i18next";
import { GameRoundProps } from "../../types/GameRoundProps.ts";
import { GameRoundResult, PotCode, GameRoundStatus } from "../../types/data.ts";
import { AutoSuggestInput } from "../AutoSuggestInput/AutoSuggestInput.tsx";
import { GuessButton } from "../GuessButton/GuessButton.tsx";
import i18n from "../../utils/i18n.ts";
import {
  SQUARE_ANIMATION_LENGTH,
  squares,
  toastError,
  toastFailed,
  toastSuccess,
} from "../../utils/animations.ts";
import { Guesses } from "../Guesses/Guesses.tsx";
import confetti from "canvas-confetti";

function GameRoundPot({
  gameRoundId,
  gameState,
  currentRoundStatus,
  setCurrentRoundStatus,
  setRoundResult,
}: GameRoundProps) {
  const { t } = useTranslation();
  // const t = i18n.getFixedT("LOLcalize");
  const { t: tGeo } = useTranslation("geo");

  const potCode: string = gameState.potCode;

  const maxAttempts = 3;

  const [guessNum, setGuessNum] = useState<number>(1);
  const incGuessNum = (): void => {
    setGuessNum(guessNum + 1);
  };

  const [guesses, setGuesses] = useState<string[]>([]);
  const addGuess = (guess: string): void => {
    setGuesses([...guesses, guess]);
  };

  const [currentGuess, setCurrentGuess] = useState("");

  useEffect(() => {
    // if (guesses.length === maxAttempts) {
    //   console.log(`Game over! (${currentRoundStatus})`);
    // }
    setCurrentGuess("");
  }, [guesses]);

  function getResult(status:GameRoundStatus, num: number = 0): GameRoundResult {
    return (status !== "won") ? GameRoundResult.Abandoned
         : (num === 3) ? GameRoundResult.OneStar
         : (num === 2) ? GameRoundResult.TwoStars
         : (num === 1) ? GameRoundResult.ThreeStars
         : GameRoundResult.Abandoned;
  }

  const handleFormSubmission = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!isValidPot(currentGuess, i18n.language)) {
      toastError(t("unknownPot"));
      return;
    }

    if (guesses.includes(currentGuess)) {
      toastError(t("alreadyGuessed"));
      return;
    }

    if (sanitizeString(tGeo(potCode)) === sanitizeString(currentGuess)) {
      setTimeout(() => {
        setCurrentRoundStatus("won");
        toastSuccess(t("guessedIt"));
        confetti();
      }, SQUARE_ANIMATION_LENGTH * squares.length);
      setRoundResult(gameRoundId, getResult("won", guesses.length + 1));
      //`${t("gamePotRoundInstruction")}|${guesses.length + 1} of ${maxAttempts}|${getOkNokEmoji(true)}`
    } else if (guesses.length + 1 === maxAttempts) {
      setTimeout(() => {
        toastFailed(t("failedIt"));
        setCurrentRoundStatus("lost");
      }, SQUARE_ANIMATION_LENGTH * squares.length);
      setRoundResult(gameRoundId, getResult("lost"));
      //`${t("gamePotRoundInstruction")}|${guesses.length + 1} of ${maxAttempts}|${getOkNokEmoji(false)}`
    }

    addGuess(currentGuess);
    setTimeout(() => {
      incGuessNum();
    }, SQUARE_ANIMATION_LENGTH * squares.length);
    // console.log("currentRoundStatus:", currentRoundStatus);
  };

  const handleGuessButtonClicked = (): void => {
    console.log("Guess button clicked.");
  };

  return (
    <div>
      {/* page part 1: the problem statement - not shown on original Worldle on 1st round
      <div className="gap-1 text-center">
        <p>Name the province or territory</p>
      </div>
       */}
      <div>
        <img
          src={getPotMapSvgUrl(potCode as PotCode)}
          alt="silhouette of a province or territory"
          className="max-h-52 m-auto my-5 transition-transform duration-700 ease-in dark:invert h-full"
        />
      </div>
      <form
        onSubmit={handleFormSubmission}
        className={`flex flex-col py-0.5 ${currentRoundStatus !== "pending" ? "hidden" : ""}`}
      >
        <div className="flex flex-grow">
          <AutoSuggestInput
            currentGuess={currentGuess}
            setCurrentGuess={setCurrentGuess}
            placeholder={`${t("province")}, ${t("territory")}`}
            suggestionsArray={getPotNamesByLang(i18n.language)}
          />
          <GuessButton
            onClick={handleGuessButtonClicked}
            text={`🍁 ${t("guessVerb")}`}
          />
        </div>
      </form>
      <Guesses
        currentRoundStatus={currentRoundStatus}
        guesses={guesses}
        maxAttempts={maxAttempts}
        solutionCode={potCode as PotCode}
        guessNum={guessNum}
      />
    </div>
  );
}

export default GameRoundPot;
