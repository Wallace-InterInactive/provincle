import Autosuggest from "react-autosuggest";
import { FormEvent, useState, useEffect } from "react";
import dataBank, { potNames, getPotCode } from "../../utils/dataBank.ts";
import {
  sanitizeString,
  isValidPot,
  calculateDistance,
  getDirectionFromSolution,
  getPotMapSvgUrl,
} from "../../utils/utils.ts";
import defaultNewGameState from "../../utils/gameState.ts";
import { GameRoundStatus } from "../../utils/dataBank.ts";

export function Game() {
  const [newGameState, setNewGameState] = useState(defaultNewGameState);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const updateGameState = (key: string, val: any): void => {
    setNewGameState(prevState => ({
      ...prevState,
      [key]: val,
    }));
  };

  // TODO: remove ts-ignore
  // @ts-ignore
  const { potCode, currentRound } = newGameState;

  // TODO: remove ts-ignore
  // @ts-ignore
  const setPotCode = (newPotCode: string): void => {
    updateGameState("potCode", newPotCode);
  };

  // TODO: remove ts-ignore
  // @ts-ignore
  const setCurrentRound = (newCurrentRound: number): void => {
    updateGameState("currentRound", newCurrentRound);
  };

  //  const setRounds = (newRounds: Round[]): void => {
  //    updateGameState("rounds", newRounds);
  //  };

  const maxAttempts = 3;
  //let currentRoundStatus: GameRoundStatus = "pending";
  const [guesses, setGuesses] = useState<string[]>([]);

  const addGuess = (guess: string): void => {
    setGuesses([...guesses, guess]);
  };

  // TODO: these two can and should be extracted to the input component easily (can be defined there)
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");

  const [currentRoundStatus, setCurrentRoundStatus] =
    useState<GameRoundStatus>("pending");

  useEffect(() => {
    if (guesses.length === maxAttempts) {
      console.log(`Game over! (${currentRoundStatus})`);
    }
    setCurrentGuess("");
  }, [guesses]);

  const handleFormSubmission = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!isValidPot(currentGuess)) {
      console.log("Unknown province or territory!");
      return;
    }

    if (guesses.includes(currentGuess)) {
      console.log("Already Guessed!");
      return;
    }

    if (
      sanitizeString(dataBank[potCode].name) === sanitizeString(currentGuess)
    ) {
      console.log("You guessed it!");
      setCurrentRoundStatus("won");
    } else if (guesses.length + 1 === maxAttempts) {
      setCurrentRoundStatus("lost");
    } else {
      console.log("You didn't guess it!");
    }

    addGuess(currentGuess);
    console.log("currentRoundStatus:", currentRoundStatus);
  };

  const handleGuessButtonClicked = (): void => {
    console.log("Guess button clicked.");
  };

  return (
    <div>
      <div>
        <img
          src={getPotMapSvgUrl(potCode)}
          alt="silhouette of a province or territory"
          className="max-h-52 m-auto my-5 transition-transform duration-700 ease-in dark:invert h-full"
        />
      </div>
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
              placeholder: "Province, Territory",
              onChange: (_e, { newValue }) => setCurrentGuess(newValue),
              className: "w-full dark:bg-slate-800 dark:text-slate-100",
            }}
            onSuggestionsFetchRequested={({ value }) =>
              setSuggestions(
                potNames.filter((potName: string) =>
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
            🍁 Guess
          </button>
        </div>
      </form>
      <div>
        {currentRoundStatus === "pending" ? (
          <div className="grid grid-cols-6 gap-1 text-center py-0.5">
            <div className="col-span-6 transition-all duration-300 mb-0 font-bold uppercase text-sm h-8 bg-gray-200 hover:bg-gray-200 cursor-pointer dark:bg-slate-600 dark:hover:bg-slate-500 rounded flex justify-center items-center">
              <span className="opacity-70">
                GUESS {guesses.length + 1} / {maxAttempts}
              </span>
            </div>
          </div>
        ) : (
          <div className="mx-1 my-1 px-4 justify-center items-center text-md text-center overflow-hidden gap-1 py-4">
            <span
              className={`col-span-1 justify-center font-semibold border-4 border-green-500 rounded-xl mx-4 my-4 px-2 py-2 bg-custom-light-blue text-custom-dark-blue ${currentRoundStatus === "won" ? "" : "hidden"}`}
            >
              {dataBank[potCode].name}
            </span>
            <span
              className={`col-span-1 justify-center font-semibold border-4 border-red-500 rounded-xl mx-4 my-4 px-2 py-2 bg-custom-light-blue text-custom-dark-blue ${currentRoundStatus === "lost" ? "" : "hidden"}`}
            >
              {dataBank[potCode].name}
            </span>
          </div>
        )}

        {Array.from({ length: maxAttempts }, (_, i) => {
          const guessCode = getPotCode(guesses[i]);
          //   {calculateDistance(potCode, guesses[i])} km
          //   {getDirectionFromSolution(potCode, guesses[i]) ?? "-"}
          return guesses[i] ? (
            <div className="grid grid-cols-6 gap-1 text-center py-0.5">
              <div className="flex items-center justify-center border-2 h-8 col-span-3 animate-reveal rounded">
                <p className="text-ellipsis overflow-hidden whitespace-nowrap">
                  {guesses[i] || "-"}
                </p>
              </div>
              <div className="flex items-center justify-center border-2 h-8 col-span-2 animate-reveal rounded">
                <p className="text-ellipsis overflow-hidden whitespace-nowrap">
                  {calculateDistance(potCode, guessCode)} km
                </p>
              </div>
              <div className="flex items-center justify-center border-2 h-8 col-span-1 animate-reveal rounded">
                <p className="text-ellipsis overflow-hidden whitespace-nowrap">
                  {getDirectionFromSolution(potCode, guessCode) || "-"}
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-6 gap-1 text-center py-0.5">
              <div className="col-span-6 transition-all duration-300 mb-0 h-6 bg-gray-200 border-slate-300 bg-opacity-50 dark:bg-opacity-50 border-dashed dark:bg-slate-700 dark:border-slate-700 border rounded flex justify-center items-center">
                <span className="opacity-70"></span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
