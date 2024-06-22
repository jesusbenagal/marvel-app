import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { KeyedMutator } from "swr";

import { useAppContext } from "@/hooks/context/use-app-context";

import heartEmpty from "@/assets/heart-empty.svg";
import heartFill from "@/assets/heart-fill.svg";
import heartWhite from "@/assets/heart-white.svg";

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
  const { handleChangeFavourites } = useAppContext();
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState<boolean>(false);

  const {
    id,
    thumbnail: { path, extension },
    name,
    isFavourite,
  } = character;

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      navigate(`/character/${id}`);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleChangeFavourites(
      { ...character, isFavourite: !isFavourite },
      isFavourite ? "remove" : "add"
    );
    mutate((prevData) => {
      if (!prevData) return prevData;
      return {
        charactersWithFavourites: prevData.charactersWithFavourites.map((c) => {
          if (c.id === character.id) {
            return { ...c, isFavourite: !isFavourite };
          }
          return c;
        }),
        count: prevData.count,
      };
    }, false);
  };

  const renderIcon = (): string => {
    if (isFavourite) {
      return isHovered ? heartWhite : heartFill;
    }

    return heartEmpty;
  };

  return (
    <div
      data-testid="character-card"
      className={styles.card}
      onClick={() => navigate(`/character/${id}`)}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      role="button"
    >
      <img
        src={`${path}.${extension}`}
        alt="Character"
        className={styles.cardImage}
      />
      <div className={styles.cardFooterContainer}>
        <div className={styles.cardFooterSeparator} />
        <div className={styles.cardFooterTextContainer}>
          <div className={styles.cardName}>{name}</div>
          <button
            data-testid="favButton"
            className={styles.button}
            onClick={handleClick}
            type="button"
          >
            <img
              src={renderIcon()}
              alt="Add to favourites"
              className={styles.cardHeart}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
