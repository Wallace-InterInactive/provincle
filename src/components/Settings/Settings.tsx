import { toggleLanguage } from "../../canadata/settings.ts";

export function Settings() {
  return (
    <button
      className="mx-3 text-xl"
      type="button"
      onClick={() => toggleLanguage()}
      data-testid="settings"
    >
      ⚙️
    </button>
  );
}
