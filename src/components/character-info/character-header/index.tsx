import styles from "./styles.module.css";

interface ICharacterHeaderProps {
  name: string;
  description: string;
  imageUrl: string;
}
export default function CharacterHeader({
  name,
  description,
  imageUrl,
}: ICharacterHeaderProps) {
  return (
    <div className={styles.headerContainer}>
      <img src={imageUrl} alt={`Character-${name}`} className={styles.img} />
      <div className={styles.description}>
        <h1 className={styles.title}>{name}</h1>
        <p className={styles.paragraph}>
          {description === "" ? "No description available" : description}
        </p>
      </div>
    </div>
  );
}
