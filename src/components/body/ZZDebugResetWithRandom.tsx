import React, { useState, useMemo } from "react";
import { getRandomElement, getRandomQuiz } from "src/services/dataBank";
import { useGameState } from "../../hooks/useGameState";

interface ZZDebugResetWithRandomProps {}

const ZZDebugResetWithRandom: React.FC<ZZDebugResetWithRandomProps> = () => {
  const dayString = useMemo(getRandomElement, []);
  useGameState(dayString);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [quizId, setQuizzId] = useState("");

  const HandleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    // Perform action on form submission
    //const [_quizzId, setQuizzId] = useState("");
    console.log("Randomize button clicked:", event);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const quizId2 = getRandomQuiz();
    setQuizzId(quizId2);
    //useGamestate(quizId2)
  };

  return (
    <button
      onClick={HandleClick}
      className="border-2 uppercase flex-shrink-0 dark:bg-slate-800"
    >
      Randomize
    </button>
  );
};

export default ZZDebugResetWithRandom;
