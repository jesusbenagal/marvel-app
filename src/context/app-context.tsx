import { createContext, useCallback, useMemo, useState } from "react";
import { useMediaQuery, useLocalStorage } from "usehooks-ts";

import type { ICharacter } from "@/interfaces/api";

interface IAppContext {
  mqDetector: boolean;
  favouriteCharacters: ICharacter[];
  handleChangeFavourites: (
    character: ICharacter,
    action: "add" | "remove"
  ) => void;
  totalFavourites: number;
  isFavouriteFilter: boolean;
  setIsFavouriteFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext({} as IAppContext);

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isFavouriteFilter, setIsFavouriteFilter] = useState<boolean>(false);

  const mqDetector = useMediaQuery("(max-width: 768px)");

  const [favouriteCharacters, setFavouriteCharacters] = useLocalStorage<
    ICharacter[]
  >("favouriteCharacters", []);

  const totalFavourites = useMemo(
    () => favouriteCharacters.length,
    [favouriteCharacters]
  );

  const handleChangeFavourites = useCallback(
    (character: ICharacter, action: "add" | "remove") => {
      if (action === "add") {
        setFavouriteCharacters([...favouriteCharacters, character]);
      } else {
        setFavouriteCharacters(
          favouriteCharacters.filter((c) => c.id !== character.id)
        );
      }
    },
    [favouriteCharacters, setFavouriteCharacters]
  );

  const value = useMemo(
    () => ({
      mqDetector,
      favouriteCharacters,
      handleChangeFavourites,
      totalFavourites,
      isFavouriteFilter,
      setIsFavouriteFilter,
    }),
    [
      mqDetector,
      favouriteCharacters,
      handleChangeFavourites,
      totalFavourites,
      isFavouriteFilter,
      setIsFavouriteFilter,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
