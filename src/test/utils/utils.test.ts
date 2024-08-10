import { describe, expect, it } from "vitest";
import {
  fetchSuggestions,
  getColorOfStatus,
  getDirectionEmoji,
  getDistanceWithUnitBySetting,
  getPotFlagSvgUrl,
  getPotMapSvgUrl, isValidGuess,
  isValidPot,
  sanitizeString,
} from "../../utils/utils.ts";
import { PotCode } from "../../types/data.ts";
import { potNames } from "../../utils/dataBank.ts";

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

describe("isValidPot only accepts existing provinces or territories", () => {
  it("returns false when the input is undefined, null, empty or blank string", () => {
    // @ts-ignore
    expect(isValidPot(undefined)).toBe(false);
    // @ts-ignore
    expect(isValidPot(null)).toBe(false);
    expect(isValidPot("")).toBe(false);
    expect(isValidPot("    \t ")).toBe(false);
  });

  it("return false when the input in not a Canadian province or terrotory", () => {
    expect(isValidPot("Wyoming")).toBe(false);
  });

  it("return true when the input in a Canadian province or terrotory", () => {
    expect(isValidPot("quebec")).toBe(true);
    expect(isValidPot("Québec")).toBe(true);
  });
});

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

describe("getDistanceWithUnitBySetting returns the formatted distance", () => {
  it("should return 0 when the user guessed it", () => {
    const pot: PotCode = "bc";
    expect(getDistanceWithUnitBySetting(pot, pot)).toBe("0 km");
  });
  // TODO: add more tests
});

describe("getDirectionEmoji returns the correct arrow emoji based on the cardinal direction", () => {
  it("should return 🎯 when the player guessed it", () => {
    const pot: PotCode = "yt";
    expect(getDirectionEmoji(pot, pot)).toBe("🎯");
  });
  // TODO: add more tests
});

describe("getPotMapSvgUrl returns the href of the map SVG of the given potCode", () => {
  it("returns the href", () => {
    const pattern: RegExp =
      /\/assets\/provinces-and-territories\/qc\/qc-map\.svg$/;
    expect(getPotMapSvgUrl("qc")).toMatch(pattern);
  });
});

describe("getPotFlagSvgUrl returns the href of the flag SVG of the given potCode", () => {
  it("returns the href", () => {
    const pattern: RegExp =
      /\/assets\/provinces-and-territories\/qc\/qc-flag\.svg$/;
    expect(getPotFlagSvgUrl("qc")).toMatch(pattern);
  });
});

describe("getColorOfStatus returns the correct class name based on status", () => {
  it("should return the correct value when the game is in progress", () => {
    expect(getColorOfStatus("pending")).toBe("gray-500");
  });

  it("should return the correct value when the game was lost", () => {
    expect(getColorOfStatus("lost")).toBe("red-600");
  });

  it("should return the correct value when the game was won", () => {
    expect(getColorOfStatus("won")).toBe("green-700");
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

  it("should return the matching elements", () => {
    expect(fetchSuggestions(potNames, "no")).toStrictEqual([
      "Nova Scotia",
      "Northwest Territories",
    ]);
  });
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
  })
});

describe("getDirectionEmoji should return the corresponding emoji for a given CardinalDirection input", () => {
  it("should return 🎯 for equal fromGuess and toSolution", () => {
    const province = "qc";
    expect(getDirectionEmoji(province, province)).toBe("🎯");
  });

  it("should return ⬆️ for North", () => {
    expect(getDirectionEmoji("mb", "nu")).toBe("⬆️");
  });

  it("should return ⬇️️ for South", () => {
    expect(getDirectionEmoji("nu", "mb")).toBe("⬇️");
  });

  it("should return ➡️️ for East", () => {
    expect(getDirectionEmoji("ab", "sk")).toBe("➡️️");
  });

  it("should return ⬅️️ for West", () => {
    expect(getDirectionEmoji("ab", "bc")).toBe("⬅️");
  });

  it("should return ↗️ for ", () => {
    expect(getDirectionEmoji("bc", "nu")).toBe("↗️");
  });

  it("should return ↘️ for ", () => {
    expect(getDirectionEmoji("nt", "on")).toBe("↘️");
  });

  it("should return ↙️ for ", () => {
    expect(getDirectionEmoji("nu", "sk")).toBe("↙️");
  });

  it("should return ↖️ for ", () => {
    expect(getDirectionEmoji("bc", "yt")).toBe("↖️");
  });
});
