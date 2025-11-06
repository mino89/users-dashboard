import { describe, expect, test } from "vitest";
import List from "./List";
import { render } from "@testing-library/react";
import ListItem from "./ListItem";
import { MOCK_DATA } from "@test/utils";

describe("ListComponent", () => {
    test("should render list items correctly", () => {
        const { getByText } = render(
            <List items={MOCK_DATA.users}>
                {(item) => (
                    <ListItem key={item.name} title={item.role}>
                        {item.name}
                    </ListItem>
                )}
            </List>,
        );

        MOCK_DATA.users.forEach((user) => {
            expect(getByText(user.name)).toBeDefined();
            expect(getByText(user.role)).toBeDefined();
        });
    });
    test("should render no items message", () => {
        const { getByText } = render(
            <List items={[] as typeof MOCK_DATA.users}>
                {(item) => (
                    <ListItem key={item.name} title={item.role}>
                        {item.name}
                    </ListItem>
                )}
            </List>,
        );

        expect(getByText("No items found.")).toBeDefined();
    });
});
