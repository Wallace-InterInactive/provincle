import React, { useContext, useState } from "react";
import Autosuggest from "react-autosuggest";
import CurrentGuessContext from "src/contexts/CurrentGuessContext";
import { getPotNames } from "src/services/dataBank";
import { sanitizeString } from "src/services/utils";

interface ProvinceInputProps {}

const ProvinceInput: React.FC<ProvinceInputProps> = () => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { currentGuess, setCurrentGuess } = useContext(CurrentGuessContext);

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
      containerProps={{ className: "border-2 rounded flex-auto relative mx-2" }}
      inputProps={{
        className: "w-full dark:bg-slate-800 dark:text-slate-100",
        placeholder: "Province, Territory",
        value: currentGuess /*props.currentGuess*/,
        onChange: (_e, { newValue }) => setCurrentGuess(newValue),
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
