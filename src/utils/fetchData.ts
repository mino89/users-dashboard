/**
 *
 * @param url {string} The URL to fetch data from
 * @param options {RequestInit} Fetch options such as method, headers, body, etc.
 * @returns
 */
export async function fetchData<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(url, options);
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(`${response.status} : An error occurred`);
  }
}
