import React, { useState, useMemo } from "react";
import PotMapRound from "./rounds/PotMapRound";
import PotContext from "src/contexts/PotContext";
import { getRandomPotCode } from "src/services/dataBank";

interface GameProps {}

const Game: React.FC<GameProps> = () => {
  const [code, setCode] = useState(getRandomPotCode());
  const memoizedCodeValue = useMemo(() => ({ code, setCode }), [code, setCode]);

  return (
    <PotContext.Provider value={memoizedCodeValue}>
      <PotMapRound />
    </PotContext.Provider>
  );
};

export default Game;
