import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import { getPotNames } from "src/services/DataBank";
import { sanitizeString } from "src/services/Utils";

interface ProvinceInputProps {
  currentGuess: string;
  setCurrentGuess: (guess: string) => void;
}

const ProvinceInput: React.FC<ProvinceInputProps> = props => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={({ value }) =>
        setSuggestions(
          getPotNames().filter(potName =>
            sanitizeString(potName).includes(sanitizeString(value))
          )
        )
      }
      onSuggestionsClearRequested={() => setSuggestions([])}
      getSuggestionValue={suggestion => suggestion}
      renderSuggestion={suggestion => (
        <div className="border-2 dark:bg-slate-800 dark:text-slate-100">
          {suggestion}
        </div>
      )}
      containerProps={{ className: "border-2 flex-auto relative" }}
      inputProps={{
        className: "w-full dark:bg-slate-800 dark:text-slate-100",
        placeholder: "Province, Territory",
        value: props.currentGuess,
        onChange: (_e, { newValue }) => props.setCurrentGuess(newValue),
      }}
      renderSuggestionsContainer={({ containerProps, children }) => (
        <div
          {...containerProps}
          className={`
            ${containerProps.className} absolute bottom-full w-full 
            bg-white mb-1 divide-x-2 max-h-52 overflow-auto
          `}
        >
          {children}
        </div>
      )}
    />
  );
};

export default ProvinceInput;
