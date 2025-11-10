import { useContext } from "react";
import { describe, test, expect, beforeEach, vi, afterAll } from "vitest";
import { ThemeContext, ThemeProvider } from "./ThemeContext";
import { render, fireEvent } from "@testing-library/react";
import { mockLocalStorage, mockMatchMedia } from "@test/utils";

const TestComponent = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        return <div>No theme context</div>;
    }
    return (
        <div>
            <p aria-label="current theme">{context.theme}</p>
            <button onClick={() => context.toggleTheme()}>Toggle Theme</button>
        </div>
    );
};

describe("ThemeProvider", () => {
    beforeEach(() => {
        mockLocalStorage();
        mockMatchMedia();
        localStorage.setItem("theme", "dark");
    });

    test("theme switches successfully", () => {
        const { getByLabelText, getByRole } = render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>,
        );

        const themeLabel = getByLabelText("current theme");
        const toggleButton = getByRole("button", { name: /toggle theme/i });

        expect(themeLabel.textContent).toBe("dark");
        fireEvent.click(toggleButton);
        expect(themeLabel.textContent).toBe("light");
        fireEvent.click(toggleButton);
        expect(themeLabel.textContent).toBe("dark");
    });

    afterAll(() => {
        vi.resetAllMocks();
    });
});
