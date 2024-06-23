import type { KeyedMutator } from "swr";

import heartEmpty from "@/assets/heart-empty.svg";
import heartFill from "@/assets/heart-fill.svg";

import { useAppContext } from "@/hooks/context/use-app-context";

import styles from "./styles.module.css";

import type { ICharacter, IComic } from "@/interfaces/api";
import type { StylesObject } from "@/interfaces/global";

interface ICharacterHeaderProps {
  character: ICharacter;
  mutate: KeyedMutator<{
    character: ICharacter[];
    comics: IComic[];
  }>;
}

const getStyles = (isMobile: boolean): StylesObject => ({
  headerContainer: {
    flexDirection: isMobile ? "column" : "row",
    height: isMobile ? "auto" : "290px",
  },
  img: {
    width: isMobile ? "100%" : "auto",
    height: isMobile ? "auto" : "100%",
  },
  descriptionContainer: {
    padding: isMobile ? "1rem" : "2rem",
    width: isMobile ? "100%" : "40%",
  },
});

export default function CharacterHeader({
  character,
  mutate,
}: ICharacterHeaderProps) {
  const { handleChangeFavourites, mqDetector } = useAppContext();

  const {
    name,
    description,
    thumbnail: { extension, path },
    isFavourite,
  } = character;

  const { headerContainer, img, descriptionContainer } = getStyles(mqDetector);

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
    <div
      data-testid="character-info-header-container"
      className={styles.headerContainer}
      style={headerContainer}
    >
      <img src={`${path}.${extension}`} alt={`Character-${name}`} style={img} />
      <div style={descriptionContainer}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>{name}</h1>
          <button
            data-testid="favourite-button-character-info"
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
