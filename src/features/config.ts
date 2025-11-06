import type { FiltersConfig } from "@/components/shared/Filters/types";

export const FILTERS_CONFIG: FiltersConfig[] = [
  {
    key: "firstName",
    type: "text",
    placeholder: "Filter by name",
    value: "",
    ariaLabel: "Name filter input",
  },
  {
    key: "role",
    type: "select",
    ariaLabel: "Role filter select",
    options: [
      { label: "All", value: "" },
      { label: "Admin", value: "admin" },
      { label: "User", value: "user" },
      { label: "Moderator", value: "moderator" },
    ],
    value: "",
  },
];
