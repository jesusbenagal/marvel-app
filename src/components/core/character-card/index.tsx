import type { KeyedMutator } from "swr";
import { useNavigate } from "react-router-dom";

import { useAppContext } from "@/hooks/context/use-app-context";

import heartEmpty from "@/assets/heart-empty.svg";
import heartFill from "@/assets/heart-fill.svg";

import styles from "./styles.module.css";

import type { ICharacter } from "@/interfaces/api";

interface ICharacterCardProps {
  character: ICharacter;
  mutate: KeyedMutator<{
    charactersWithFavourites: ICharacter[];
    count: number;
  }>;
}

export default function CharacterCard({
  character,
  mutate,
}: ICharacterCardProps) {
  const {
    id,
    thumbnail: { path, extension },
    name,
    isFavourite,
  } = character;

  const navigate = useNavigate();

  const { handleChangeFavourites } = useAppContext();

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      navigate(`/character/${id}`);
    }
  };

  return (
    <div
      className={styles.card}
      onClick={() => navigate(`/character/${id}`)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
    >
      <img
        src={`${path}.${extension}`}
        alt="Character"
        className={styles.cardImage}
      />
      <div className={styles.cardFooter}>
        <div className={styles.cardName}>{name}</div>
        <button
          className={styles.button}
          onClick={(e) => {
            e.stopPropagation();
            handleChangeFavourites(character, isFavourite ? "remove" : "add");
            mutate((prevData) => {
              if (!prevData) return prevData;
              return {
                charactersWithFavourites: prevData.charactersWithFavourites.map(
                  (c) => {
                    if (c.id === character.id) {
                      return { ...c, isFavourite: !isFavourite };
                    }
                    return c;
                  }
                ),
                count: prevData.count,
              };
            }, false);
          }}
        >
          <img
            src={isFavourite ? heartFill : heartEmpty}
            alt="Add to favourites"
            className={styles.cardHeart}
          />
        </button>
      </div>
    </div>
  );
}
