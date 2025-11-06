export const filterData = <T>(data: T, filters: Record<string, string>) => {
  if (!Array.isArray(data) || !filters) {
    return data;
  }

  const activeFilters = Object.entries(filters).filter(
    ([value]) => value && value.trim() !== "",
  );

  if (activeFilters.length === 0) {
    return data;
  }

  return data.filter((item) => {
    return activeFilters.every(([key, value]) => {
      const itemValue = String(item[key as keyof T] || "").toLowerCase();
      const filterValue = String(value).toLowerCase();
      return itemValue.includes(filterValue);
    });
  });
};
