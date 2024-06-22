import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { MemoryRouter, useNavigate } from "react-router-dom";

import CharacterCard from "@/components/core/character-card";
import { useAppContext } from "@/hooks/context/use-app-context";
import heartWhite from "@/assets/heart-white.svg";
import heartFill from "@/assets/heart-fill.svg";

vi.mock("@/hooks/context/use-app-context", () => ({
  useAppContext: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: vi.fn(),
  MemoryRouter: ({ children }: { children: React.ReactNode }) => children,
}));

describe("CharacterCard", () => {
  const mockNavigate = vi.fn();
  const mockHandleChangeFavourites = vi.fn();
  const mockMutate = vi.fn();

  const character = {
    id: 1,
    thumbnail: { path: "path/to/character", extension: "jpg" },
    name: "Spider-Man",
    description: "Your friendly neighborhood SpiderMan",
    isFavourite: false,
  };

  beforeEach(() => {
    vi.resetAllMocks();
    (useAppContext as Mock).mockReturnValue({
      handleChangeFavourites: mockHandleChangeFavourites,
    });
    (useNavigate as Mock).mockReturnValue(mockNavigate);
  });

  it("should render character details correctly", () => {
    render(
      <MemoryRouter>
        <CharacterCard character={character} mutate={mockMutate} />
      </MemoryRouter>
    );

    expect(screen.getByAltText("Character")).toBeInTheDocument();
    expect(screen.getByText("Spider-Man")).toBeInTheDocument();
  });

  it("should navigate to character detail page on click", () => {
    render(
      <MemoryRouter>
        <CharacterCard character={character} mutate={mockMutate} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId("character-card"));

    expect(mockNavigate).toHaveBeenCalledWith(`/character/${character.id}`);
  });

  it("should handle favourite toggle correctly", () => {
    render(
      <MemoryRouter>
        <CharacterCard character={character} mutate={mockMutate} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByAltText("Add to favourites"));

    expect(mockHandleChangeFavourites).toHaveBeenCalledWith(
      { ...character, isFavourite: true },
      "add"
    );
    expect(mockMutate).toHaveBeenCalled();
  });

  it("should toggle heart icon on hover", () => {
    render(
      <MemoryRouter>
        <CharacterCard
          character={{ ...character, isFavourite: true }}
          mutate={mockMutate}
        />
      </MemoryRouter>
    );

    const button = screen.getByTestId("favButton");

    fireEvent.mouseEnter(button);
    expect(screen.getByAltText("Add to favourites")).toHaveAttribute(
      "src",
      heartWhite
    );

    fireEvent.mouseLeave(button);
    expect(screen.getByAltText("Add to favourites")).toHaveAttribute(
      "src",
      heartFill
    );
  });
});
