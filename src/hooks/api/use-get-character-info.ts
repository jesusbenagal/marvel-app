import useSWR from "swr";

import { getCharacterById, getCharacterComics } from "@/api/services/marvel";

import { useAppContext } from "../context/use-app-context";

import { apiRoutes } from "@/constants/api-routes";
import { ICharacter } from "@/interfaces/api";

export const useGetCharacterInfo = (id: number) => {
  const { favouriteCharacters } = useAppContext();

  const { data, error, mutate } = useSWR(
    `${apiRoutes.base}${apiRoutes.characters.base}/${id}`,
    async () => {
      const characters = await getCharacterById(id);
      const comics = await getCharacterComics(id);

      const characterWithFavourite: ICharacter[] = characters.map(
        (character) => {
          const isFavourite = favouriteCharacters.some(
            (c) => c.id === character.id
          );

          return { ...character, isFavourite };
        }
      );

      return { character: characterWithFavourite, comics };
    },
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
    mutate,
  };
};
