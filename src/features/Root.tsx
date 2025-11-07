import Footer from "@components/layout/Footer";
import Header from "@components/layout/Header";
import Shell from "@components/layout/Shell";
import { Outlet } from "@tanstack/react-router";
export function Root() {
    return (
        <Shell header={<Header />} footer={<Footer />}>
            <Outlet />
        </Shell>
    );
}
