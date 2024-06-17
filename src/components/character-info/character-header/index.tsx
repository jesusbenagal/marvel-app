import type { KeyedMutator } from "swr";

import heartEmpty from "@/assets/heart-empty.svg";
import heartFill from "@/assets/heart-fill.svg";

import { useAppContext } from "@/hooks/context/use-app-context";

import styles from "./styles.module.css";

import type { ICharacter, IComic } from "@/interfaces/api";

interface ICharacterHeaderProps {
  character: ICharacter;
  mutate: KeyedMutator<{
    character: ICharacter[];
    comics: IComic[];
  }>;
}
export default function CharacterHeader({
  character,
  mutate,
}: ICharacterHeaderProps) {
  const { handleChangeFavourites } = useAppContext();

  const {
    name,
    description,
    thumbnail: { extension, path },
    isFavourite,
  } = character;

  const handleFavourite = () => {
    handleChangeFavourites(
      { ...character, isFavourite: !isFavourite },
      isFavourite ? "remove" : "add"
    );

    mutate((prevData) => {
      if (!prevData) return prevData;
      return {
        character: [
          {
            ...prevData.character[0],
            isFavourite: !isFavourite,
          },
        ],
        comics: prevData.comics,
      };
    }, false);
  };

  return (
    <div className={styles.headerContainer}>
      <img
        src={`${path}.${extension}`}
        alt={`Character-${name}`}
        className={styles.img}
      />
      <div className={styles.description}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>{name}</h1>
          <button
            onClick={handleFavourite}
            className={styles.favouriteButton}
            aria-label="Favorite"
          >
            <img
              src={isFavourite ? heartFill : heartEmpty}
              alt="Favorite"
              className={styles.favouriteIcon}
            />
          </button>
        </div>
        <p className={styles.paragraph}>
          {description === "" ? "No description available" : description}
        </p>
      </div>
    </div>
  );
}
