import React from "react";

interface VectorFrameProps {
  imagePath: string;
  altText: string;
  invertColor: boolean;
  hideImage: boolean;
  gameOver: boolean;
}

const VectorFrame: React.FC<VectorFrameProps> = (props: VectorFrameProps) => {
  return (
    <div className="my-1">
      <img
        className={`
          max-h-52 m-auto my-5 transition-transform duration-700 ease-in 
          ${props.invertColor ? "dark:invert" : ""}
          ${props.hideImage && !props.gameOver ? "h-0" : "h-full"}
        `}
        src={props.imagePath}
        alt={props.altText}
      />
    </div>
  );
};

export default VectorFrame;
