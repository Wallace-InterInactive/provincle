import { describe, expect, it } from "vitest";
import { dataBank } from "../../canadata/dataBank.ts";
import { calculateDistanceInMeters } from "../../utils/geo.ts";
import { getSquaresByDistance } from "../../utils/animations.ts";

// prettier-ignore
describe("test square animation based on distance", () => {
  it("returns all green for same pots", () => {
    const dist = calculateDistanceInMeters(
      dataBank.data.yt.coordinates,
      dataBank.data.yt.coordinates,
    );
    expect(getSquaresByDistance(dist)).toStrictEqual(
      ["🟩", "🟩", "🟩", "🟩", "🟩", "🟩"]
    );
  });

  it("returns almost all green", () => {
    const dist = calculateDistanceInMeters(
      dataBank.data.pe.coordinates,
      dataBank.data.nb.coordinates,
    );
    expect(getSquaresByDistance(dist)).toStrictEqual(
      ["🟩", "🟩", "🟩", "🟩", "🟩", "🟨"]
    );
  });

  it("returns mostly green", () => {
    const dist = calculateDistanceInMeters(
      dataBank.data.ab.coordinates,
      dataBank.data.sk.coordinates,
    );
    expect(getSquaresByDistance(dist)).toStrictEqual(
      ["🟩", "🟩", "🟩", "🟩", "🟨", "🟨"]
    );
  });

  it("returns yellowish", () => {
    const dist = calculateDistanceInMeters(
      dataBank.data.yt.coordinates,
      dataBank.data.ab.coordinates,
    );
    expect(getSquaresByDistance(dist)).toStrictEqual(
      ["🟩", "🟩", "🟩", "🟨", "🟨", "🟧"]
    );
  });

  it("returns somewhat orange", () => {
    const dist = calculateDistanceInMeters(
      dataBank.data.yt.coordinates,
      dataBank.data.mb.coordinates,
    );
    expect(getSquaresByDistance(dist)).toStrictEqual(
      ["🟩", "🟩", "🟨", "🟨", "🟧", "🟧"]
    );
  });

  it("returns some red", () => {
    const dist = calculateDistanceInMeters(
      dataBank.data.nt.coordinates,
      dataBank.data.nl.coordinates,
    );
    expect(getSquaresByDistance(dist)).toStrictEqual(
      ["🟩", "🟨", "🟨", "🟧", "🟧", "🟥"]
    );
  });

  it("returns the most red", () => {
    const dist = calculateDistanceInMeters(
      dataBank.data.yt.coordinates,
      dataBank.data.ns.coordinates,
    );
    expect(getSquaresByDistance(dist)).toStrictEqual(
      ["🟨", "🟨", "🟧", "🟧", "🟥", "🟥"]
    );
  });
});
