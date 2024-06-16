import CryptoJS from "crypto-js";

import { createAxios } from "@/utils/api";
import { apiRoutes } from "@/constants/api-routes";

import type { IApiResponse, ICharacter } from "@/interfaces/api";

const marvelInstance = createAxios(apiRoutes.base);

// Generate timestamp and hash for Marvel API
const timestamp = new Date().getTime();
const hash = CryptoJS.MD5(
  `${timestamp}${import.meta.env.VITE_MARVEL_PRIVATE_API_KEY}${
    import.meta.env.VITE_MARVEL_PUBLIC_API_KEY
  }`
).toString();

export const getCharacters = async (
  name: string | null
): Promise<{
  count: number;
  characters: ICharacter[];
}> => {
  const {
    data: {
      data: { count, results: characters },
    },
  } = await marvelInstance.get<IApiResponse>(`${apiRoutes.characters.base}`, {
    params: {
      limit: 50,
      ...(name && { nameStartsWith: name }),
      orderBy: "name",
      ts: timestamp,
      apikey: import.meta.env.VITE_MARVEL_PUBLIC_API_KEY,
      hash,
    },
  });

  return { count, characters };
};

export const getCharacterById = async (
  id: number
): Promise<{ count: number; characters: ICharacter[] }> => {
  const {
    data: {
      data: { count, results: characters },
    },
  } = await marvelInstance.get<IApiResponse>(
    `${apiRoutes.characters.base}/${id}`,
    {
      params: {
        ts: timestamp,
        apikey: import.meta.env.VITE_MARVEL_PUBLIC_API_KEY,
        hash,
      },
    }
  );

  return { count, characters };
};
