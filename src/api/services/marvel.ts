import CryptoJS from "crypto-js";

import { createAxios } from "@/utils/api";
import { apiRoutes } from "@/constants/api-routes";

const marvelInstance = createAxios(apiRoutes.base);

// Generate timestamp and hash for Marvel API
const timestamp = new Date().getTime();
const hash = CryptoJS.MD5(
  `${timestamp}${import.meta.env.VITE_MARVEL_PRIVATE_API_KEY}${
    import.meta.env.VITE_MARVEL_PUBLIC_API_KEY
  }`
).toString();

export const getCharacters = async () => {
  const { data } = await marvelInstance.get(`${apiRoutes.characters.base}`, {
    params: {
      limit: 50,
      orderBy: "name",
      ts: timestamp,
      apikey: import.meta.env.VITE_MARVEL_PUBLIC_API_KEY,
      hash,
    },
  });

  return data;
};

export const getCharacterById = async (id: number) => {
  const { data } = await marvelInstance.get(
    `${apiRoutes.characters.base}/${id}`,
    {
      params: {
        ts: timestamp,
        apikey: import.meta.env.VITE_MARVEL_PUBLIC_API_KEY,
        hash,
      },
    }
  );

  return data;
};

export const getCharacterComics = async (id: number) => {
  const { data } = await marvelInstance.get(
    `${apiRoutes.characters.base}/${id}${apiRoutes.characters.comics}`,
    {
      params: {
        limit: 10,
        orderBy: "title",
        ts: timestamp,
        apikey: import.meta.env.VITE_MARVEL_PUBLIC_API_KEY,
        hash,
      },
    }
  );

  return data;
};
