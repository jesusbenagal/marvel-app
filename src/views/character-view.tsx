import { useParams } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

import { CharacterHeader, CharacterComics } from "@/components/character-info";

import { useGetCharacterInfo } from "@/hooks/api/use-get-character-info";

import type { StylesObject } from "@/interfaces/global";

const styles: StylesObject = {
  spinnerContainer: {
    padding: "3rem 2.5rem 3rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

const spinnerColor = "red";

export default function CharacterView() {
  const { id } = useParams();

  const { character, comics, isLoading, isError, mutate } = useGetCharacterInfo(
    Number(id)
  );

  if (isLoading || !character)
    return (
      <div style={styles.spinnerContainer}>
        <ScaleLoader data-testid="spinner" color={spinnerColor} />
      </div>
    );

  if (isError) return <div>Error</div>;

  return (
    <>
      <CharacterHeader character={character} mutate={mutate} />
      <CharacterComics comics={comics} />
    </>
  );
}
