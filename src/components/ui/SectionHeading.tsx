import { Link } from "@tanstack/react-router";
import type { NavigationLink } from "@type/core/navigation";
import type React from "react";

export type SectionHeadingProps = {
    title: string;
    subtitle?: string;
    children?: React.ReactNode;
    image?: {
        url: string;
        alt?: string;
    };
    link?: NavigationLink;
};
export default function SectionHeading(props: SectionHeadingProps) {
    const { title, subtitle, image, children, link } = props;
    return (
        <section>
            <h1>{title}</h1>
            {subtitle && <h2>{subtitle}</h2>}
            {children}
            {image && <img src={image.url} alt={image.alt} />}
            {link && <Link to={link.url}>{link.text || "Learn more"}</Link>}
        </section>
    );
}
