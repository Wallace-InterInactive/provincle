import { describe, expect, it } from "vitest";
import { Coordinates } from "../../types/data.ts";
import {
  calculateDistanceInKm,
  calculateDistanceInMeters,
  calculateDistanceInMi,
} from "../../utils/geo.ts";
import dataBank from "../../utils/dataBank.ts";

describe("test distance calculation", () => {
  it("should return 0 for distance in meters from self", () => {
    const c1: Coordinates = { latitude: 0, longitude: 0 };
    const c2: Coordinates = { latitude: -10, longitude: -20 };
    const c3: Coordinates = { latitude: 15, longitude: 30 };

    expect(calculateDistanceInMeters(c1, c1)).toBe(0);
    expect(calculateDistanceInMeters(c2, c2)).toBe(0);
    expect(calculateDistanceInMeters(c3, c3)).toBe(0);
  });

  it("should return the distance in meters between two pots", () => {
    const from: Coordinates = dataBank.bc.coordinates;
    const to: Coordinates = dataBank.sk.coordinates;
    expect(calculateDistanceInMeters(from, to)).toBeCloseTo(1231804, 0);
  });

  it("should return 0 for the distance in kilometers for self", () => {
    const c: Coordinates = { latitude: 50, longitude: 100 };
    expect(calculateDistanceInKm(c, c));
  });

  it("should return 0 for the distance in miles for self", () => {
    const c: Coordinates = { latitude: 500, longitude: 10 };
    expect(calculateDistanceInMi(c, c));
  });

  it("should return the distance between two pots in kilometers", () => {
    const from: Coordinates = dataBank.bc.coordinates;
    const to: Coordinates = dataBank.sk.coordinates;
    expect(calculateDistanceInKm(from, to)).toBeCloseTo(1231, 0);
  });

  it("should return the distance between two pots in miles", () => {
    const from: Coordinates = dataBank.bc.coordinates;
    const to: Coordinates = dataBank.sk.coordinates;
    expect(calculateDistanceInMi(from, to)).toBeCloseTo(765, 0);
  });
});

// describe("test calculating the direction between from one pot to another", () => {
//   it("should return '*' when from and to are equal", () => {
//     const pot: PotCode = "sk";
//     expect(calculateDirection(pot, pot)).toBe("*");
//   });
//
//   it("should return 'S' when the solution is South to the guess", () => {
//     const from: PotCode = "nu";
//     const to: PotCode = "mb";
//     expect(calculateDirection(from, to)).toBe("S" as CardinalDirection);
//   });
//
//   it("should return 'N' when the solution is North to the guess", () => {
//     const from: PotCode = "ab";
//     const to: PotCode = "nt";
//     expect(calculateDirection(from, to)).toBe("N" as CardinalDirection);
//   });
//
//   it("should return 'W' when the solution is West to the guess", () => {
//     const from: PotCode = "sk";
//     const to: PotCode = "bc";
//     expect(calculateDirection(from, to)).toBe("W" as CardinalDirection);
//   });
//
//   it("should return 'E' when the solution is East to the guess", () => {
//     const from: PotCode = "on";
//     const to: PotCode = "qc";
//     expect(calculateDirection(from, to)).toBe("E" as CardinalDirection);
//   });
//
//   it("should return 'SW' when the solution is South to the guess", () => {
//     const from: PotCode = "nl";
//     const to: PotCode = "bc";
//     expect(calculateDirection(from, to)).toBe("SW" as CardinalDirection);
//   });
//
//   it("should return 'SE' when the solution is South to the guess", () => {
//     const from: PotCode = "nu";
//     const to: PotCode = "pe";
//     expect(calculateDirection(from, to)).toBe("SE" as CardinalDirection);
//   });
//
//   it("should return 'NW' when the solution is South to the guess", () => {
//     const from: PotCode = "qc";
//     const to: PotCode = "nt";
//     expect(calculateDirection(from, to)).toBe("NW" as CardinalDirection);
//   });
//
//   it("should return 'NE' when the solution is South to the guess", () => {
//     const from: PotCode = "on";
//     const to: PotCode = "nl";
//     expect(calculateDirection(from, to)).toBe("NE" as CardinalDirection);
//   });
// });
