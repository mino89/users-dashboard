import { createContext, useMemo, useState } from "react";
type ThemeType = "light" | "dark";
type ThemeContextType = {
    theme: ThemeType | undefined;
    toggleTheme: () => void;
};
/**
 * Context to manage theme (light/dark) across the application.
 */
export const ThemeContext = createContext<ThemeContextType | undefined>(
    undefined,
);

/**
 * Provider component to manage and provide theme context.
 * @param ({ children }: { children: React.ReactNode }) the app children
 * @returns ThemeContext.Provider
 */
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const savedTheme = localStorage.getItem("theme") as ThemeType;
    const systemSelectedScheme = () =>
        savedTheme
            ? savedTheme
            : window.matchMedia("(prefers-color-scheme: dark)").matches
              ? "dark"
              : "light";

    const [theme, setTheme] = useState<ThemeType>(systemSelectedScheme);

    useMemo(() => {
        const rootDocumentClasses = document.documentElement.classList;
        rootDocumentClasses.remove("light", "dark");
        rootDocumentClasses.add(theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
