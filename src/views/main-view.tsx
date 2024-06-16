import { useState } from "react";
import { ScaleLoader } from "react-spinners";

import { GridContainer, SearchBar, CharacterCard } from "@/components/core";

import { useGetCharacters } from "@/hooks/api/use-get-characters";

import type { StylesObject } from "@/interfaces/global";

const styles: StylesObject = {
  container: {
    padding: "3rem 2.5rem 3rem",
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
};

const spinnerColor = "red";

export default function MainView() {
  const [searchValue, setSearchValue] = useState<string | null>(null);

  const { characters, count, isLoading } = useGetCharacters(searchValue);

  return (
    <div style={styles.container}>
      <SearchBar
        count={count}
        isLoading={isLoading}
        setSearchValue={setSearchValue}
      />
      {isLoading ? (
        <div style={styles.spinnerContainer}>
          <ScaleLoader color={spinnerColor} />
        </div>
      ) : (
        <GridContainer style={styles.gridContainer}>
          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              name={character.name}
              imageUrl={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            />
          ))}
        </GridContainer>
      )}
    </div>
  );
}
