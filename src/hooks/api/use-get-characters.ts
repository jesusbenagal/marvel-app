import { useEffect, useState } from "react";
import useSWR from "swr";

import { getCharacters } from "@/api/services/marvel";
import { apiRoutes } from "@/constants/api-routes";

import type { ICharacter } from "@/interfaces/api";
import { useAppContext } from "../context/use-app-context";

export const useGetCharacters = (searchValue: string | null) => {
  const { favouriteCharacters } = useAppContext();
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [count, setCount] = useState<number>(0);

  const { data, isLoading, error, mutate } = useSWR(
    `${apiRoutes.base}${apiRoutes.characters.base}?nameStartsWith=${
      searchValue ?? ""
    }`,
    async () => {
      const { characters, count } = await getCharacters(searchValue);

      const charactersWithFavourites: ICharacter[] = characters.map(
        (character) => {
          const isFavourite = favouriteCharacters.some(
            (c) => c.id === character.id
          );

          return { ...character, isFavourite };
        }
      );

      return { charactersWithFavourites, count };
    },
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    if (data) {
      setCharacters(data.charactersWithFavourites);
      setCount(data.count);
    }
  }, [data]);

  return {
    characters,
    count,
    isLoading: isLoading || (!error && !data),
    isError: !!error,
    mutate,
  };
};
