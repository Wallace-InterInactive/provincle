import { useMemo } from "react";
//import { countriesWithImage, Country } from "../domain/countries";

export function useGameState(dayString: string): string {
  const currentQuizId: string = useMemo(() => dayString, [dayString]);
  console.log(`useGameState quiz:${currentQuizId}`);
  return dayString;
}
