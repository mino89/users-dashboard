import classes from "./Shell.module.css";
export type ShellProps = {
    header: React.ReactNode;
    children: React.ReactNode;
    footer: React.ReactNode;
};
export default function Shell(props: ShellProps) {
    const { header, children, footer } = props;
    return (
        <>
            {header}
            <main className={`${classes.shellWrapper} wrapper`}>
                {children}
            </main>
            {footer}
        </>
    );
}
