import { useContext } from "react";
import { ThemeContext } from "@context/ThemeContext";

/**
 * Custom hook to access the ThemeContext.
 * @returns (TemeContextType)
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
