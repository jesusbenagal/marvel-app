import SearchIcon from "@/assets/search-icon.png";
import { StylesObject } from "@/interfaces/global";

const styles: StylesObject = {
  searchBar: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  searchInput: {
    border: "none",
    outline: "none",
    width: "100%",
    textTransform: "uppercase",
    color: "#AAAAAA",
  },
  searchIcon: {
    width: "12px",
    height: "12px",
  },
  searchContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    paddingBottom: "0.5rem",
    borderBottom: "1px solid #000000",
    gap: "1rem",
  },
  searchResults: {
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "15px",
  },
};

export default function SearchBar() {
  return (
    <div style={styles.searchBar}>
      <div style={styles.searchContainer}>
        <img src={SearchIcon} alt="Search Icon" style={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search a character..."
          style={styles.searchInput}
        />
      </div>
      <span style={styles.searchResults}>50 Results</span>
    </div>
  );
}
