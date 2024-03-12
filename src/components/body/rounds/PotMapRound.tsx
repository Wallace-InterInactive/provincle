import React from "react";
import GuessSubmit from "../GuessSubmit";
import ProvinceInput from "../ProvinceInput";
import VectorFrame from "../VectorFrame";

interface PotMapRoundProps {
  code: string;
}

const PotMapRound: React.FC<PotMapRoundProps> = (props: PotMapRoundProps) => {
  return (
    <div>
      <VectorFrame
        imagePath={`
          ./provinces-and-territories/${props.code}/${props.code}-map.svg
        `}
        invertColor={true}
        hideImage={false} // TODO: parameter
        gameOver={false} // TODO: parameter
      />
      <form
        onSubmit={() => console.log("form submitted")}
        className="flex flex-col"
      >
        <div className="flex flex-grow">
          <ProvinceInput />
          <GuessSubmit />
        </div>
      </form>
    </div>
  );
};

export default PotMapRound;
