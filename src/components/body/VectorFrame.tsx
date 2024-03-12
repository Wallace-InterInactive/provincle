import React from "react";

interface VectorFrameProps {
  imagePath: string;
  invertColor: boolean;
  hideImage: boolean;
  gameOver: boolean;
}

const VectorFrame: React.FC<VectorFrameProps> = (props: VectorFrameProps) => {
  return (
    <div className="my-1">
      <img
        className={`
          max-h-52 m-auto transition-transform duration-700 ease-in 
          ${props.invertColor ? "dark:invert" : ""}
          ${props.hideImage && !props.gameOver ? "h-0" : "h-full"}
        `}
        src={props.imagePath}
        alt="The flag of Canada"
      />
    </div>
  );
};

export default VectorFrame;
