import { useLocation, useNavigate } from "react-router-dom";

import MarvelLogo from "@/assets/marvel-logo.svg";
import HeartFill from "@/assets/heart-fill.svg";

import { useAppContext } from "@/hooks/context/use-app-context";

import { appRoutes } from "@/constants/app-routes";

import type { StylesObject } from "@/interfaces/global";

const styles: StylesObject = {
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
    backgroundColor: "#000000",
    height: "84px",
    borderBottom: ".5px solid #ffffff",
  },
  favouritesContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  button: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
  },
  favouritesNumber: {
    color: "#FFFFFF",
    fontSize: "16px",
  },
};

export default function Header() {
  const { totalFavourites, setIsFavouriteFilter } = useAppContext();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClickLogo = () => {
    if (pathname !== appRoutes.HOME) {
      navigate(appRoutes.HOME);
    }
    setIsFavouriteFilter(false);
  };

  const handleClickFavourites = () => {
    setIsFavouriteFilter(true);
    navigate(appRoutes.HOME);
  };

  return (
    <div style={styles.headerContainer}>
      <button onClick={() => handleClickLogo()} style={styles.button}>
        <img src={MarvelLogo} alt="logo" />
      </button>
      <div style={styles.favouritesContainer}>
        <button style={styles.button} onClick={() => handleClickFavourites()}>
          <img src={HeartFill} alt="heart-fill" />
        </button>
        <span style={styles.favouritesNumber}>{totalFavourites}</span>
      </div>
    </div>
  );
}
