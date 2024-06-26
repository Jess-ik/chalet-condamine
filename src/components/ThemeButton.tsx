import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const ThemeButton = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Always render the component, but conditionally render its contents
  return (
    <div className="flex gap-4 items-center text-white">
      <div>ETE</div>
      {mounted && (
        <div
          aria-label="Toggle Dark Mode"
          className={`toggle-button ${resolvedTheme} flex`}
          onClick={() => {
            setTheme(resolvedTheme === "dark" ? "light" : "dark");
          }}
        ></div>
      )}
      <div>HIVER</div>
    </div>
  );
};

export default ThemeButton;
