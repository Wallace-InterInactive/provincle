import { describe, expect, it } from "vitest";
import {
  fetchSuggestions,
  getColorOfStatus,
  getOkNokEmoji,
  getBullseyeEmoji,
  isValidGuess,
  sanitizeString,
  shuffle,
} from "../../utils/utils.ts";

describe("sanitizeString replaces accented characters and converts string to lowercase", () => {
  it("changes nothing", () => {
    const lowerCaseString = "lowercasestring";
    expect(sanitizeString(lowerCaseString)).toBe(lowerCaseString);
  });

  it("replaces uppercase characters with lowercase ones", () => {
    const tc1 = "UPPER";
    expect(sanitizeString(tc1)).toBe("upper");

    const tc2 = "camelCase";
    expect(sanitizeString(tc2)).toBe("camelcase");

    const tc3 = "Canada";
    expect(sanitizeString(tc3)).toBe("canada");
  });

  it("replaces accented characters", () => {
    const tc1 = "québec";
    expect(sanitizeString(tc1)).toBe("quebec");

    const tc2 = "la défense";
    expect(sanitizeString(tc2)).toBe("la defense");

    const tc3 = "s'il vous plaît";
    expect(sanitizeString(tc3)).toBe("s'il vous plait");
  });

  it("sanitizes mixed inputs", () => {
    const tc1 = "Maître";
    expect(sanitizeString(tc1)).toBe("maitre");

    const tc2 = "Les Canadiens de Montréal";
    expect(sanitizeString(tc2)).toBe("les canadiens de montreal");

    const tc3 = "OTTAWA EST OÙ?";
    expect(sanitizeString(tc3)).toBe("ottawa est ou?");
  });
});

/* this shall go to i18n.test.ts or databank.test.ts
 * import i18n from "../../utils/i18n"; 
 * const enKeys = Object.keys(i18n.store.data.en.translation);
 * expect(i18n.store.data.fr.translation.key1).toBe("Bonjour");
 * ..
 * i18n.changeLanguage('fr'); 
    const translation = i18n.t('keyThatDoesNotExist', { fallbackLng: 'en' });
    expect(translation).toBe("keyThatDoesNotExist"); // Or a fallback behavior
 
 * 

describe("isValidPot only accepts existing provinces or territories", () => {
  const { t: tGeo } = useTranslation("geo");
  
  it("should return false when the input is undefined, null, empty or blank string", () => {
    expect(isValidPot("", tGeo)).toBe(false);
    i18n.changeLanguage("fr-ca");
    expect(isValidPot("    \t ", tGeo)).toBe(false);
  });

  // it("should throw an error when the input language is neither English nor French", () => {
  //   expect(() => isValidPot("Nunavut", "hu")).toThrowError();
  // });

  it("should return false when the input in not a Canadian province or territory", () => {
    expect(isValidPot("Wyoming", tGeo)).toBe(false);
  });

  it("should return true when the input in a Canadian province or territory", () => {
    i18n.changeLanguage("en");
    expect(isValidPot("quebec", tGeo)).toBe(true);
    i18n.changeLanguage("en-ca");
    expect(isValidPot("Québec", tGeo)).toBe(true);
    i18n.changeLanguage("fr");
    expect(isValidPot("québec", tGeo)).toBe(true);
  });
  
  it("should return false when the input is a pot but in another language", () => {
    i18n.changeLanguage("en-ca");
    expect(isValidPot("Colombie-Britannique", tGeo)).toBe(false);
    i18n.changeLanguage("fr");
    expect(isValidPot("british columbia", tGeo)).toBe(false);
  });
});
 */

// describe("calculateDistance returns the distance between to pots", () => {
//   it("returns a hard coded value", () => {
//     expect(calculateDistance("", "")).toBe(0);
//   });
// });

// describe("getDirectionFromSolution returns the direction from the input to the solution", () => {
//   it("returns a hard coded value", () => {
//     expect(getDirectionFromSolution("", "")).toBe("*");
//   });
// });

