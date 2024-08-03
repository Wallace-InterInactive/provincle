import { CardinalDirection, Coordinates } from "../types/data.ts";
import dataBank from "./dataBank.ts";

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
  let ret: CardinalDirection = "*";
  // I don't like the func from ChatGPT, so postpone to proceed with this
  if (from.latitude < to.latitude) {
    ret = "W";
  } else if (from.latitude > to.latitude) {
    ret = "E";
  }
  console.log(from, to, " ==> ", ret);
  return ret;
}

export function calculateDirectionOf(
  from: string,
  to: string
): CardinalDirection {
  // LOVAS.contains
  return calculateDirection(
    dataBank[from].coordinates,
    dataBank[to].coordinates
  );
}

// ChatGpt code, to be reviewd, to be used in the arrow-angle
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

export function calculateBearing(
  pos1: { lat: number; lon: number },
  pos2: { lat: number; lon: number }
): number {
  const lat1 = toRadians(pos1.lat);
  const lat2 = toRadians(pos2.lat);
  const deltaLon = toRadians(pos2.lon - pos1.lon);

  const y = Math.sin(deltaLon) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLon);
  const theta = Math.atan2(y, x);

  // Convert from radians to degrees
  const bearing = (theta * (180 / Math.PI) + 360) % 360;

  return bearing;
}
