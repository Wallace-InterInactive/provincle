import React, { useState } from "react";
import GuessSubmit from "../GuessSubmit";
import ProvinceInput from "../ProvinceInput";
import VectorFrame from "../VectorFrame";
import { Guesses } from "../Guesses";
import { getDataBank } from "src/services/dataBank";
import { Guess } from "../../gamedata/gameState";

interface PotMapRoundProps {
  code: string;
}

const PotMapRound: React.FC<PotMapRoundProps> = (props: PotMapRoundProps) => {
  const [currentGuess, setCurrentGuess] = useState("");
  const maxGuessCount: number = getDataBank()[props.code].neighbors.length;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const myGuessListarrayOfObjects: Guess[] = Array.from(
    { length: maxGuessCount },
    (_, i) => {
      return { name: `guess-${i}`, answer: "", result: "" };
    }
  );

  return (
    <div>
      <VectorFrame
        imagePath={`
          ./provinces-and-territories/${props.code}/${props.code}-map.svg
        `}
        altText={`map of ${props.code}`}
        invertColor={true}
        hideImage={false} // TODO: parameter
        gameOver={false} // TODO: parameter
      />
      <form
        onSubmit={() => console.log("form submitted")}
        className="flex flex-col"
      >
        <div className="flex flex-grow">
          <ProvinceInput
            currentGuess={currentGuess}
            setCurrentGuess={setCurrentGuess}
          />
          <GuessSubmit />
        </div>
        <div className="flex flex-grow">
          <Guesses
            rowCount={maxGuessCount}
            guesses={myGuessListarrayOfObjects}
            //guesses={Guess[maxGuessCount]}
          />
        </div>
      </form>
    </div>
  );
};

export default PotMapRound;
