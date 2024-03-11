import React from "react";

interface ProvincleProps {}

const Provincle: React.FC<ProvincleProps> = () => {
  return (
    <span className="uppercase font-bold">
      prov<span className="text-red-600">i</span>ncle
    </span>
  );
};

export default Provincle;
