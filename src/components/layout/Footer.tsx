import classes from "./Footer.module.css";
import { version } from "../../../package.json";
export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className={classes.footer}>
            <div className={classes.footerContainer}>
                &copy;{currentYear} &#8226; v{version}
            </div>
        </footer>
    );
}
