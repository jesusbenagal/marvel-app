import { useState } from "react";
import { ScaleLoader } from "react-spinners";

import { GridContainer, SearchBar, CharacterCard } from "@/components/core";

import { useGetCharacters } from "@/hooks/api/use-get-characters";
import { useAppContext } from "@/hooks/context/use-app-context";

import type { StylesObject } from "@/interfaces/global";

const styles: StylesObject = {
  container: {
    padding: "2rem 2.5rem 3rem",
  },
  gridContainer: {
    paddingTop: "1rem",
  },
  spinnerContainer: {
    padding: "3rem 2.5rem 3rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  favouritesText: {
    fontSize: "1.7rem",
    fontWeight: 600,
    marginBottom: "1rem",
    textTransform: "uppercase",
  },
};

const spinnerColor = "red";

export default function MainView() {
  const {
    favouriteCharacters,
    isFavouriteFilter,
    setIsFavouriteFilter,
    totalFavourites,
  } = useAppContext();

  const [searchValue, setSearchValue] = useState<string | null>(null);

  const { characters, count, mutate, isLoading } =
    useGetCharacters(searchValue);

  const renderCards = () => {
    if (isFavouriteFilter) {
      return favouriteCharacters.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
          mutate={mutate}
        />
      ));
    }

    return characters.map((character) => (
      <CharacterCard key={character.id} character={character} mutate={mutate} />
    ));
  };

  return (
    <div style={styles.container}>
      {isFavouriteFilter && <h1 style={styles.favouritesText}>Favorites</h1>}
      <SearchBar
        count={count}
        isLoading={isLoading}
        setSearchValue={setSearchValue}
        totalFavourites={totalFavourites}
        isFavouriteFilter={isFavouriteFilter}
        setIsFavouriteFilter={setIsFavouriteFilter}
      />
      {isLoading ? (
        <div style={styles.spinnerContainer}>
          <ScaleLoader color={spinnerColor} />
        </div>
      ) : (
        <GridContainer style={styles.gridContainer}>
          {renderCards()}
        </GridContainer>
      )}
    </div>
  );
}
