import Footer from "@components/layout/Footer";
import Header from "@components/layout/Header";
import Shell from "@components/layout/Shell";
import { Outlet } from "@tanstack/react-router";

import LogoComponent from "@assets/react.svg?react";
import ThemeSwitch from "@components/utils/ThemeSwitch";

export function Root() {
    return (
        <Shell
            header={
                <Header
                    logo={<LogoComponent />}
                    heading="Users Dashboard"
                    actions={<ThemeSwitch />}
                />
            }
            footer={<Footer />}
        >
            <Outlet />
        </Shell>
    );
}
