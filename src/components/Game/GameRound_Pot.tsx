import Autosuggest from "react-autosuggest";
import { FormEvent, useState, useEffect } from "react";
import dataBank, { potNames, getPotCode } from "../../utils/dataBank.ts";
import {
  sanitizeString,
  isValidPot,
  calculateDistance,
  getDirectionFromSolution,
  arrowImageUrl,
  getImgRotateFromSolution,
  getCssRotate,
  getPotMapSvgUrl,
} from "../../utils/utils.ts";
import defaultNewGameState from "../../utils/gameState.ts";
//import { GameRoundStatus, getPseudoRandomPotCode } from "../../utils/dataBank.ts";
import { GameRoundProps } from "./GameRoundProps.ts";
import he from "he";

const GameRound_Pot: React.FC<GameRoundProps> = ({ currentRoundStatus, setCurrentRoundStatus }) => {

//export function GameRound1( currentRoundStatus, setCurrentRoundStatus) {
  const [newGameState, setNewGameState] = useState(defaultNewGameState);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const updateGameState = (key: string, val: any): void => {
    setNewGameState(prevState => ({
      ...prevState,
      [key]: val,
    }));
  };

  // TODO: should move to GameProps? as quasi-const it's of for the proof-of-concept
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

  const maxAttempts = 3;
  //let currentRoundStatus: GameRoundStatus = "pending";
  const [guesses, setGuesses] = useState<string[]>([]);
  //const [giveupCnt, setGiveupCnt] = useState<number>(0);

  const addGuess = (guess: string): void => {
    setGuesses([...guesses, guess]);
  };

  // TODO: these two can and should be extracted to the input component easily (can be defined there)
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");

  //const [currentRoundStatus, setCurrentRoundStatus] =
  //  useState<GameRoundStatus>("pending");

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
      {/* page part 1: the problem statement - not shown on original Worldle on 1st round
      <div className="gap-1 text-center">
        <p>Name the province or territory</p>
      </div>
       */}
      <div>
        <img
          src={getPotMapSvgUrl(potCode)}
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
      {/* page part 3a: feedback part, won/lost/etc */}
      <div>
        {currentRoundStatus === "pending" ? (
          <div className="grid grid-cols-6 gap-1 text-center py-0.5">
            <div className="my-div-1">
              <span className="opacity-70">
                GUESS {guesses.length + 1} / {maxAttempts}
              </span>
            </div>
          </div>
        ) : (
          <div className="my-span-2">
            <span
              className={`my-span-3 text-white ${currentRoundStatus === "won" ? "bg-green-700" : "bg-red-600"}`}
            >
              {dataBank[potCode].name}
            </span>
          </div>
        )}
      {/* page part 3b: feedback: list of submitted guesses  */}
          <div>
            {Array.from({ length: maxAttempts }, (_, i) => {
              const guessCode = getPotCode(guesses[i]);
              //   {calculateDistance(potCode, guesses[i])} km
              //   {getDirectionFromSolution(potCode, guesses[i]) ?? "-"}
              return guesses[i] ? (
                <div key={i} className="grid grid-cols-6 gap-1 text-center py-0.5">
                  <div className="my-guess-div">
                    <p className="my-guess-p">
                      {guesses[i] || "-"}
                    </p>
                  </div>
                  <div className="my-guess-div">
                    <p className="my-guess-p">
                      {calculateDistance(potCode, guessCode)} km
                    </p>
                  </div>
                  <div className="my-guess-div">
                    {/* add commented-outs here, TO BE DELETED
                    <img src={arrowImageUrl} className={"rotate-90 " + getCssRotate(getImgRotateFromSolution(potCode, guessCode)) + " max-h-6 object-cover"} />
                     getcalculateDirectionOf(potCode, guessCode)
                    */}
                    <p className="my-guess-p text-xl">
                      {he.decode(getDirectionFromSolution(potCode, guessCode) || "*")}
                    </p>
                  </div>
                </div>
              ) : (
                <div key={i} className="grid grid-cols-6 gap-1 text-center py-0.5">
                  <div className="my-div-2">
                  </div>
                </div>
              );
            })}
          </div>
      </div>
    </div>
  );
}
export default GameRound_Pot;
