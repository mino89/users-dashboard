import classes from "./Json.module.css";

export default function Json<T>(obj: T) {
    return <pre className={classes.pre}>{JSON.stringify(obj)}</pre>;
}
