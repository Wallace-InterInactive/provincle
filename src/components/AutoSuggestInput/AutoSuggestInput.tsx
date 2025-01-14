import Autosuggest from "react-autosuggest";
import { useState } from "react";
import { fetchSuggestions } from "../../utils/utils.ts";

interface AutoSuggestInputProps {
  currentGuess: string;
  setCurrentGuess: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  suggestionsArray: string[];
}

export function AutoSuggestInput({
  currentGuess,
  setCurrentGuess,
  placeholder,
  suggestionsArray,
}: AutoSuggestInputProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  return (
    <>
      <Autosuggest
        id="map-autosuggest"
        suggestions={suggestions}
        getSuggestionValue={suggestion => suggestion}
        inputProps={{
          value: currentGuess,
          placeholder: placeholder,
          onChange: (_e, { newValue }) => setCurrentGuess(newValue),
          className: "w-full dark:bg-slate-800 dark:text-slate-100",
        }}
        onSuggestionsFetchRequested={({ value }) =>
          //setSuggestions(fetchSuggestions(CSSFontFeatureValuesRule, value))
          setSuggestions(fetchSuggestions(suggestionsArray, value))
        }
        onSuggestionsClearRequested={() => setSuggestions([])}
        renderSuggestion={suggestion => (
          <div className="dark:bg-slate-800 border-2 rounded dark:text-slate-100">
            {suggestion}
          </div>
        )}
        renderSuggestionsContainer={({ containerProps, children }) => (
          <div
            {...containerProps}
            className={`${containerProps.className} absolute bottom-full w-full bg-white mb-1 divide-x-2 max-h-52 overflow-auto`}
          >
            {children}
          </div>
        )}
        containerProps={{
          className:
            "dark:bg-slate-800 border-2 rounded flex-auto relative p-1 mr-1",
        }}
      />
    </>
  );
}
