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
