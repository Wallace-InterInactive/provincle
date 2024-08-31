import accentsMap from "./accentsMap.ts";
import { calculateDistanceInKm, angle15ToDir, calculateAngle } from "./geo.ts";
import {
  CardinalDirection,
  GameRoundStatus,
  PotCode,
  GameRoundResult,
} from "../types/data.ts";
import dataBank, {
  getPotNamesByLang,
  getPseudoRandomNumber,
} from "./dataBank.ts";

// TODO some UI or i18n module
const directionEmojiMap = new Map<CardinalDirection, string>([
  ["N", "⬆️"],
  ["S", "⬇️"],
  ["W", "⬅️"],
  ["E", "➡️"],
  ["NW", "↖️"],
  ["NE", "↗️"],
  ["SW", "↙️"],
  ["SE", "↘️"],
  ["*", "🎯"],
  // Add more mappings as needed
  // note: https://emojipedia.org/search?q=arrow
  //   ⬆️ ↗️ ➡️ ↘️ ⬇️ ↙️ ⬅️ ↖️ 📍 🏁 🎯
  // note: https://www.toptal.com/designers/htmlarrows/arrows/
  //   &uarr; &rarr; &darr; &larr; &nwarr; &nearr; &swarr; &searr; &#x25CE;
  // https://emojigraph.org/right-arrow/ - for escape codes of emojis
]);

export const mapGradeToEmoji = new Map<GameRoundResult, string>([
  [1, "🚫"],
  [2, "★"],
  [3, "★★★"],
  [4, "★⭐★"],
  [5, "⭐🌟⭐"],
]);

export function sanitizeString(str: string): string {
  let retVal = str.trim().toLowerCase();

  for (const accentedChar in accentsMap) {
    const regex = new RegExp(accentedChar, "g");
    retVal = retVal.replace(regex, accentsMap[accentedChar]);
  }

  return retVal;
}

export function isValidPot(currentGuess: string, langCode: string): boolean {
  if (!currentGuess) {
    return false;
  }

  if (!langCode.startsWith("en") && !langCode.startsWith("fr")) {
    throw new Error("invalid language");
  }

  langCode = langCode.substring(0, 2);
  const sanitized = sanitizeString(currentGuess);

  return (
    undefined !== sanitized &&
    "" !== sanitized &&
    getPotNamesByLang(langCode).some(name => sanitizeString(name) === sanitized)
  );
}

export function isValidGuess(
  currentGuess: string,
  listOfValues: string[]
): boolean {
  if (!currentGuess) {
    return false;
  }

  const sanitized = sanitizeString(currentGuess);
  return (
    undefined !== sanitized &&
    "" !== sanitized &&
    listOfValues.some(name => sanitizeString(name) === sanitized)
  );
}

/**
 * Returns a string of the distance between the guess and
 * the solution in kilometers or miles and the corresponding
 * unit based on the current setting.
 */
export function getDistanceWithUnitBySetting(
  fromGuess: PotCode,
  toSolution: PotCode
): string {
  // TODO: setting for mi
  const distance = calculateDistanceInKm(
    dataBank[toSolution].coordinates,
    dataBank[fromGuess].coordinates
  );
  return `${distance} km`;
}

export function getDirectionEmoji(
  fromGuess: PotCode,
  toSolution: PotCode
): string {
  if (fromGuess === toSolution) {
    return directionEmojiMap.get("*") as string;
  }
  const angle: number = calculateAngle(
    dataBank[fromGuess].coordinates,
    dataBank[toSolution].coordinates
  );
  // console.log(
  //   `.calculateAngle(${fromGuess}, ${toSolution})=>${angle}:${angle15ToDir(angle)}:${directionEmojiMap.get(angle15ToDir(angle))}`
  // );
  return directionEmojiMap.get(angle15ToDir(angle)) as string;
  // const direction: CardinalDirection = calculateDirection(
  //   fromGuess,
  //   toSolution
  // );
  // return directionEmojiMap.get(direction) as string;
}

export function getBullseyeEmoji(isOk: boolean): string {
  return isOk ? "🎯" : "❌";
}

export function getOkNokEmoji(isOk: boolean): string {
  return isOk ? "✅" : "❌";
}

export function getPotMapSvgUrl(potCode: PotCode): string {
  return new URL(
    `../assets/provinces-and-territories/${potCode}/${potCode}-map.svg`,
    import.meta.url
  ).href;
}

export function getPotFlagSvgUrl(potCode: PotCode): string {
  return new URL(
    `../assets/provinces-and-territories/${potCode}/${potCode}-flag.svg`,
    import.meta.url
  ).href;
}

export function getColorOfStatus(
  currentRoundStatus: GameRoundStatus /*, shade: number = 0 */
): string {
  return currentRoundStatus === "won"
    ? "custom-light-green"
    : currentRoundStatus === "lost"
      ? "custom-light-red"
      : "custom-light-blue-2"; //"custom-light-blue"; // sky-700 gray-500
}

export function fetchSuggestions(elements: string[], value: string): string[] {
  return elements.filter((element: string) =>
    sanitizeString(element).includes(sanitizeString(value))
  );
}

export function shuffle<T>(alist: T[]): void {
  let hash = getPseudoRandomNumber();
  for (let i1 = 0; i1 < alist.length; i1++) {
    // todo: numShuffle, numFlagsToShow
    const i2 = Math.floor(hash % alist.length);
    [alist[i1], alist[i2]] = [alist[i2], alist[i1]];
    hash = Math.floor(hash / 7); // todo: 7
  }
}

export function changeHtmlItemClass(name: string, value: string) {
  const element = document.getElementById(name);
  if (element) {
    element.classList.add(`${value}`);
  }
}
