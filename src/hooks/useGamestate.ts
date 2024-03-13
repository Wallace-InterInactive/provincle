import { useMemo } from "react";
//import { countriesWithImage, Country } from "../domain/countries";

export function useGamestate(dayString: string): string {
  const currentQuizId: string = useMemo(() => dayString
    , [dayString]);
  console.log(`useGameState quiz:${currentQuizId}`)
  return dayString;
}
