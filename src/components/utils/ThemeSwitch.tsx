import { useTheme } from "@hooks/useTheme";
import { Moon, Sun } from "lucide-react";

export default function ThemeSwitch() {
    const { theme, toggleTheme } = useTheme();
    return (
        <button
            className="button-small button-rounded button-line"
            aria-label="Switch color theme"
            title="Switch color theme"
            onClick={() => toggleTheme()}
        >
            {theme === "light" ? <Moon /> : <Sun />}
        </button>
    );
}
