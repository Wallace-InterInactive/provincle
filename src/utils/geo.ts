import { CardinalDirection, Coordinates } from "../types/data.ts";
import { latLonToMercator } from "./mercator.ts";

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

// angles unbalanced uneven to improve "human readable directions"
// prettier-ignore
const dirCodes15: CardinalDirection[] = ["NW", "N",  "NE",     // N-ish adjusted
                                         "NE", "NE", "NE",
                                         "NE", "E",  "SE",     // E-ish
                                         "SE", "SE", "SE",
                                         "SE", "S",  "SW",     // S-ish
                                         "SW", "SW", "SW",
                                         "SW", "W",  "NW",     // W-ish
                                         "NW", "NW", "NW"];

export function angle15ToDir(angle: number): CardinalDirection {
  return dirCodes15[Math.floor(((angle + 22.5) % 360) / 15)];
}
// XXXX
export function getDirectionCode(
  from: Coordinates, // use full PotData instead?
  to: Coordinates
): string {
  if (from === to) {
    return "*"; //directionEmojiMap.get("*") as string;
  }
  const angle: number = calculateAngle(from, to);
  return angle15ToDir(angle);
  //return directionEmojiMap.get(angle15ToDir(angle)) as string;
}

// no usages - perhaps delete some time
// const dirCodes45: CardinalDirection[] = [
//   "N",
//   "NE",
//   "E",
//   "SE",
//   "S",
//   "SW",
//   "W",
//   "NW",
// ];

// export function angle45ToDir(angle: number): CardinalDirection {
//   return dirCodes45[Math.floor(((angle + 22.5) % 360) / 45)];
// }

export function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

export function toDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

export function calculateAngleGeo(
  pos1: Coordinates,
  pos2: Coordinates
): number {
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

export function calculateAngle(pos1: Coordinates, pos2: Coordinates): number {
  if (pos1 === pos2) {
    return -1;
  }
  const c1 = latLonToMercator(pos1.latitude, pos1.longitude);
  const c2 = latLonToMercator(pos2.latitude, pos2.longitude);
  const dx = c2.x - c1.x;
  const dy = c2.y - c1.y;
  return Math.floor((toDegrees(Math.atan2(dx, dy)) + 360) % 360);
}
