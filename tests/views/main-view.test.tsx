import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, Mock, beforeEach } from "vitest";

import MainView from "@/views/main-view";
import { useAppContext } from "@/hooks/context/use-app-context";
import { useGetCharacters } from "@/hooks/api/use-get-characters";

import type { ICharacter } from "@/interfaces/api";

vi.mock("@/hooks/context/use-app-context", () => ({
  useAppContext: vi.fn(),
}));

vi.mock("@/hooks/api/use-get-characters", () => ({
  useGetCharacters: vi.fn(),
}));

vi.mock("@/components/core", () => ({
  GridContainer: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  SearchBar: ({
    count,
    isLoading,
    setSearchValue,
    totalFavourites,
    isFavouriteFilter,
    setIsFavouriteFilter,
  }: {
    count: number;
    isLoading: boolean;
    setSearchValue: (value: string) => void;
    totalFavourites: number;
    isFavouriteFilter: boolean;
    setIsFavouriteFilter: React.Dispatch<React.SetStateAction<boolean>>;
  }) => (
    <div>
      <input
        placeholder="Search"
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <span>{count} results</span>
      {isLoading && <span>Loading...</span>}
      {isFavouriteFilter && (
        <span data-testid="favouritesText">
          Showing {totalFavourites} favourites
        </span>
      )}
      <button onClick={() => setIsFavouriteFilter(!isFavouriteFilter)}>
        Toggle Favourites
      </button>
    </div>
  ),
  CharacterCard: ({ character }: { character: ICharacter }) => (
    <div>{character.name}</div>
  ),
}));

describe("MainView", () => {
  const mockSetIsFavouriteFilter = vi.fn();
  const mockMutate = vi.fn();
  const defaultAppContext = {
    favouriteCharacters: [{ id: 1, name: "Spider-Man" }],
    isFavouriteFilter: false,
    setIsFavouriteFilter: mockSetIsFavouriteFilter,
    totalFavourites: 1,
    mqDetector: false,
  };
  const defaultCharactersData = {
    characters: [{ id: 2, name: "Iron Man" }],
    count: 1,
    mutate: mockMutate,
    isLoading: false,
  };

  beforeEach(() => {
    vi.resetAllMocks();
    (useAppContext as Mock).mockReturnValue(defaultAppContext);
    (useGetCharacters as Mock).mockReturnValue(defaultCharactersData);
  });

  it("should render search bar and characters correctly", () => {
    render(<MainView />);

    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
    expect(screen.getByText("1 results")).toBeInTheDocument();
    expect(screen.getByText("Iron Man")).toBeInTheDocument();
  });

  it("should display loading spinner when loading", () => {
    (useGetCharacters as Mock).mockReturnValue({
      ...defaultCharactersData,
      isLoading: true,
    });

    render(<MainView />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should display favourite characters when favourite filter is active", () => {
    (useAppContext as Mock).mockReturnValue({
      ...defaultAppContext,
      isFavouriteFilter: true,
    });

    render(<MainView />);

    expect(screen.getByTestId("favouritesText")).toBeInTheDocument();
    expect(screen.getByText("Spider-Man")).toBeInTheDocument();
  });

  it("should toggle favourite filter when button is clicked", () => {
    render(<MainView />);

    const toggleButton = screen.getByText("Toggle Favourites");
    fireEvent.click(toggleButton);

    expect(mockSetIsFavouriteFilter).toHaveBeenCalledWith(true);
  });

  it("should update search value correctly", () => {
    render(<MainView />);

    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "Hulk" } });

    expect(screen.getByPlaceholderText("Search")).toHaveValue("Hulk");
  });
});
