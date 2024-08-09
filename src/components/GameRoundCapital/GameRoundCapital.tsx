import Autosuggest from "react-autosuggest";
import { FormEvent, useState, useEffect } from "react";
import { PotCode } from "../../types/data.ts";
import dataBank, { potCodes } from "../../utils/dataBank.ts";
import {
  sanitizeString,
  isValidGuess,
  getPotMapSvgUrl,
  getOkNokEmoji,
} from "../../utils/utils.ts";
import defaultGameState from "../../utils/gameState.ts";
import { useTranslation } from "react-i18next";
import { GameRoundProps } from "../../types/GameRoundProps.ts";
import { GameRoundPropsExtended } from "../../types/GameRoundPropsExtended.ts";

//const getListOfCapitals = (): string[] => {
function getListOfCapitals(): string[] {
  return potCodes.map((pot: PotCode) => dataBank[pot].capital[0]);
}

function GameRoundCapital(props: GameRoundProps) {
  const gameState = defaultGameState;

  let props2: GameRoundPropsExtended = {
    ...props,
    roundInstructionId: "gameCapitalRoundInstruction",
    target: dataBank[gameState.potCode as PotCode].capital[0], // TODO: why is it "capital: string[]" ?
    possibleValues: getListOfCapitals(),
    maxAttempts: 3,
  };
  return GameRoundTextInputWithImage(props2);
}

function GameRoundTextInputWithImage({
  roundInstructionId,
  currentRoundStatus,
  setCurrentRoundStatus,
  target,
  possibleValues,
  maxAttempts,
}: GameRoundPropsExtended) {
  const { t } = useTranslation();
  // const t = i18n.getFixedT("LOLcalize");

  //export function GameRound1( currentRoundStatus, setCurrentRoundStatus) {
  const [gameState] = useState(defaultGameState);  //
  const [guesses, setGuesses] = useState<string[]>([]);

  // TODO: these two can and should be extracted to the input component easily (can be defined there)
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");

  useEffect(() => {
    if (guesses.length === maxAttempts) {
      console.log(`Game over! (${currentRoundStatus})`);
    }
    setCurrentGuess("");
  }, [guesses]);

  const handleFormSubmission = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!isValidGuess(currentGuess, possibleValues)) {
      console.log("Unknown province or territory!");
      return;
    }

    if (guesses.includes(currentGuess)) {
      console.log("Already Guessed!");
      return;
    }

    setGuesses([...guesses, currentGuess]);

    if (
      //sanitizeString(dataBank[potCode as PotCode].capital[0]) ===
      sanitizeString(target) === sanitizeString(currentGuess)
    ) {
      console.log(`You guessed it (${currentGuess})!`);
      setCurrentRoundStatus("won");
    } else if (guesses.length + 1 === maxAttempts) {
      setCurrentRoundStatus("lost");
    } else {
      console.log(`You didn't guess it! ${currentGuess}.${target}`);
    }

    console.log("currentRoundStatus:", currentRoundStatus);
  };

  function getResult(guess: string, target: string): string {
    return getOkNokEmoji(guess === target);
  }
  /*
  const getResultExtra = (guess: string, target: string): string => {
    return guess === target ? "hint" : "hont";
  };
  */

  const handleGuessButtonClicked = (): void => {
    console.log("Guess button clicked.");
  };

  return (
    <div>
      {t(roundInstructionId) === "" ? (
        <div />
      ) : (
        <div className="gap-1 text-center">
          <p>
            {t(roundInstructionId)}{" "}
            <i>{dataBank[gameState.potCode as PotCode].name}</i>
          </p>
        </div>
      )}
      <div>
        <img
          src={getPotMapSvgUrl(gameState.potCode as PotCode)}
          alt="silhouette of a province or territory"
          className="max-h-52 m-auto my-5 transition-transform duration-700 ease-in dark:invert h-full"
        />
      </div>
      {/* page part 2: the input field */}
      <form
        onSubmit={handleFormSubmission}
        className={`flex flex-col dark:bg-slate-800 py-0.5 ${currentRoundStatus !== "pending" ? "hidden" : ""}`}
      >
        <div className="flex flex-grow">
          <Autosuggest
            id="map-autosuggest"
            suggestions={suggestions}
            getSuggestionValue={suggestion => suggestion}
            inputProps={{
              value: currentGuess,
              placeholder: `${t("province")}, ${t("territory")}`,
              onChange: (_e, { newValue }) => setCurrentGuess(newValue),
              className: "w-full dark:bg-slate-800 dark:text-slate-100",
            }}
            onSuggestionsFetchRequested={({ value }) =>
              setSuggestions(
                possibleValues.filter((potName: string) =>
                  sanitizeString(potName).includes(sanitizeString(value))
                )
              )
            }
            onSuggestionsClearRequested={() => setSuggestions([])}
            renderSuggestion={suggestion => (
              <div className="border-2 dark:bg-slate-800 dark:text-slate-100">
                {suggestion}
              </div>
            )}
            renderSuggestionsContainer={({ containerProps, children }) => (
              <div
                {...containerProps}
                className={`${containerProps.className} absolute bottom-full w-full bg-white mb-1 divide-x-2 max-h-52 overflow-auto`}
              >
                {children}
              </div>
            )}
            containerProps={{
              className: "border-2 rounded flex-auto relative p-1 mr-1",
            }}
          />
          <button
            type="submit"
            onClick={handleGuessButtonClicked}
            className="border-2 rounded-xl uppercase flex-shrink-0 px-2 font-semibold"
          >
            🍁 {t("guessVerb")}
          </button>
        </div>
      </form>
      {/* page part 3a: feedback part, won/lost/etc */}
      <div>
        {currentRoundStatus === "pending" ? (
          <div className="grid grid-cols-6 gap-1 text-center py-0.5">
            <div className="my-div-1">
              <span className="opacity-70">
                {t("guessNoun")} {guesses.length + 1} / {maxAttempts}
              </span>
            </div>
          </div>
        ) : (
          <div className="my-span-2">
            <span
              className={`my-span-3 text-white ${currentRoundStatus === "won" ? "bg-green-700" : "bg-red-600"}`}
            >
              {target}
            </span>
          </div>
        )}
        {/* page part 3b: feedback: list of submitted guesses  */}
        <div>
          {Array.from({ length: maxAttempts }, (_, i) => {
            const guess: string = guesses[i];
            return guesses[i] ? (
              <div
                key={i}
                className="grid grid-cols-[5fr_1fr] gap-1 text-center py-0.5"
              >
                <div className="my-guess-div">
                  <p className="my-guess-p">{guesses[i] || "-"}</p>
                </div>
                <div className="my-guess-div">
                  <p className="my-guess-p text-xl">
                    {getResult(guess, target)}
                  </p>
                </div>
              </div>
            ) : (
              <div
                key={i}
                className="grid grid-cols-6 gap-1 text-center py-0.5"
              >
                <div className="my-div-2" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default GameRoundCapital;
