import classes from "./List.module.css";

export type ListProps<T> = {
    items: T[];
    children: (item: T, index: number) => React.ReactNode;
};

export default function List<T>(props: ListProps<T>) {
    const { items } = props;
    if (items.length) {
        return (
            <section className={classes.list}>
                {items.map((item, index) => props.children(item, index))}
            </section>
        );
    } else {
        return <p>No items found.</p>;
    }
}
