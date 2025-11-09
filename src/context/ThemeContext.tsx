import { createContext, useMemo, useState } from "react";
type ThemeType = "light" | "dark";
type ThemeContextType = {
    theme: ThemeType | undefined;
    toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
    undefined,
);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const savedTheme = localStorage.getItem("theme") as ThemeType;
    const systemSelectedScheme = () =>
        savedTheme
            ? savedTheme
            : window.matchMedia("prefers-color-scheme: dark")
              ? "dark"
              : "light";

    const [theme, setTheme] = useState<ThemeType>(systemSelectedScheme);

    useMemo(() => {
        console.log(theme);
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
