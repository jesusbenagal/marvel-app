import { SWRConfiguration } from "swr";

import { fetcher } from "@/utils/fetcher";

export const swrConfig: SWRConfiguration = {
  fetcher,
  onError: (error) => {
    // TODO: Add error handling
    console.error(error);
  },
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  revalidateOnMount: false,
};
