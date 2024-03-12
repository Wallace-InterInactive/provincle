import React from "react";

interface GuessSubmitProps {}

const GuessSubmit: React.FC<GuessSubmitProps> = () => {
  return (
    <button
      type="submit"
      className="border-2 uppercase flex-shrink-0 dark:bg-slate-800"
    >
      🍁 Guess
    </button>
  );
};

export default GuessSubmit;
