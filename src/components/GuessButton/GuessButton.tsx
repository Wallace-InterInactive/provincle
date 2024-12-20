import { GuessButtonProps } from "../../types/GuessButtonProps.ts";

export function GuessButton({ handler, text }: GuessButtonProps) {
  return (
    <button
      type="submit"
      onClick={handler}
      className="dark:bg-slate-800 dark:hover:bg-slate-700 border-2 rounded uppercase flex-shrink-0 p-1 font-semibold"
      data-testid="guess-btn"
    >
      {text}
    </button>
  );
}
