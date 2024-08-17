// Constants for the Mercator projection
const R_MAJOR = 6378137.0;
const R_MINOR = 6356752.3142;
const RATIO = R_MINOR / R_MAJOR;
const ECCENT = Math.sqrt(1.0 - RATIO * RATIO);
const COM = 0.5 * ECCENT;

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

function mercatorX(lon: number): number {
  return R_MAJOR * toRadians(lon);
}

function mercatorY(lat: number): number {
  if (lat > 89.5) lat = 89.5;
  if (lat < -89.5) lat = -89.5;

  const phi = toRadians(lat);
  const sinphi = Math.sin(phi);
  const con = ECCENT * sinphi;
  const ts =
    Math.tan(0.5 * (Math.PI * 0.5 - phi)) /
    Math.pow((1.0 - con) / (1.0 + con), COM);
  return 0 - R_MAJOR * Math.log(ts);
}

// Function to convert latitude, longitude to Mercator coordinates
export function latLonToMercator(
  lat: number,
  lon: number
): { x: number; y: number } {
  const x = mercatorX(lon);
  const y = mercatorY(lat);
  return { x, y };
}
