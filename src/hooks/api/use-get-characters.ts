import { useEffect, useState } from "react";
import useSWR from "swr";

import { getCharacters } from "@/api/services/marvel";

import type { ICharacter } from "@/interfaces/api";

export const useGetCharacters = (searchValue: string | null) => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [count, setCount] = useState<number>(0);

  const { data, isLoading, error } = useSWR(
    `characters/${searchValue || "all"}`,
    async () => {
      const { characters, count } = await getCharacters(searchValue);
      return { characters, count };
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: true,
    }
  );

  useEffect(() => {
    if (data) {
      setCharacters(data.characters);
      setCount(data.count);
    }
  }, [data]);

  return {
    characters,
    count,
    isLoading: isLoading || (!error && !data),
    isError: !!error,
  };
};
