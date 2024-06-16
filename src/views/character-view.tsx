import { useParams } from "react-router-dom";

import { CharacterHeader } from "@/components/character-info";

import { useGetCharacterInfo } from "@/hooks/api/use-get-character-info";

export default function CharacterView() {
  const { id } = useParams();

  const { character, isLoading, isError } = useGetCharacterInfo(Number(id));

  if (isLoading || !character) return <div>Loading...</div>;

  if (isError) return <div>Error</div>;

  return (
    <div>
      <CharacterHeader
        name={character.name}
        imageUrl={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        description={character.description}
      />
    </div>
  );
}
