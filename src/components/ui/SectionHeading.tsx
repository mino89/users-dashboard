import { Link } from "@tanstack/react-router";
import type { NavigationLink } from "@type/core/navigation";
import type React from "react";
import classes from "./SectionHeading.module.css";
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
        <section className={classes.sectionHeading}>
            <div className={classes.sectionHeadingWrapper}>
                <div className={classes.sectionHeadingContent}>
                    <h1>{title}</h1>
                    {subtitle && <h2 className="heading-5">{subtitle}</h2>}
                    <div className={classes.sectionHeadingChildren}>
                        {children}
                    </div>
                    {link && (
                        <Link className="button button-line" to={link.url}>
                            {link.text || "Learn more"}
                        </Link>
                    )}
                </div>

                {image && (
                    <div className={classes.sectionHeadingImage}>
                        <figure>
                            <img src={image.url} alt={image.alt} />
                        </figure>
                    </div>
                )}
            </div>
        </section>
    );
}
