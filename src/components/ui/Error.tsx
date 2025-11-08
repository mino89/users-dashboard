import { Link } from "@tanstack/react-router";
import type { NavigationLink } from "@type/core/navigation";

export type ErrorProps = {
    message: string;
    link?: NavigationLink;
};

export default function Error(props: ErrorProps) {
    const { message, link } = props;
    return (
        <>
            <h1>{message}</h1>
            <br />
            <Link className="button" to={link?.url || "/"}>
                {link?.text || "Go to Home"}
            </Link>
        </>
    );
}
