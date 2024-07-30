import { useState, useEffect } from "react";
import dataBank from "../../utils/dataBank.ts";
//import dataBank, { potNames, getPotCode } from "../../utils/dataBank.ts";
import { getPotFlagSvgUrl } from "../../utils/utils.ts";
import defaultNewGameState from "../../utils/gameState.ts";
import { getPseudoRandomPotCode } from "../../utils/dataBank.ts";
import { GameRoundProps } from "./GameRoundProps.ts";
import '../../ImageGrid.css';

const GameRound2: React.FC<GameRoundProps> = ({ currentRoundStatus, setCurrentRoundStatus }) => {
//export function Game() {

  //const [newGameState, setNewGameState] = useState(defaultNewGameState);
  // left here just to remember the setXXX if needed later
  const [newGameState] = useState(defaultNewGameState);

  // TODO: move to props and set by Game.tsx?
  // TODO: remove ts-ignore
  // @ts-ignore
  const { potCode, currentRound } = newGameState;

  const maxAttempts = 3;
  //let currentRoundStatus: GameRoundStatus = "pending";
  const [guesses, setGuesses] = useState<string[]>([]);

  const addGuess = (guess: string): void => {
    setGuesses([...guesses, guess]);
  };

  //const [currentGuess, setCurrentGuess] = useState("");

  useEffect(() => {
    if (guesses.length === maxAttempts) {
      console.log(`Game over! (${currentRoundStatus})`);
    }
    //setCurrentGuess("");
  }, [guesses]);

  //const handleGuessButtonClickedRound2 = (guess:number): void => {
  const handleGuessButtonClickedRound2 = (e:any): void => {
    // TODO: get the id of the image clicked at...
    const guess=`${e.target.id}`;
    console.log(`Guess button clicked: $lt;${e.target.id}??&gt;`);
    
    //if (guesses.includes(currentGuess)) { TODO
    //setCurrentGuess(guess);  // TODO?
    // set border to green/red

    addGuess(guess);
    setCurrentRoundStatus("pending"); // TODO
    console.log(`current guess ${guess}`);
  };

  return (
    <div>
      <div>
          <div id="main" className="grid image-grid justify-items-stretch grid-cols-2"> 
            {Array.from({ length: 6 }, (_, i) => {
              return (
                <div className="image-item justify-self-auto rounded-lg m-4">
                  <img
                    src={getPotFlagSvgUrl(getPseudoRandomPotCode(i))}
                    alt="flag of a pot"
                    className="max-h-52 m-auto my-5 transition-transform duration-700 ease-in h-20"
                    onClick={handleGuessButtonClickedRound2}
                    id={`guess-${getPseudoRandomPotCode(i)}`}
                  />
                  <p className="visible">tbh: {getPseudoRandomPotCode(i)} : {dataBank[getPseudoRandomPotCode(i)].name}</p>
                </div> 
                )
            })}
          </div>
      </div>
      <br />
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
          <div>
                <div className="grid grid-cols-6 gap-1 text-center py-0.5">
                  <div className="my-div-2">status
                    <span className="opacity-70"></span>
                  </div>
                </div>
          </div>
      </div>
    </div>
  );
}
export default GameRound2;
