import { createContext } from "react";

const PotContextType = createContext({
  code: "",
  setCode: (newCode: string) => {
    console.log(newCode);
  },
});

export default PotContextType;
