import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, Mock } from "vitest";

import CharacterHeader from "@/components/character-info/character-header/index";
import { useAppContext } from "@/hooks/context/use-app-context";

vi.mock("@/hooks/context/use-app-context", () => ({
  useAppContext: vi.fn(),
}));

describe("CharacterHeader", () => {
  const mockMutate = vi.fn();
  const mockHandleChangeFavourites = vi.fn();

  const character = {
    id: 1,
    name: "Spider-Man",
    description: "Friendly neighborhood Spider-Man",
    thumbnail: {
      extension: "jpg",
      path: "path/to/spiderman",
    },
    isFavourite: false,
  };

  beforeEach(() => {
    (useAppContext as Mock).mockReturnValue({
      handleChangeFavourites: mockHandleChangeFavourites,
      mqDetector: false,
    });
  });

  it("should render character details correctly", () => {
    render(<CharacterHeader character={character} mutate={mockMutate} />);

    expect(screen.getByText("Spider-Man")).toBeInTheDocument();
    expect(
      screen.getByText("Friendly neighborhood Spider-Man")
    ).toBeInTheDocument();
    expect(screen.getByAltText("Character-Spider-Man")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /favorite/i })
    ).toBeInTheDocument();
  });

  it("should call handleFavourite when the favorite button is clicked", () => {
    render(<CharacterHeader character={character} mutate={mockMutate} />);

    const favouriteButton = screen.getByRole("button", { name: /favorite/i });
    fireEvent.click(favouriteButton);

    expect(mockHandleChangeFavourites).toHaveBeenCalledWith(
      { ...character, isFavourite: true },
      "add"
    );

    expect(mockMutate).toHaveBeenCalled();
  });

  it('should show "No description available" when description is empty', () => {
    const characterWithoutDescription = { ...character, description: "" };
    render(
      <CharacterHeader
        character={characterWithoutDescription}
        mutate={mockMutate}
      />
    );

    expect(screen.getByText("No description available")).toBeInTheDocument();
  });
});
