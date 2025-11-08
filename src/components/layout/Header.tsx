import { Link } from "@tanstack/react-router";
import classes from "./Header.module.css";
export type HeaderProps = {
    logo: React.ReactNode;
    heading: string;
    actions?: React.ReactNode;
};
export default function Header(props: HeaderProps) {
    const { logo, heading, actions } = props;
    return (
        <header className={classes.header}>
            <div className={classes.headerContainer}>
                <div className={classes.logo}>
                    {logo}
                    <Link to="/"> {heading} </Link>
                </div>
                <div className={classes.actions}>{actions}</div>
            </div>
        </header>
    );
}
