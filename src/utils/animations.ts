import { Bounce, toast } from "react-toastify";

export const SQUARE_ANIMATION_LENGTH = 250;
export const squares = ["🟩", "🟩", "🟨", "🟧", "🟥", "⬛️"];

export function toastError(text: string): void {
  toast.error(text, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });
}

export function toastSuccess(text: string): void {
  toast.success(text, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });
}