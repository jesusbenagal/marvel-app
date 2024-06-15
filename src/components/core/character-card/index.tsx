import heartEmpty from "@/assets/heart-empty.svg";

import styles from "./styles.module.css";

export default function CharacterCard() {
  return (
    <div className={styles.card}>
      <img
        src="https://via.placeholder.com/200"
        alt="Character"
        className={styles.cardImage}
      />
      <div className={styles.cardFooter}>
        <div className={styles.cardName}>NAME</div>
        <img
          src={heartEmpty}
          alt="Add to favourites"
          className={styles.cardHeart}
        />
      </div>
    </div>
  );
}
