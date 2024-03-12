import React from "react";
import "./App.css";
import Provincle from "./components/Provincle";
import Help from "./components/header/Help";
import Settings from "./components/header/Settings";
import Game from "./components/body/Game";

const App: React.FC = () => {
  return (
    <div
      className={
        "flex flex-col justify-between " +
        "items-center min-h-screen dark:bg-slate-900 dark:text-slate-50"
      }
    >
      <div>
        <div className="w-full max-w-lg flex flex-col">
          <header className="border-b-2 border-gray-200 flex mb-4">
            <Help />

            <h1
              className={
                "text-4xl font-bold uppercase" +
                "tracking-wide text-center mx-10 my-2 flex-auto"
              }
            >
              🇨🇦 <Provincle />
            </h1>

            <Settings />
          </header>
          <Game />
        </div>
      </div>

      <footer className="flex justify-center text-sm mt-8 mb-1">
        <span>
          ❤️ <Provincle /> ❓
        </span>
      </footer>
    </div>
  );
};

export default App;
