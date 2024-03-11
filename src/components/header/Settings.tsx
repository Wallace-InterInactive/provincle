import React from "react";

interface SettingsProps {}

const Settings: React.FC<SettingsProps> = () => {
  return (
    <button
      className="mx-3 text-xl"
      type="button"
      onClick={() => console.log("clicked SETTINGS")}
    >
      ⚙️
    </button>
  );
};

export default Settings;
