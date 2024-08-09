interface GuessButtonProps {
  onClick: () => void;
  text: string;
}

export function GuessButton({ onClick, text }: GuessButtonProps) {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="dark:bg-slate-800 border-2 rounded uppercase flex-shrink-0 p-1 mr-1 font-semibold"
    >
      {text}
    </button>
  );
}
