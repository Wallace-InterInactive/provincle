import React from "react";
import { getRandomElement } from "src/services/DataBank";
import PotMapRound from "./rounds/PotMapRound";

interface GameProps {}

const Game: React.FC<GameProps> = () => {
  const pot = getRandomElement();

  return <PotMapRound code={pot} />;
};

export default Game;
