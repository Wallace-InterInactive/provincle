import React /*, { useContext } */ from "react";
// import CurrentGuessContext from "src/contexts/CurrentGuessContext";

interface GuessSubmitProps {
  handleAddNewGuess: (answer: string, result: string) => void;
}

const GuessSubmit: React.FC<GuessSubmitProps> = props => {
  // const { currentGuess } = useContext(CurrentGuessContext);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    // const answer = `2nd ${currentGuess}`;
    // const result = `3rd ${currentGuess}`;
    props.handleAddNewGuess("", "");
  };

  return (
    <button
      type="submit"
      className={
        "border-2 rounded uppercase flex-shrink-0 dark:bg-slate-800 px-2" +
        "font-semibold"
      }
      onClick={handleClick}
    >
      🍁 Guess
    </button>
  );
};

export default GuessSubmit;
