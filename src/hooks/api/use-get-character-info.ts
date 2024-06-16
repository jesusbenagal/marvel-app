import useSWR from "swr";

import { getCharacterById } from "@/api/services/marvel";

export const useGetCharacterInfo = (id: number) => {
  const { data, isLoading, error } = useSWR(
    `character/${id}`,
    async () => {
      const character = await getCharacterById(id);

      return character;
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: true,
    }
  );

  return {
    character: data ? data[0] : null,
    isLoading: isLoading || (!error && !data),
    isError: !!error,
  };
};
