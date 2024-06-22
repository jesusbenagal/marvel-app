import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, Mock, beforeEach } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import CharacterView from "@/views/character-view";
import { useGetCharacterInfo } from "@/hooks/api/use-get-character-info";

import type { ICharacter, IComic } from "@/interfaces/api";

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useParams: () => ({ id: "1" }),
  MemoryRouter: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Route: ({ element }: { element: React.ReactNode }) => <div>{element}</div>,
  Routes: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock("@/hooks/api/use-get-character-info", () => ({
  useGetCharacterInfo: vi.fn(),
}));

vi.mock("@/components/character-info", () => ({
  CharacterHeader: ({ character }: { character: ICharacter }) => (
    <div>{character.name}</div>
  ),
  CharacterComics: ({ comics }: { comics: IComic[] }) => (
    <div>
      {comics.map((comic) => (
        <div key={comic.id}>{comic.title}</div>
      ))}
    </div>
  ),
}));

describe("CharacterView", () => {
  const defaultCharacterData = {
    character: { id: 1, name: "Spider-Man" },
    comics: [{ id: 1, title: "Amazing Spider-Man #1" }],
    isLoading: false,
    isError: false,
    mutate: vi.fn(),
  };

  beforeEach(() => {
    vi.resetAllMocks();
    (useGetCharacterInfo as Mock).mockReturnValue(defaultCharacterData);
  });

  it("should render character header and comics correctly", () => {
    render(
      <MemoryRouter initialEntries={["/character/1"]}>
        <Routes>
          <Route path="/character/:id" element={<CharacterView />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Spider-Man")).toBeInTheDocument();
    expect(screen.getByText("Amazing Spider-Man #1")).toBeInTheDocument();
  });

  it("should display loading spinner when loading", () => {
    (useGetCharacterInfo as Mock).mockReturnValue({
      ...defaultCharacterData,
      isLoading: true,
    });

    render(
      <MemoryRouter initialEntries={["/character/1"]}>
        <Routes>
          <Route path="/character/:id" element={<CharacterView />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("should display error message when there is an error", () => {
    (useGetCharacterInfo as Mock).mockReturnValue({
      ...defaultCharacterData,
      isError: true,
    });

    render(
      <MemoryRouter initialEntries={["/character/1"]}>
        <Routes>
          <Route path="/character/:id" element={<CharacterView />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Error")).toBeInTheDocument();
  });

  it("should display loading spinner if character is not loaded", () => {
    (useGetCharacterInfo as Mock).mockReturnValue({
      ...defaultCharacterData,
      character: null,
      isLoading: true,
    });

    render(
      <MemoryRouter initialEntries={["/character/1"]}>
        <Routes>
          <Route path="/character/:id" element={<CharacterView />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });
});