describe("getColorOfStatus returns the correct class name based on status", () => {
  it("should return the correct value when the game is in progress", () => {
    expect(getColorOfStatus("pending")).toBe("custom-light-blue-2");
  });

  it("should return the correct value when the game was lost", () => {
    expect(getColorOfStatus("lost")).toBe("custom-light-red");
  });

  it("should return the correct value when the game was won", () => {
    expect(getColorOfStatus("won")).toBe("custom-light-green");
  });
});

describe("fetchSuggestions filters the sanitized elements correctly", () => {
  it("should return an empty array when provided with an empty array", () => {
    expect(fetchSuggestions([], "Alberta")).toStrictEqual([]);
  });

  it("should return the input elements when passed an empty string", () => {
    const arr = ["British Columbia", "Nova Scotia", "Ontario", "New Brunswick"];
    expect(fetchSuggestions(arr, "")).toStrictEqual(arr);
  });

  /** this shall go to i18n.test.ts or databank.test.ts
  it("should return the matching elements", () => {
    const { t: tGeo } = useTranslation("geo");
    expect(fetchSuggestions(getPotNamesByLang(tGeo), "no")).toStrictEqual([
      "Nova Scotia",
      "Northwest Territories",
    ]);
  });
  */
});

describe("isValidGuess determines whether a guess's string value is valid", () => {
  it("should return false for falsy guess value", () => {
    expect(isValidGuess("", [])).toBe(false);
    expect(isValidGuess("   ", [])).toBe(false);
  });

  it("should return false for unknown input", () => {
    expect(isValidGuess("Republic of Texas", ["Canada", "France"])).toBe(false);
  });

  it("should return true with matching input", () => {
    expect(isValidGuess("Canada", ["Canada", "United States"])).toBe(true);
  });

  it("should return true with after sanitizing", () => {
    expect(isValidGuess("Québec", ["Quebec"])).toBe(true);
    expect(isValidGuess("Quebec", ["Québec"])).toBe(true);
  });
});

describe("fetchSuggestions filters sanitized substrings", () => {
  it("should return the entire array for an empty string input", () => {
    const arr = ["The", "New", "York", "Times"];
    expect(fetchSuggestions(arr, "")).toStrictEqual(arr);
  });

  it("should return an empty array for empty inputs", () => {
    expect(fetchSuggestions([], "")).toStrictEqual([]);
  });

  it("should return an empty array for not matching input", () => {
    const arr = ["abc", "def", "cba", "fed"];
    expect(fetchSuggestions(arr, "input")).toStrictEqual([]);
  });

  it("should return the matching inputs after sanitization", () => {
    const arr = ["Île-du-Prince-Édouard", "Eilean a' Phrionnsa", "The Island"];
    expect(fetchSuggestions(arr, "ile")).toStrictEqual([
      "Île-du-Prince-Édouard",
      "Eilean a' Phrionnsa",
    ]);
  });
});

describe("getOkNokEmoji returns an emoji based on the boolean input", () => {
  it("should return ✅ for `true` argument", () => {
    expect(getOkNokEmoji(true)).toBe("✅");
  });

  it("should return ❌ for `false` argument", () => {
    expect(getOkNokEmoji(false)).toBe("❌");
  });
});

describe("getBullseyeEmoji returns an emoji based on the boolean input", () => {
  it("should return 🎯 for `true` argument", () => {
    expect(getBullseyeEmoji(true)).toBe("🎯");
  });

  it("should return ❌ for `false` argument", () => {
    expect(getBullseyeEmoji(false)).toBe("❌");
  });
});

describe("shuffle shuffles an array", () => {
  it("should shuffle the array and not change its length", () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const deep = JSON.parse(JSON.stringify(arr)) as number[];
    shuffle(arr);
    expect(arr.length).toBe(deep.length);
    expect(arr).not.toEqual(deep);
  });

  it("should handle an empty array", () => {
    const array: number[] = [];
    shuffle(array);
    expect(array).toEqual([]);
  });

  it("should handle a single-element array", () => {
    const array = [1];
    shuffle(array);
    expect(array).toEqual([1]);
  });
});
