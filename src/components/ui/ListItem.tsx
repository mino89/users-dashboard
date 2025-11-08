import { Link } from "@tanstack/react-router";
import classes from "./ListItem.module.css";
type ListItemProps = {
    title: string;
    subtitle?: string;
    children?: React.ReactNode;
    link?: string;
};

export default function ListItem(props: ListItemProps) {
    const { title, subtitle, children, link } = props;
    return (
        <article className={classes.listItem}>
            <h3>{title}</h3>
            {subtitle && <h4>{subtitle}</h4>}
            {children}
            {link && (
                <Link
                    className={"button button-small " + classes.action}
                    to={link}
                >
                    More Info
                </Link>
            )}
        </article>
    );
}
