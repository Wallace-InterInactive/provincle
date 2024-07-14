import { describe, expect, it } from "vitest";
import dataBank, { getTodaysPotCode, potCodes } from "../../utils/dataBank.ts";
import { calculateDirection, calculateDistanceInKM } from "../../utils/geo.ts";

describe("getTodaysPortCode should return a pot code from the dataBank", () => {
  it("returns a potCode from the dataBank", () => {
    expect(potCodes).toContain(getTodaysPotCode());
  });
});

describe("check geo distances", () => {
  it("returns 0 for same self-compare", () => {
    expect(calculateDistanceInKM(dataBank.on.coordinates, dataBank.on.coordinates)).toBe(0);
    expect(calculateDistanceInKM(dataBank.ab.coordinates, dataBank.ab.coordinates)).toBe(0);
  });
  it("check distances ab-on", () => {
    expect(calculateDistanceInKM(dataBank.ab.coordinates, dataBank.on.coordinates)).toBe(2131);
    expect(calculateDistanceInKM(dataBank.on.coordinates, dataBank.ab.coordinates)).toBe(2131);
  });
  it("check distances nu-ma", () => {
    expect(calculateDistanceInKM(dataBank.nu.coordinates, dataBank.mb.coordinates)).toBe(1714);
    expect(calculateDistanceInKM(dataBank.mb.coordinates, dataBank.nu.coordinates)).toBe(1714);
  });
});

describe("check geo directions", () => {
  it("returns * for same self-compare", () => {
    expect(calculateDirection(dataBank.on.coordinates, dataBank.on.coordinates)).toBe("*");
    expect(calculateDirection(dataBank.ab.coordinates, dataBank.ab.coordinates)).toBe("*");
  });
  it("check some random", () => {
    expect(calculateDirection(dataBank.ab.coordinates, dataBank.on.coordinates)).toBe("E");
    expect(calculateDirection(dataBank.on.coordinates, dataBank.ab.coordinates)).toBe("W");
  });
});
