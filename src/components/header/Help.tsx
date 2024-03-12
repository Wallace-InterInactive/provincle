import React from "react";

interface HelpProps {}

const Help: React.FC<HelpProps> = () => {
  return (
    <button
      className="mx-3 text-xl"
      type="button"
      onClick={() => console.log("clicked HELP")}
    >
      ❓
    </button>
  );
};

export default Help;
