import Comic from "./comic";

import { useAppContext } from "@/hooks/context/use-app-context";

import type { StylesObject } from "@/interfaces/global";
import type { IComic } from "@/interfaces/api";

interface ICharacterComicsProps {
  comics: IComic[];
}

const getStyles = (isMobile: boolean): StylesObject => ({
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: isMobile ? "flex-start" : "center",
    flexDirection: "column",
    paddingTop: "2rem",
    paddingLeft: "2rem",
  },
  titleContainer: {
    width: "60%",
  },
  titleText: {
    textTransform: "uppercase",
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  comicsContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: ".5rem",
    width: isMobile ? "100%" : "60%",
    minWidth: 0,
    height: "400px",
    overflowX: "auto",
  },
});

export default function CharacterComics({ comics }: ICharacterComicsProps) {
  const { mqDetector } = useAppContext();

  const { mainContainer, titleContainer, titleText, comicsContainer } =
    getStyles(mqDetector);

  return (
    <div style={mainContainer}>
      <div style={titleContainer}>
        <span style={titleText}>Comics</span>
      </div>
      <div style={comicsContainer}>
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
