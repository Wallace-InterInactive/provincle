import React, { useState } from "react";
//import { getTodaysQuiz, getRandomQuiz, getRandomElement } from "src/services/DataBank";
import {
  getTodaysQuiz,
  getRandomQuiz,
  getRandomElement,
} from "src/services/DataBank";
import PotMapRound from "./rounds/PotMapRound";
//import { DateTime } from "luxon";  // TBD
//import { useGamestate } from "../hooks/useGamestate";

interface GameProps {}

const Game: React.FC<GameProps> = () => {
  //const pot = getRandomElement();
  const [quizzId, setQuizId] = useState("");
  //const [quizzId] = useState("provincle-todays-quiz");
  if (quizzId == "") {
    setQuizId("sk");
  }
  //const [currentGuess, setCurrentGuess] = useState("");
  console.log(
    `debug: q:${quizzId} tq:${getTodaysQuiz()} rq:${getRandomQuiz()} re:${getRandomElement()}`
  );

  return <PotMapRound code={quizzId} />;
};

export default Game;
