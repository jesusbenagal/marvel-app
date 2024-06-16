import { IComic } from "@/interfaces/api";
import Comic from "./comic";

import type { StylesObject } from "@/interfaces/global";

interface ICharacterComicsProps {
  comics: IComic[];
}

const styles: StylesObject = {
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: "2rem",
    gap: "1rem",
  },
  titleContainer: {
    width: "60%",
  },
  titleText: {
    textTransform: "uppercase",
  },
  comicsContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: "1rem",
    width: "60%",
    minWidth: 0,
    height: "400px",
    overflowX: "auto",
  },
};

export default function CharacterComics({ comics }: ICharacterComicsProps) {
  return (
    <div style={styles.mainContainer}>
      <div style={styles.titleContainer}>
        <h1 style={styles.titleText}>Comics</h1>
      </div>
      <div style={styles.comicsContainer}>
        {comics.map((comic) => (
          <Comic
            key={comic.id}
            title={comic.title}
            date={
              comic.dates.find((date) => date.type === "onsaleDate")?.date || ""
            }
            image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
          />
        ))}
      </div>
    </div>
  );
}
