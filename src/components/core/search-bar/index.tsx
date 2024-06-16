import { useState } from "react";

import SearchIcon from "@/assets/search-icon.png";

import type { StylesObject } from "@/interfaces/global";

interface ISearchBarProps {
  count: number;
  isLoading: boolean;
  setSearchValue: (value: string | null) => void;
}

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
    width: "99%",
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

export default function SearchBar({
  count,
  isLoading,
  setSearchValue,
}: ISearchBarProps): JSX.Element {
  const [value, setValue] = useState<string>("");

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setSearchValue(value);
    }
  };

  return (
    <div style={styles.searchBar}>
      <div style={styles.searchContainer}>
        <img src={SearchIcon} alt="Search Icon" style={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search a character..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyPress}
          style={styles.searchInput}
        />
      </div>
      <span style={styles.searchResults}>
        {isLoading ? "Loading" : count} results
      </span>
    </div>
  );
}
