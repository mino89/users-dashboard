import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import ListItem from "./ListItem";

describe("ListItem", () => {
    test("sould display props", () => {
        const { getByText } = render(
            <ListItem title="Test Title" subtitle="Test Subtitle">
                Test Children
            </ListItem>,
        );
        expect(getByText("Test Title")).toBeDefined();
        expect(getByText("Test Subtitle")).toBeDefined();
        expect(getByText("Test Children")).toBeDefined();
    });
});
