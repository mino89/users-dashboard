import QueryLayout from "@components/layout/QueryLayout";
import List from "@components/ui/List";
import ListItem from "@components/ui/ListItem";
import SectionHeading from "@components/ui/SectionHeading";
import { getRouteApi, Link } from "@tanstack/react-router";
import type { User } from "@type/data/user";
import { Building, ChevronLeft, FileUser, Phone, Tag } from "lucide-react";

export function Detail() {
    const routeApi = getRouteApi("/$id");
    const id = routeApi.useParams().id;
    return (
        <>
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
                            subtitle={
                                <Link to={`mailto:${data.email}`}>
                                    {data.email}
                                </Link>
                            }
                            image={{
                                url: data.image,
                                alt: data.firstName + " " + data.lastName,
                            }}
                            link={{
                                url: "../",
                                text: "Back to Users List",
                                icon: <ChevronLeft />,
                            }}
                        >
                            <p>
                                <Tag height={14} /> {data.role}
                            </p>
                        </SectionHeading>
                        <List columns="large">
                            <ListItem
                                title="Personal Info"
                                subtitle={
                                    <>
                                        <Phone height={16} />
                                        {data.phone}
                                    </>
                                }
                                icon={<FileUser />}
                            >
                                <p>Blood Group: {data.bloodGroup}</p>
                                <p>
                                    <b>Address: </b>
                                    {data.address.address}, {data.address.city},{" "}
                                    {data.address.state},{" "}
                                    {data.address.postalCode},{" "}
                                    {data.address.country}
                                </p>
                            </ListItem>
                            <ListItem
                                title="Company Info"
                                subtitle={data.company.name}
                                icon={<Building />}
                            >
                                <p>
                                    <b>Department:</b> {data.company.department}
                                </p>
                                <p>
                                    <b>Title: </b>
                                    {data.company.title}
                                </p>
                            </ListItem>
                        </List>
                    </>
                )}
            </QueryLayout>
        </>
    );
}
