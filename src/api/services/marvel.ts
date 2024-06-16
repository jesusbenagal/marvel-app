import CryptoJS from "crypto-js";

import { createAxios } from "@/utils/api";
import { apiRoutes } from "@/constants/api-routes";

import type { IApiResponse, ICharacter, IComic } from "@/interfaces/api";

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
  } = await marvelInstance.get<IApiResponse<ICharacter>>(
    `${apiRoutes.characters.base}`,
    {
      params: {
        limit: 50,
        ...(name && { nameStartsWith: name }),
        orderBy: "name",
        ts: timestamp,
        apikey: import.meta.env.VITE_MARVEL_PUBLIC_API_KEY,
        hash,
      },
    }
  );

  return { count, characters };
};

export const getCharacterById = async (id: number): Promise<ICharacter[]> => {
  const {
    data: {
      data: { results: characters },
    },
  } = await marvelInstance.get<IApiResponse<ICharacter>>(
    `${apiRoutes.characters.base}/${id}`,
    {
      params: {
        ts: timestamp,
        apikey: import.meta.env.VITE_MARVEL_PUBLIC_API_KEY,
        hash,
      },
    }
  );

  return characters;
};

export const getCharacterComics = async (id: number): Promise<IComic[]> => {
  const {
    data: {
      data: { results: comics },
    },
  } = await marvelInstance.get<IApiResponse<IComic>>(
    `${apiRoutes.characters.base}/${id}${apiRoutes.characters.comics}`,
    {
      params: {
        orderBy: "onsaleDate",
        limit: 100,
        ts: timestamp,
        apikey: import.meta.env.VITE_MARVEL_PUBLIC_API_KEY,
        hash,
      },
    }
  );

  return comics;
};
