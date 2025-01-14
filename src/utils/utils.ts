import accentsMap from "./accentsMap.ts";
import {
  CardinalDirection,
  GameRoundStatus,
  GameRoundResult,
  DataBank,
  PotData,
  City,
} from "../types/data.ts";

import { TFunction } from "i18next";

// export interface MyTranslateFunction {
//   (key: string): string;
// } -- almost good, except for the 't("key", { returnObjects: true, }) as string[]' use
export type MyTranslateFunction = TFunction;
export type MyGeoMapping = MyTranslateFunction;
export const defaultTFunction = (() => "") as TFunction;

// TODO some UI or i18n module
export const directionEmojiMap = new Map<CardinalDirection, string>([
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
  [0, "N/A"],
  [1, "🚫"],
  [2, "★★★"],
  [3, "⭐★★"],
  [4, "⭐⭐★"],
  [5, "⭐⭐⭐"],
]);

export function sanitizeString(str: string): string {
  let retVal = str.trim().toLowerCase();

  for (const accentedChar in accentsMap) {
    const regex = new RegExp(accentedChar, "g");
    retVal = retVal.replace(regex, accentsMap[accentedChar]);
  }

  return retVal;
}

export function getCurrentDateString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  return `${year}-0${month}-0${day}`;
}

export function getPseudoRandomNumber(): number {
  const dateString = getCurrentDateString();
  const hash = hashString(dateString);
  return Math.abs(hash);
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    // TODO: replace this ole for loop
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash;
}

export function getTodaysCodeIndex(maxNumOfCodes: number): number {
  const dateString = getCurrentDateString();
  const hash = hashString(dateString);
  return Math.abs(hash) % maxNumOfCodes;
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

export function getBullseyeEmoji(isOk: boolean): string {
  return isOk ? "🎯" : "❌";
}

export function getOkNokEmoji(isOk: boolean): string {
  return isOk ? "✅" : "❌";
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

export function getAllCityCodes(dataBank: DataBank): string[] {
  return Object.values(dataBank.data).flatMap((pot: PotData) =>
    pot.largestCities.map((city: City) => city.key)
  );
}

export function getKeyMatchingSanitizedValue(
  value: string,
  keyList: string[],
  tfunc: MyGeoMapping
): string {
  for (const code of keyList) {
    if (sanitizeString(value) === sanitizeString(tfunc(code))) {
      return code;
    }
  }
  return "invalid"; // TBD, it should be extracted/standardized better
}
