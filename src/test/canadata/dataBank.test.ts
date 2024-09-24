import { describe, expect, it } from "vitest";
import { PotCode } from "../../types/data.ts";
import {
  dataBank,
  getPseudoRandomPotCode,
  getTodaysPotCode,
  potCodes,
  getDirectionEmoji,
  getPotMapSvgUrl,
  //getDistanceWithUnitBySetting,
} from "../../canadata/dataBank.ts";
import { calculateDistanceInKm } from "../../utils/geo.ts";

describe("test functions in dataBank", () => {
  it("returns a potCode from the dataBank ", () => {
    expect(potCodes).toContain(getPseudoRandomPotCode(3));
  });

  it("returns a potCode from the dataBank", () => {
    expect(potCodes).toContain(getTodaysPotCode());
  });
});

// describe("getDistanceWithUnitBySetting returns the formatted distance", () => {
//   it("should return 0 when the user guessed it", () => {
//     const pot: PotCode = "bc";
//     expect(getDistanceWithUnitBySetting(pot, pot)).toBe("0 km");
//   });
//   // TODO: add more tests
// });

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

/** this shall go to i18n.test.ts or databank.test.ts
describe("test functions in dataBank", () => {
  const { t: tGeo } = useTranslation("geo");
  beforeAll(() => {
    // Ensure i18n is initialized properly
    return i18n.init();
  });

  it("should return the code of the pot", async () => {
    await i18n.changeLanguage("en"); // Set language to English
    expect(getPotCodeByName("British Columbia", tGeo)).toBe("bc");
    expect(getPotCodeByName("Colombie-Britannique", tGeo)).toBe("bc");
    expect(getPotCodeByName("Colombie-Britannique", tGeo)).toBe("bc");
    expect(getPotCodeByName("Quebec", tGeo)).toBe("qc");
    //expect(getPotCodeByName("Québec", tGeo)).toBe("qc");
    expect(getPotCodeByName("Alaska", tGeo)).toBe("invalid");
  });

  it("should throw an error for invalid language code", () => {
    expect(() => getPotNamesByLang(tGeo)).toThrowError();
    expect(() => getPotNamesByLang(tGeo)).toThrowError();
  });

  it("should return the English potNames", () => {
    i18n.changeLanguage("en");
    let potNames = getPotNamesByLang(tGeo);
    expect(potNames.length).toBe(13);
    expect(potNames).toContain("New Brunswick");

    i18n.changeLanguage("en-us");
    potNames = getPotNamesByLang(tGeo);
    expect(potNames.length).toBe(13);
    expect(potNames).toContain("Nova Scotia");
  });

  it("should return the French potNames", () => {
    i18n.changeLanguage("fr");
    let potNames = getPotNamesByLang(tGeo);
    expect(potNames.length).toBe(13);
    expect(potNames).toContain("Colombie-Britannique");

    i18n.changeLanguage("fr-ca");
    potNames = getPotNamesByLang(tGeo);
    expect(potNames.length).toBe(13);
    expect(potNames).toContain("Terre-Neuve-et-Labrador");
  });

  // it("should throw an error for invalid language code", () => {
  //   expect(() => getCapitalsByLang("")).toThrowError();
  //   expect(() => getCapitalsByLang("hu")).toThrowError();
  // });

  it("should return the capitals in English", () => {
    i18n.changeLanguage("en");
    let capitals = getCapitalsByLang(tGeo);
    expect(capitals.length).toBe(13);
    expect(capitals).toContain("Quebec City");

    i18n.changeLanguage("en-us");
    capitals = getCapitalsByLang(tGeo);
    expect(capitals.length).toBe(13);
    expect(capitals).toContain("Quebec City");
  });

  it("should return the capitals in French", () => {
    i18n.changeLanguage("fr");
    let capitals = getCapitalsByLang(tGeo);
    expect(capitals.length).toBe(13);
    expect(capitals).toContain("Ville de Québec");

    i18n.changeLanguage("fr-ca");
    capitals = getCapitalsByLang(tGeo);
    expect(capitals.length).toBe(13);
    expect(capitals).toContain("Ville de Québec");
  });

  /*
  it("should return the the largest cities of each province in English", () => {
    let cities = getLargestCitiesByLang("en");
    expect(cities.length).toBe(13 * 4);
    expect(cities).toContain("Quebec City");

    cities = getLargestCitiesByLang("en-us");
    expect(cities.length).toBe(13 * 4);
    expect(cities).toContain("Montreal");
  });

  it("should return the the largest cities of each province in French", () => {
    let cities = getLargestCitiesByLang("fr");
    expect(cities.length).toBe(13 * 4);
    expect(cities).toContain("Ville de Québec");

    cities = getLargestCitiesByLang("fr-ca");
    expect(cities.length).toBe(13 * 4);
    expect(cities).toContain("Montréal");
  });
  */

