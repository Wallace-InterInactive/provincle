import { CardinalDirection, Coordinates } from "./dataBank.ts";

const earthRadiusMeters = 6371e3;

/**
 * Calculates the distance between two coordinates using the Haversine formula.
 * source: http://www.movable-type.co.uk/scripts/latlong.html
 */
export function calculateDistanceInMeters(
  from: Coordinates,
  to: Coordinates
): number {
  const phi1 = (from.latitude * Math.PI) / 180;
  const phi2 = (to.latitude * Math.PI) / 180;

  const deltaPhi = ((to.latitude - from.latitude) * Math.PI) / 180;
  const deltaLambda = ((to.longitude - from.longitude) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusMeters * c;
}

export function calculateDistanceInKM(
  from: Coordinates,
  to: Coordinates
): number {
  return Math.floor(calculateDistanceInMeters(from, to) / 1000);
}

export function calculateDirection(
  from: Coordinates,
  to: Coordinates
): CardinalDirection {
  let ret : CardinalDirection = "*";
  // I don't like the func from ChatGPT, so postpone to proceed with this
  if (from.latitude < to.latitude) {
    ret = "W"
  } else if (from.latitude > to.latitude) {
    ret = "E"
  }
  console.log(from, to, " ==> ", ret);
  return ret;
}
