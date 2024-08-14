import { describe, expect, it } from "vitest";
import dataBank, {
  getPotCodeByName,
  getPotNamesByLang,
  getPseudoRandomPotCode,
  getTodaysPotCode,
  potCodes,
} from "../../utils/dataBank.ts";
import { calculateDistanceInKm } from "../../utils/geo.ts";

describe("test functions in dataBank", () => {
  it("returns a potCode from the dataBank", () => {
    expect(potCodes).toContain(getTodaysPotCode());
  });

  it("returns a potCode from the dataBank ", () => {
    expect(potCodes).toContain(getPseudoRandomPotCode(3));
  });

  it("should return the code of the pot", () => {
    expect(getPotCodeByName("British Columbia")).toBe("bc");
    expect(getPotCodeByName("Colombie-Britannique")).toBe("bc");
    expect(getPotCodeByName("Colombie-Britannique")).toBe("bc");
    expect(getPotCodeByName("Quebec")).toBe("qc");
    expect(getPotCodeByName("Québec")).toBe("qc");
    expect(getPotCodeByName("Alaska")).toBe("invalid");
  });

  it("should throw an error for invalid language code", () => {
    expect(() => getPotNamesByLang("")).toThrowError();
    expect(() => getPotNamesByLang("hu")).toThrowError();
  });

  it("should return the English potNames", () => {
    let potNames = getPotNamesByLang("en");
    expect(potNames.length).toBe(13);
    expect(potNames).toContain("New Brunswick");

    potNames = getPotNamesByLang("en-us");
    expect(potNames.length).toBe(13);
    expect(potNames).toContain("Nova Scotia");
  });

  it("should return the French potNames", () => {
    let potNames = getPotNamesByLang("fr");
    expect(potNames.length).toBe(13);
    expect(potNames).toContain("Colombie-Britannique");

    potNames = getPotNamesByLang("fr-ca");
    expect(potNames.length).toBe(13);
    expect(potNames).toContain("Terre-Neuve-et-Labrador");
  });
});

describe("check geo distances", () => {
  it("returns 0 for same self-compare", () => {
    expect(
      calculateDistanceInKm(dataBank.on.coordinates, dataBank.on.coordinates)
    ).toBe(0);
    expect(
      calculateDistanceInKm(
        dataBank["on"].coordinates,
        dataBank["on"].coordinates
      )
    ).toBe(0);
    expect(
      calculateDistanceInKm(dataBank.ab.coordinates, dataBank.ab.coordinates)
    ).toBe(0);
  });

  it("check distances ab-on", () => {
    expect(
      calculateDistanceInKm(dataBank.ab.coordinates, dataBank.on.coordinates)
    ).toBe(2131);
    expect(
      calculateDistanceInKm(dataBank.on.coordinates, dataBank.ab.coordinates)
    ).toBe(2131);
  });

  it("check distances nu-ma", () => {
    expect(
      calculateDistanceInKm(dataBank.nu.coordinates, dataBank.mb.coordinates)
    ).toBe(1714);
    expect(
      calculateDistanceInKm(dataBank.mb.coordinates, dataBank.nu.coordinates)
    ).toBe(1714);
  });
});
