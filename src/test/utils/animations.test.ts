import { describe, expect, it } from "vitest";
import dataBank from "../../utils/dataBank.ts";
import { calculateDistanceInMeters } from "../../utils/geo.ts";
import { getSquaresByDistance } from "../../utils/animations.ts";

describe("test square animation based on distance", () => {
  it("returns all green for same pots", () => {
    const dist = calculateDistanceInMeters(
      dataBank.yt.coordinates,
      dataBank.yt.coordinates,
    );
    expect(getSquaresByDistance(dist)).toStrictEqual(["🟩", "🟩", "🟩", "🟩", "🟩", "🟩"]);
  });

  it("returns almost all green", () => {
    const dist = calculateDistanceInMeters(
      dataBank.pe.coordinates,
      dataBank.nb.coordinates,
    );
    expect(getSquaresByDistance(dist)).toStrictEqual(["🟩", "🟩", "🟩", "🟩", "🟩", "🟨"]);
  });

  it("returns mostly green", () => {
    const dist = calculateDistanceInMeters(
      dataBank.ab.coordinates,
      dataBank.sk.coordinates,
    );
    expect(getSquaresByDistance(dist)).toStrictEqual(["🟩", "🟩", "🟩", "🟩", "🟨", "🟨"]);
  });

  it("returns yellowish", () => {
    const dist = calculateDistanceInMeters(
      dataBank.yt.coordinates,
      dataBank.ab.coordinates,
    );
    expect(getSquaresByDistance(dist)).toStrictEqual(["🟩", "🟩", "🟩", "🟨", "🟨", "🟧"]);
  });

  it("returns somewhat orange", () => {
    const dist = calculateDistanceInMeters(
      dataBank.yt.coordinates,
      dataBank.mb.coordinates,
    );
    expect(getSquaresByDistance(dist)).toStrictEqual(["🟩", "🟩", "🟨", "🟨", "🟧", "🟧"]);
  });

  it("returns some red", () => {
    const dist = calculateDistanceInMeters(
      dataBank.nt.coordinates,
      dataBank.nl.coordinates,
    );
    expect(getSquaresByDistance(dist)).toStrictEqual(["🟩", "🟨", "🟨", "🟧", "🟧", "🟥"]);
  });

  it("returns the most red", () => {
    const dist = calculateDistanceInMeters(
      dataBank.yt.coordinates,
      dataBank.ns.coordinates,
    );
    expect(getSquaresByDistance(dist)).toStrictEqual(["🟨", "🟨", "🟧", "🟧", "🟥", "🟥"]);
  });
});
