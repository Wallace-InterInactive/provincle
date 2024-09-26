import { useState, useEffect } from "react";
import { getColorOfStatus, shuffle } from "../../utils/utils.ts";
import "../../ImageGrid.css";
import { useTranslation } from "react-i18next";
import { GameRoundProps } from "../../types/GameRoundProps.ts";
import { GameRoundResult } from "../../types/data.ts";
import {
  dataBank,
  getMajorLeagueTeamKeys,
  getTeamLogoSvgUrl,
} from "../../canadata/dataBank.ts";
import confetti from "canvas-confetti";
import { toastSuccess } from "../../utils/animations.ts";
import i18n from "../../canadata/i18n.ts";

const maxAttempts = 3;
const numLogosToShow = 6;

function GameRoundMajorLeague({
  gameRoundId,
  gameState,
  currentRoundStatus,
  setCurrentRoundStatus,
  setRoundResult,
}: GameRoundProps) {
  const { t } = useTranslation();
  const { t: tGeo } = useTranslation("geo");
  const { t: tML } = useTranslation("majorLeague");

  const localTeams: string[] = [];
  const otherTeams: string[] = [];
  getMajorLeagueTeamKeys().forEach((team: string) => {
    if (dataBank.data[gameState.potCode].majorLeagueTeams.includes(team)) {
      localTeams.push(team);
    } else {
      otherTeams.push(team);
    }
  });

  if (localTeams.length === 0 && currentRoundStatus !== "n/a") {
    setCurrentRoundStatus("n/a");
    setRoundResult(gameRoundId, GameRoundResult.NoRoundToday);
  } else {
    shuffle(localTeams);
    shuffle(otherTeams);
  }
  console.log(`Local teams: ${localTeams}`);
  console.log(`Other teams: ${otherTeams}`);

  // a single correct solution, the rest are decoys
  // TODO: perhaps make it multi-choice
  const solutionTeam = localTeams[0];
  const teamList = [solutionTeam, ...otherTeams.slice(0, numLogosToShow - 1)];
  shuffle(teamList);
  console.log(`teamList: ${teamList}`);

  const [guesses, setGuesses] = useState<string[]>([]);

  const addGuess = (guess: string): void => {
    setGuesses([...guesses, guess]);
  };

  useEffect(() => {
    if (guesses.length === maxAttempts) {
      console.log(`Game over! (${currentRoundStatus})`);
    }
    //setCurrentGuess("");
  }, [guesses]);

  const handleLogoClicked = (e: any): void => {
    const guessedItem = `${e.target.id}`;
    const guess = guessedItem.split("-")[1];
    console.log(`Guess button clicked: '${e.target.id}'`);
    if (currentRoundStatus !== "pending" || guesses.includes(guess)) {
      return;
    }

    console.log(`current guess ${guessedItem}`);
    if (`guess-${solutionTeam}` === guessedItem) {
      setCurrentRoundStatus("won");
      toastSuccess(t("guessedIt"));
      confetti();
      setRoundResult(gameRoundId, grade(guess));
    } else if (guesses.length + 1 === maxAttempts) {
      setCurrentRoundStatus("lost");
      setRoundResult(gameRoundId, grade(guess));
    }
    addGuess(guess);
  };

  // prettier-ignore
  function grade(guess: string): GameRoundResult {
    if (guess === solutionTeam) {
      return guesses.length === 0 ? GameRoundResult.Excellent
           : guesses.length === 1 ? GameRoundResult.Good
           :                        GameRoundResult.Fair;
    } else {
      return guesses.length == 0 ? GameRoundResult.NotStarted
                                 : GameRoundResult.Failed;
    }
  }

  return localTeams.length === 0 ? (
    <div className="gap-1 text-center">
      <p>No Major League Round Today 😢</p>
    </div>
  ) : (
    <div>
      <div className="gap-1 text-center">
        <p>
          {`${t("gameMajorLeagueRoundInstruction")} ${i18n.language.startsWith("en") ? tGeo(gameState.potCode) : tGeo(`of_${gameState.potCode}`)}?`}
        </p>
      </div>
      <div>
        <div
          id="main"
          className="grid image-grid justify-items-stretch grid-cols-2"
        >
          {Array.from({ length: numLogosToShow }, (_, i) => {
            const team = teamList[i];
            const bgColor: string = !guesses.includes(team)
              ? getColorOfStatus("pending")
              : team === solutionTeam
                ? getColorOfStatus("won")
                : getColorOfStatus("lost");
            return (
              <div className="image-item justify-self-auto rounded-lg m-4">
                <img
                  src={getTeamLogoSvgUrl(team)}
                  alt={`logo of a team:${i}:${team}`}
                  className={`cursor-pointer max-h-24 m-auto h-20`}
                  onClick={handleLogoClicked}
                  id={`guess-${team}`}
                />
                <p
                  className={`visible h-6 rounded-xl -mx-2 px-2 text-black bg-${bgColor}`}
                >
                  {currentRoundStatus === "pending" && !guesses.includes(team) // or display if already guessed (show names or wrong guess)
                    ? t("guessVerb")
                    : tML(teamList[i])}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <br />
      <div>
        {currentRoundStatus === "pending" ? (
          <div
            className={`grid grid-cols-${numLogosToShow} gap-1 text-center py-0.5`}
          >
            <div className="my-div-1">
              <span className="opacity-70">
                {t("guessNoun")} {guesses.length + 1} / {maxAttempts}
              </span>
            </div>
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

export default GameRoundMajorLeague;
