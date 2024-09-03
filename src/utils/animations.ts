import { toast, Zoom } from "react-toastify";

export const SQUARE_ANIMATION_LENGTH = 250;
export const squares = ["🟩", "🟩", "🟨", "🟧", "🟥", "⬛️"];

// prettier-ignore
export function getSquaresByDistance(distanceInMeters: number): string[] {
  const distanceInKms = Math.floor(distanceInMeters / 1000);
  return distanceInKms === 0 ? ["🟩", "🟩", "🟩", "🟩", "🟩", "🟩"]
    : distanceInKms <= 300   ? ["🟩", "🟩", "🟩", "🟩", "🟩", "🟨"]
    : distanceInKms <= 1300  ? ["🟩", "🟩", "🟩", "🟩", "🟨", "🟨"]
    : distanceInKms <= 2300  ? ["🟩", "🟩", "🟩", "🟨", "🟨", "🟧"]
    : distanceInKms <= 3300  ? ["🟩", "🟩", "🟨", "🟨", "🟧", "🟧"]
    : distanceInKms <= 4300  ? ["🟩", "🟨", "🟨", "🟧", "🟧", "🟥"]
    :                          ["🟨", "🟨", "🟧", "🟧", "🟥", "🟥"];
}

export function toastError(text: string): void {
  toast.error(text, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    style: {
      backgroundColor: "#F8B0B7", // Replace with your desired background color
      color: "#000000", // Optional: to set text color
    },
    transition: Zoom,
  });
}

export function toastFailed(text: string): void {
  toastError(text);
}

export function toastSuccess(text: string): void {
  toast.success(text, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    style: {
      backgroundColor: "#9EEAA7", // Replace with your desired background color
      color: "#000000", // Optional: to set text color
    },
    transition: Zoom,
  });
}
