/*
export interface Guess {
  name: string;
  answer: string;
  result: string;
  //distance: number;
  //direction: Direction;
}

export interface Quiz {
  id: string;
  name: string;
  maxAttempts: number;
  //expected: string;  here or in GameRound?
}

export interface GameRound {
  id: string;
  name: string;
  quiz: Quiz;
  expected: string;
  attempts: string[];
  // pass attemps[-1] == expected, fail if attempts.length >= quiz.maxAttemps;
}

export interface GameState {
  currentQuizId: string;
  gameRoundList: GameRound[];
}
*/

/* ========================= */

import { getTodaysPotCode } from "./dataBank.ts";

export interface newGameState {
  potCode: string;
  currentRound: number;
  //  currentRoundIsFinished: boolean;
  //  rounds: Round[];
}

//export interface Round {
//  name: string;
//  solution: string;
//  maxAttempts: number;
//  currentGuess: string;
//  guesses: string[];
//}

const defaultNewGameState: newGameState = {
  potCode: getTodaysPotCode(),
  currentRound: 0,
  //  currentRoundIsFinished: false,
  //  rounds: [
  //    {
  //      name: "map",
  //      solution: "qc",
  //      maxAttempts: 3,
  //      currentGuess: "",
  //      guesses: [],
  //    },
  //  ],
};

export default defaultNewGameState;
