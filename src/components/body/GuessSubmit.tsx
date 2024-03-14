import React from "react";

interface GuessSubmitProps {}

const GuessSubmit: React.FC<GuessSubmitProps> = () => {
  return (
    <button
      type="submit"
      className={`
        border-2 rounded uppercase flex-shrink-0 dark:bg-slate-800 px-2
        font-semibold
      `}
    >
      🍁 Guess
    </button>
  );
};

export default GuessSubmit;
