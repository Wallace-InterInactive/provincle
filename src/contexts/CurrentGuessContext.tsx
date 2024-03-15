import { createContext } from "react";

const CurrentGuessContext = createContext({
  currentGuess: "",
  setCurrentGuess: (newGuess: string) => {
    console.log(newGuess);
  },
});

export default CurrentGuessContext;
