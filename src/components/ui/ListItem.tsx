import { Link } from "@tanstack/react-router";
import classes from "./ListItem.module.css";
type ListItemProps = {
    title: string;
    subtitle?: string | React.ReactNode;
    children?: React.ReactNode;
    link?: string;
    icon?: React.ReactNode;
};

export default function ListItem(props: ListItemProps) {
    const { title, subtitle, children, link, icon } = props;
    return (
        <article className={classes.listItem}>
            <header className={classes.listItemHeader}>
                <>
                    {icon}
                    <h3>{title}</h3>
                </>
            </header>

            {subtitle && <h4>{subtitle}</h4>}
            {children}
            {link && (
                <Link
                    title="Go to detail page"
                    className={"button button-small " + classes.listItemAction}
                    to={link}
                >
                    More Info
                </Link>
            )}
        </article>
    );
}
