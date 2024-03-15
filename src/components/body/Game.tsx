import React, { useState } from "react";
import PotMapRound from "./rounds/PotMapRound";
import PotContext from "src/contexts/PotContext";
import { getRandomPotCode } from "src/services/dataBank";

interface GameProps {}

const Game: React.FC<GameProps> = () => {
  const [code, setCode] = useState(getRandomPotCode());
  const codeValue = { code, setCode };

  return (
    <PotContext.Provider value={codeValue}>
      <PotMapRound />
    </PotContext.Provider>
  );
};

export default Game;
