import React, { useContext, useState } from "react";
import GuessSubmit from "../GuessSubmit";
import ProvinceInput from "../ProvinceInput";
import VectorFrame from "../VectorFrame";
import PotContext from "src/contexts/PotContext";
import CurrentGuessContext from "src/contexts/CurrentGuessContext";

interface PotMapRoundProps {}

const PotMapRound: React.FC<PotMapRoundProps> = () => {
  const { code /* , setCode */ } = useContext(PotContext);

  const [currentGuess, setCurrentGuess] = useState("");
  const currentGuessValue = { currentGuess, setCurrentGuess };

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
        onSubmit={() => console.log("form submitted")}
        className="flex flex-col"
      >
        <div className="flex flex-grow">
          <CurrentGuessContext.Provider value={currentGuessValue}>
            <ProvinceInput />
          </CurrentGuessContext.Provider>

          <GuessSubmit />
        </div>

        <p>Current Guess: {currentGuess}</p>
        {/* <div className="flex flex-grow">
          <Guesses
            rowCount={maxGuessCount}
            guesses={myGuessListarrayOfObjects}
            //guesses={Guess[maxGuessCount]}
          />
        </div> */}
      </form>
    </div>
  );
};

export default PotMapRound;
