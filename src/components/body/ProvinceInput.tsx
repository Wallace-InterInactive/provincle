import React from "react";

interface ProvinceInputProps {}

const ProvinceInput: React.FC<ProvinceInputProps> = () => {
  return (
    <input
      type="text"
      className="flex-grow mr-1 border-2 dark:bg-slate-800 dark:text-slate-100"
      placeholder="Province, Territory"
    />
  );
};

export default ProvinceInput;
