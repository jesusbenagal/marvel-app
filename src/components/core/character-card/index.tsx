import { useNavigate } from "react-router-dom";

import heartEmpty from "@/assets/heart-empty.svg";

import styles from "./styles.module.css";

interface ICharacterCardProps {
  id: number;
  name: string;
  imageUrl: string;
}

export default function CharacterCard({
  id,
  name,
  imageUrl,
}: ICharacterCardProps) {
  const navigate = useNavigate();

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
