import { GuessButtonProps } from "../../types/GuessButtonProps.ts";

export function GuessButton({ onClick, text }: GuessButtonProps) {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="dark:bg-slate-800 border-2 rounded uppercase flex-shrink-0 p-1 font-semibold"
    >
      {text}
    </button>
  );
}
