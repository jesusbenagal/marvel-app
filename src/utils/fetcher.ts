import axios from "axios";

export const fetcher = <T>(url: string) =>
  axios
    .get<T>(url)
    .then(({ data }) => data)
    .catch((error) => {
      throw new Error(error.message);
    });
