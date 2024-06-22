import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import useSWR from "swr";

import { useGetCharacters } from "@/hooks/api/use-get-characters";
import { getCharacters } from "@/api/services/marvel";
import { useAppContext } from "@/hooks/context/use-app-context";

vi.mock("swr");
vi.mock("@/api/services/marvel");
vi.mock("@/hooks/context/use-app-context");

describe("useGetCharacters", () => {
  const mockFavouriteCharacters = [{ id: 1, name: "Spider-Man" }];
  const mockCharacters = [
    { id: 1, name: "Spider-Man" },
    { id: 2, name: "Iron Man" },
  ];
  const mockGetCharacters = {
    characters: mockCharacters,
    count: 2,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useAppContext as Mock).mockReturnValue({
      favouriteCharacters: mockFavouriteCharacters,
    });
    (getCharacters as Mock).mockResolvedValue(mockGetCharacters);
  });

  it("should fetch and return characters with favourite information", async () => {
    (useSWR as Mock).mockReturnValue({
      data: {
        charactersWithFavourites: mockCharacters.map((character) => ({
          ...character,
          isFavourite: mockFavouriteCharacters.some(
            (c) => c.id === character.id
          ),
        })),
        count: 2,
      },
      isLoading: false,
      error: null,
      mutate: vi.fn(),
    });

    const { result } = renderHook(() => useGetCharacters("Spider"));

    expect(result.current.characters).toEqual([
      { id: 1, name: "Spider-Man", isFavourite: true },
      { id: 2, name: "Iron Man", isFavourite: false },
    ]);
    expect(result.current.count).toBe(2);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it("should handle loading state correctly", async () => {
    (useSWR as Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
      mutate: vi.fn(),
    });

    const { result } = renderHook(() => useGetCharacters("Spider"));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
  });

  it("should handle error state correctly", async () => {
    (useSWR as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error("Failed to fetch"),
      mutate: vi.fn(),
    });

    const { result } = renderHook(() => useGetCharacters("Spider"));

    expect(result.current.isError).toBe(true);
    expect(result.current.isLoading).toBe(false);
  });
});
