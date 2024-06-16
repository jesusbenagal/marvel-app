import type { StylesObject } from "@/interfaces/global";

interface IComicProps {
  title: string;
  date: string;
  image: string;
}

const styles: StylesObject = {
  comic: {
    flex: "0 0 auto",
    minWidth: 0,
  },
  image: {
    width: "200px",
    height: "250px",
  },
  title: {
    width: "200px",
    wordWrap: "break-word",
    overflowWrap: "break-word",
    whiteSpace: "normal",
    fontSize: "1rem",
    fontWeight: "bold",
  },
  year: {
    fontSize: "0.8rem",
    color: "#777",
  },
};

export default function Comic({ title, date, image }: IComicProps) {
  const releaseDate = isNaN(new Date(date).getFullYear())
    ? "Unknown"
    : new Date(date).getFullYear();

  return (
    <div style={styles.comic}>
      <img src={image} alt="comic" style={styles.image} />
      <div style={styles.title}>
        <p style={styles.title}>{title}</p>
      </div>
      <span style={styles.year}>{releaseDate}</span>
    </div>
  );
}
