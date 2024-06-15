import { GridContainer } from "@/components/core";
import { SearchBar } from "@/components/core/search-bar";

export default function MainView() {
  return (
    <div
      style={{
        padding: "3rem 2.5rem 3rem",
      }}
    >
      <SearchBar />
      <GridContainer
        style={{
          paddingTop: "1rem",
        }}
      >
        Main View
      </GridContainer>
    </div>
  );
}
