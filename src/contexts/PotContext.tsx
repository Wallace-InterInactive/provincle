import { createContext } from "react";

const PotContext = createContext({
  code: "",
  setCode: (newCode: string) => {
    console.log(newCode);
  },
});

export default PotContext;
