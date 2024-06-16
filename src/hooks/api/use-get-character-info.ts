import useSWR from "swr";

import { getCharacterById, getCharacterComics } from "@/api/services/marvel";

import { apiRoutes } from "@/constants/api-routes";

const fetchCharacterInfo = async (id: number) => {
  const character = await getCharacterById(id);
  const comics = await getCharacterComics(id);
  return { character, comics };
};

export const useGetCharacterInfo = (id: number) => {
  const { data, error } = useSWR(
    `${apiRoutes.base}${apiRoutes.characters.base}/${id}`,
    () => fetchCharacterInfo(id),
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    character: data ? data.character[0] : null,
    comics: data ? data.comics : [],
    isLoading: !error && !data,
    isError: !!error,
  };
};
