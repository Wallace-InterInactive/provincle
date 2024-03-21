import { createContext } from "react";

const GuessesContext = createContext({
  guesses: [""],
  setGuesses: (guess: string[]) => {
    console.log(guess);
  },
});

export default GuessesContext;
