import { Provincle } from "./components/Provincle/Provincle.tsx";
import { Game } from "./components/Game/Game.tsx";
import { Settings } from "./components/Settings/Settings.tsx";
import { Help } from "./components/Help/Help.tsx";

function App() {
  return (
    <div className="flex flex-col justify-between items-center min-h-screen dark:bg-slate-900 dark:text-slate-50">
      <div>
        <div className="w-full max-w-lg flex flex-col">
          <header className="border-b-2 border-gray-200 flex mb-4">
            <Help />
            <h1 className="text-4xl font-bold uppercase tracking-wide text-center mx-10 my-2 flex-auto">
              <a href="">
                🇨🇦 <Provincle />
              </a>
            </h1>
            <Settings />
          </header>
          <Game />
        </div>
      </div>
      <footer className="flex justify-center text-sm mt-8 mb-1">
        <span>
          <a href="https://buymeacoffee.com/">
            ❤️ <Provincle /> ❓
          </a>
        </span>
      </footer>
    </div>
  );
}

export default App;