// it("should return a list of capitals", () => {
//   const capitals = getListOfCapitals();
//   expect(capitals).toBeTypeOf("object");
//   expect(capitals[0]).toBeTypeOf("string");
//   expect(capitals.length).toBe(13);
// });
// });

describe("check geo distances", () => {
  it("returns 0 for same self-compare", () => {
    expect(
      calculateDistanceInKm(
        dataBank.data.on.coordinates,
        dataBank.data.on.coordinates
      )
    ).toBe(0);
    expect(
      calculateDistanceInKm(
        dataBank.data["on"].coordinates,
        dataBank.data["on"].coordinates
      )
    ).toBe(0);
    expect(
      calculateDistanceInKm(
        dataBank.data.ab.coordinates,
        dataBank.data.ab.coordinates
      )
    ).toBe(0);
  });

  it("check distances ab-on", () => {
    expect(
      calculateDistanceInKm(
        dataBank.data.ab.coordinates,
        dataBank.data.on.coordinates
      )
    ).toBe(2114);
    expect(
      calculateDistanceInKm(
        dataBank.data.on.coordinates,
        dataBank.data.ab.coordinates
      )
    ).toBe(2114);
  });

  it("check distances nu-ma", () => {
    expect(
      calculateDistanceInKm(
        dataBank.data.nu.coordinates,
        dataBank.data.mb.coordinates
      )
    ).toBe(2009);
    expect(
      calculateDistanceInKm(
        dataBank.data.mb.coordinates,
        dataBank.data.nu.coordinates
      )
    ).toBe(2009);
  });
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
    expect(getDirectionEmoji("ab", "sk")).toBe("\u27A1\uFE0F"); // ➡️️
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
  it("should return ↖️ for ", () => {
    expect(getDirectionEmoji("ns", "bc")).toBe("↖️");
  });
  it("should return ↖️ for ", () => {
    expect(getDirectionEmoji("ns", "nt")).toBe("↖️");
  });
  it("should return ↖️ for ", () => {
    expect(getDirectionEmoji("ns", "nb")).toBe("↖️");
  });
  it("should return ↖️ for ", () => {
    expect(getDirectionEmoji("ns", "nl")).toBe("↗️");
  });

  it("should return ↖️ for ", () => {
    expect(getDirectionEmoji("yt", "ns")).toBe("↘️");
  });
  it("should return ↖️ for ", () => {
    expect(getDirectionEmoji("yt", "sk")).toBe("↘️");
  });
  it("should return ↘️ for yt,mb", () => {
    expect(getDirectionEmoji("yt", "mb")).toBe("↘️");
  });
  it("should return ↖️ for ", () => {
    expect(getDirectionEmoji("yt", "on")).toBe("↘️");
  });

  it("should return ↖️ for ", () => {
    expect(getDirectionEmoji("mb", "sk")).toBe("⬅️");
  });
  it("should return ↖️ for ", () => {
    expect(getDirectionEmoji("mb", "nt")).toBe("↖️");
  });
  it("should return ↖️ for ", () => {
    expect(getDirectionEmoji("mb", "nu")).toBe("⬆️");
  });
  it("should return ↘️ for mb,ns", () => {
    expect(getDirectionEmoji("mb", "ns")).toBe("↘️");
  });
  it("should return ↘️ for mb,pe", () => {
    expect(getDirectionEmoji("mb", "pe")).toBe("↘️");
  });
  it("should return ↖️ for ", () => {
    expect(getDirectionEmoji("mb", "on")).toBe("↘️");
  });
});
