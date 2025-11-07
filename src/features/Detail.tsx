import QueryLayout from "@components/layout/QueryLayout";
import List from "@components/ui/List";
import ListItem from "@components/ui/ListItem";
import SectionHeading from "@components/ui/SectionHeading";
import { getRouteApi } from "@tanstack/react-router";
import type { User } from "@type/data/user";

export function Detail() {
    const routeApi = getRouteApi("/$id");
    const id = routeApi.useParams().id;
    return (
        <>
            <h1>Detail Page {id}</h1>
            <QueryLayout<User>
                queryClientOptions={{
                    queryKeys: ["user"],
                    path: [id],
                }}
            >
                {(data) => (
                    <>
                        <SectionHeading
                            title={data.firstName + " " + data.lastName}
                            subtitle={data.email}
                            image={{
                                url: data.image,
                                alt: data.firstName + " " + data.lastName,
                            }}
                            link={{
                                url: "../",
                                text: "Back to Users List",
                            }}
                        >
                            <p>Role: {data.role}</p>
                        </SectionHeading>
                        <List columns="large">
                            <ListItem
                                title="Personal Info"
                                subtitle={data.phone}
                            >
                                <p>Blood Group: {data.bloodGroup}</p>
                                <p>
                                    Address: {data.address.address},{" "}
                                    {data.address.city}, {data.address.state},{" "}
                                    {data.address.postalCode},{" "}
                                    {data.address.country}
                                </p>
                            </ListItem>
                            <ListItem
                                title="Company Info"
                                subtitle={data.company.name}
                            >
                                <p>Department: {data.company.department}</p>
                                <p>Title: {data.company.title}</p>
                            </ListItem>
                        </List>
                    </>
                )}
            </QueryLayout>
        </>
    );
}
