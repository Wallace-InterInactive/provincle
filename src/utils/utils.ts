import accentsMap from "./accentsMap.ts";
import dataBank, { potNames } from "./dataBank.ts";
import { calculateDirectionOf, calculateDistanceInKM } from "./geo.ts";

export function sanitizeString(str: string): string {
  let retVal = str.trim().toLowerCase();

  for (const accentedChar in accentsMap) {
    const regex = new RegExp(accentedChar, "g");
    retVal = retVal.replace(regex, accentsMap[accentedChar]);
  }

  return retVal;
}

export function isValidPot(currentGuess: string): boolean {
  if (!currentGuess) {
    return false;
  }

  const sanitized = sanitizeString(currentGuess);
  return (
    undefined !== sanitized &&
    "" !== sanitized &&
    potNames.some(name => sanitizeString(name) === sanitized)
  );
}

// TODO, setting for Mi/km
export function calculateDistance(
  solutionCode: string,
  guessCode: string
): number {
  console.log(`calculateDistance(${solutionCode}, ${guessCode})`);
  if (solutionCode === "" || guessCode === "") {
    return 0;
  }
  return calculateDistanceInKM(
    dataBank[solutionCode].coordinates,
    dataBank[guessCode].coordinates
  );
}

// TODO some UI or i18n module
const directoinCodeToHtml = new Map<string, string>([
  //: Record<string, string> = {
  ["N", "icon-north"], // add more here? "↗️"
  ["S", "icon-south"],
  ["W", "icon-west"],
  ["E", "icon-east"],
  // Add more mappings as needed
]);

export function getDirectionFromSolution(
  solutionCode: string,
  guessCode: string
): string {
  console.log(`getDirectionFromSolution(${solutionCode}, ${guessCode})`);
  if (solutionCode === "" || guessCode == "") {
    // TODO: write a nicer input validation
    return "*";
  }

  const dir = calculateDirectionOf(solutionCode, guessCode);
  return directoinCodeToHtml.get(dir) || "*";
}

export function getPotMapSvgUrl(potCode: string): string {
  return new URL(
    `../assets/provinces-and-territories/${potCode}/${potCode}-map.svg`,
    import.meta.url
  ).href;
}

export function getPotFlagSvgUrl(potCode: string): string {
  return new URL(
    `../assets/provinces-and-territories/${potCode}/${potCode}-flag.svg`,
    import.meta.url
  ).href;
}
