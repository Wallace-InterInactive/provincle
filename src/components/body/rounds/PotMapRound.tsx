import React, { useContext, useState, useMemo } from "react";
import GuessSubmit from "../GuessSubmit";
import ProvinceInput from "../ProvinceInput";
import VectorFrame from "../VectorFrame";
import PotContext from "src/contexts/PotContext";
import CurrentGuessContext from "src/contexts/CurrentGuessContext";
import { guessedIt } from "src/services/utils";
import { Guesses } from "../Guesses";
import { Guess } from "src/components/gamedata/gameState";

interface PotMapRoundProps {}

const PotMapRound: React.FC<PotMapRoundProps> = () => {
  const { code /* , setCode */ } = useContext(PotContext);

  const [currentGuess, setCurrentGuess] = useState("");
  const memoizedCurrentGuessValue = useMemo(
    () => ({
      currentGuess,
      setCurrentGuess,
    }),
    [currentGuess, setCurrentGuess]
  );

  const [prevGuesses, setPrevGuesses] = useState<Guess[]>([]);
  const handleNewGuess = (answer: string, result: string): void => {
    const newGuess: Guess = {
      name: currentGuess,
      answer: answer,
      result: result,
    };
    setPrevGuesses([...prevGuesses, newGuess]);
    setCurrentGuess("");
  };

  return (
    <div>
      <VectorFrame
        imagePath={`
          ./provinces-and-territories/${code}/${code}-map.svg
        `}
        altText={`map of ${code}`}
        invertColor={true}
        hideImage={false} // TODO: parameter
        gameOver={false} // TODO: parameter
      />
      <form
        onSubmit={(): void => {
          if (guessedIt(code, currentGuess)) {
            console.log("Well done!");
          } else {
            console.log("Not quite!");
          }
        }}
        className="flex flex-col"
      >
        <div className="flex flex-grow">
          <CurrentGuessContext.Provider value={memoizedCurrentGuessValue}>
            <ProvinceInput />
            <GuessSubmit handleAddNewGuess={handleNewGuess} />
          </CurrentGuessContext.Provider>
        </div>
      </form>
      <Guesses rowCount={prevGuesses.length} guesses={prevGuesses} />
    </div>
  );
};

export default PotMapRound;
