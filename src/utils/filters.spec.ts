import { MOCK_DATA } from "@test/utils";
import { describe, expect, test } from "vitest";
import { filterData, filterStartingValues } from "./filters";
import type { FiltersConfig } from "@type/core/filters";

describe("filters utils", () => {
  describe("filterStartingValues", () => {
    test("should return an object with starting values for each filter", () => {
      const filterValues = filterStartingValues(
        MOCK_DATA.filtersConfig as FiltersConfig[],
      );
      expect(filterValues).toEqual({
        name: "",
        role: "",
      });
    });
  });

  describe("filterData", () => {
    4;
    test("should filter data based on active filters", () => {
      const filters = MOCK_DATA.filters;
      const filteredData = filterData(MOCK_DATA.users, filters);
      expect(filteredData.length).toBe(1);
    });
    test("should return original data if no active filters", () => {
      const filters = { name: "", role: "" };
      const filteredData = filterData(MOCK_DATA.users, filters);
      expect(filteredData.length).toBe(MOCK_DATA.users.length);
    });
    test("should return original data if data is not an array", () => {
      const filters = MOCK_DATA.filters;
      const filteredData = filterData(MOCK_DATA.user, filters);
      expect(filteredData).toBe(MOCK_DATA.user);
    });
  });
});
