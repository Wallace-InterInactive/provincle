import { describe, expect, it } from "vitest";
import { Coordinates } from "../../types/data.ts";
import {
  calculateDirection,
  calculateDistanceInKm,
  calculateDistanceInMeters,
  calculateDistanceInMi,
} from "../../utils/geo.ts";

describe("test distance calculation", () => {
  it("should return 0 for distance in meters from self", () => {
    const c1: Coordinates = { latitude: 0, longitude: 0 };
    const c2: Coordinates = { latitude: -10, longitude: -20 };
    const c3: Coordinates = { latitude: 15, longitude: 30 };

    expect(calculateDistanceInMeters(c1, c1)).toBe(0);
    expect(calculateDistanceInMeters(c2, c2)).toBe(0);
    expect(calculateDistanceInMeters(c3, c3)).toBe(0);
  });

  // TODO: it should return the distance in meters between two pots

  it("should return 0 for the distance in kilometers for self", () => {
    const c: Coordinates = { latitude: 50, longitude: 100 };
    expect(calculateDistanceInKm(c, c));
  });

  it("should return 0 for the distance in miles for self", () => {
    const c: Coordinates = { latitude: 500, longitude: 10 };
    expect(calculateDistanceInMi(c, c));
  });

  // TODO: implement test case
  it("should return the distance between two pots in kilometers", () => {});

  // TODO: implement test case
  it("should return the distance between two pots in miles", () => {});
});

describe("test calculating the direction between from one pot to another", () => {
  it("should return '*' when from and to are equal", () => {
    const c: Coordinates = { latitude: 10, longitude: 10 };
    expect(calculateDirection(c, c)).toBe("*");
  });

  it("should return the direction from a pot to another one", () => {});
});
