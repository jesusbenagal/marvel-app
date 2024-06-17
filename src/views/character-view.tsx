import { useParams } from "react-router-dom";

import { CharacterHeader, CharacterComics } from "@/components/character-info";

import { useGetCharacterInfo } from "@/hooks/api/use-get-character-info";

export default function CharacterView() {
  const { id } = useParams();

  const { character, comics, isLoading, isError, mutate } = useGetCharacterInfo(
    Number(id)
  );

  if (isLoading || !character) return <div>Loading...</div>;

  if (isError) return <div>Error</div>;

  return (
    <div>
      <CharacterHeader character={character} mutate={mutate} />
      <CharacterComics comics={comics} />
    </div>
  );
}
