import { PotCode, DataBank } from "../../types/data.ts";
import { useEffect, useState } from "react";
import {
  getSquaresByDistance,
  SQUARE_ANIMATION_LENGTH,
  squares,
} from "../../utils/animations.ts";
import {
  calculateDistanceInKm,
  calculateDistanceInMeters,
} from "../../utils/geo.ts";

export interface GuessRowProps {
  guess: string;
  solutionCode: PotCode;
  //  tGeo: MyGeoMapping;
  dataBank: DataBank;
}

export function GuessRow({
  guess,
  solutionCode,
  //  tGeo,
  dataBank,
}: GuessRowProps) {
  const guessCode = dataBank.getPotCodeByName(guess, dataBank.tGeo);

  const [animationIsActive, setAnimationIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (!guess) {
      return;
    }

    setAnimationIsActive(true);

    const totalAnimationTime = SQUARE_ANIMATION_LENGTH * squares.length;

    const timeout = setTimeout(() => {
      setAnimationIsActive(false);
    }, totalAnimationTime);

    return () => clearTimeout(timeout);
  }, [guess]);

  return guess ? (
    !animationIsActive ? (
      <div className="grid grid-cols-7 gap-1 text-center py-0.5">
        <div className="my-guess-div col-span-4">
          <p className="my-guess-p">{guess || "-"}</p>
        </div>
        <div className="my-guess-div col-span-2">
          <p className="my-guess-p">
            {
              calculateDistanceInKm(
                dataBank.data[guessCode].coordinates,
                dataBank.data[solutionCode].coordinates
              ) + " km"
              //{dataBank.getDistanceWithUnitBySetting(guessCode as PotCode, solutionCode)}
            }
          </p>
        </div>
        <div className="my-guess-div">
          <p className="my-guess-p text-xl">
            {dataBank.getDirectionEmoji(guessCode as PotCode, solutionCode)}
          </p>
        </div>
      </div>
    ) : (
      <div className="grid grid-cols-6 gap-1 text-center py-0.5 text-l w-full justify-evenly items-center border-2 h-8 overflow-hidden">
        {getSquaresByDistance(
          calculateDistanceInMeters(
            dataBank.data[guessCode as PotCode].coordinates,
            dataBank.data[solutionCode].coordinates
          )
        ).map((character, index) => (
          <div
            key={index}
            className="opacity-0 animate-reveal"
            style={{
              animationDelay: `${SQUARE_ANIMATION_LENGTH * index}ms`,
            }}
          >
            {character}
          </div>
        ))}
      </div>
    )
  ) : (
    <div className="grid grid-cols-6 gap-1 text-center py-0.5">
      <div className="my-div-2"></div>
    </div>
  );
}
