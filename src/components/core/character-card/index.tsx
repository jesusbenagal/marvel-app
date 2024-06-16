import heartEmpty from "@/assets/heart-empty.svg";

import styles from "./styles.module.css";

interface ICharacterCardProps {
  name: string;
  imageUrl: string;
}

export default function CharacterCard({ name, imageUrl }: ICharacterCardProps) {
  return (
    <div className={styles.card}>
      <img src={imageUrl} alt="Character" className={styles.cardImage} />
      <div className={styles.cardFooter}>
        <div className={styles.cardName}>{name}</div>
        <img
          src={heartEmpty}
          alt="Add to favourites"
          className={styles.cardHeart}
        />
      </div>
    </div>
  );
}
