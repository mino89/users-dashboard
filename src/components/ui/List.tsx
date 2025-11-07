import React from "react";
import classes from "./List.module.css";

export type ListColumns = "medium" | "large";

export type ListProps<T> = {
    items?: T[];
    children: ((item: T, index: number) => React.ReactNode) | React.ReactNode[];
    columns?: ListColumns;
};

export default function List<T>(props: ListProps<T>) {
    const { items, children, columns } = props;

    const renderContent = () => {
        if (children instanceof Function) {
            if (items?.length) {
                return items.map((item, index) => children(item, index));
            } else {
                return <p>No items found.</p>;
            }
        }
        if (Array.isArray(children)) {
            return children;
        }
        return null;
    };

    return (
        <section
            className={`${classes.list} ${columns ? classes[columns] : null}`}
        >
            {renderContent()}
        </section>
    );
}
