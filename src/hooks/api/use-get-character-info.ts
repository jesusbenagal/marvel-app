import useSWR from "swr";

import { getCharacterById, getCharacterComics } from "@/api/services/marvel";

export const useGetCharacterInfo = (id: number) => {
  const { data, isLoading, error } = useSWR(
    `character/${id}`,
    async () => {
      const character = await getCharacterById(id);
      const comics = await getCharacterComics(id);

      return { character, comics };
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: true,
    }
  );

  return {
    character: data ? data.character[0] : null,
    comics: data ? data.comics : [],
    isLoading: isLoading || (!error && !data),
    isError: !!error,
  };
};
