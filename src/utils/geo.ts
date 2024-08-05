import { CardinalDirection, Coordinates, PotCode } from "../types/data.ts";
import { directionsFromTo } from "./dataBank.ts";

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

export function calculateDistanceInKm(
  from: Coordinates,
  to: Coordinates
): number {
  return Math.floor(calculateDistanceInMeters(from, to) / 1000);
}

export function calculateDistanceInMi(
  from: Coordinates,
  to: Coordinates
): number {
  return Math.floor(calculateDistanceInMeters(from, to) / 1609.344);
}

export function calculateDirection(
  from: PotCode,
  to: PotCode
): CardinalDirection {
  if (from === to) {
    return "*";
  }
  return directionsFromTo[from][to] as CardinalDirection;
}

// angles unbalanced uneven to improve "human readable directions"
// prettier-ignore
const dirCodes15: CardinalDirection[] = [ "NW", "N", "NE",      // N-ish
                                          "NE", "NE","NE",
                                          "NE", "E", "SE",      // E-ish
                                          "SE", "SE", "SE",
                                          "SE", "S", "SW",      // S-ish
                                          "SW", "SW", "SW",
                                          "SW", "W", "NW" ]; // W-ish
export function angle15ToDir(angle: number): CardinalDirection {
  return dirCodes15[Math.floor(((angle + 15) % 360) / 15)];
}

const dirCodes45: CardinalDirection[] = [
  "N",
  "NE",
  "E",
  "SE",
  "S",
  "SW",
  "W",
  "NW",
];
export function angle45ToDir(angle: number): CardinalDirection {
  return dirCodes45[Math.floor(((angle + 22.5) % 360) / 45)];
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}
function toDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}
export function calculateAngle(pos1: Coordinates, pos2: Coordinates): number {
  const lat1 = toRadians(pos1.latitude);
  const lat2 = toRadians(pos2.latitude);
  const deltaLon = toRadians(pos2.longitude - pos1.longitude);

  const y = Math.sin(deltaLon) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLon);

  const bearing = Math.atan2(y, x);
  return (toDegrees(bearing) + 360) % 360; // Normalize to 0-360 degrees
}
