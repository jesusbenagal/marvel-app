import { StylesObject } from "@/interfaces/global";

interface ICharacterHeaderProps {
  name: string;
  description: string;
  imageUrl: string;
}

const styles: StylesObject = {
  headerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    color: "#fff",
    padding: "20px",
    gap: "5rem",
    height: "300px",
  },
  img: {
    width: "300px",
    height: "300px",
  },
  description: {
    maxWidth: "500px",
  },
  title: {
    fontSize: "2em",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  paragraph: {
    fontSize: "1.2em",
  },
};

export default function CharacterHeader({
  name,
  description,
  imageUrl,
}: ICharacterHeaderProps) {
  return (
    <div style={styles.headerContainer}>
      <img src={imageUrl} alt={`Character-${name}`} style={styles.img} />
      <div style={styles.description}>
        <h1 style={styles.title}>{name}</h1>
        <p style={styles.paragraph}>
          {description === "" ? "No description available" : description}
        </p>
      </div>
    </div>
  );
}
