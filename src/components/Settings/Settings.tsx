export function Settings() {
  return (
    <button
      className="mx-3 text-xl"
      type="button"
      onClick={() => console.log("clicked SETTINGS")}
      data-testid="settings"
    >
      ⚙️
    </button>
  );
}
