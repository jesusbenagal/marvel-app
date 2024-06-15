import { GridContainer, SearchBar, CharacterCard } from "@/components/core";

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
        <CharacterCard />
      </GridContainer>
    </div>
  );
}
