import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import useSWR from "swr";
import { useGetCharacterInfo } from "@/hooks/api/use-get-character-info";
import { getCharacterById, getCharacterComics } from "@/api/services/marvel";
import { useAppContext } from "@/hooks/context/use-app-context";

vi.mock("swr");
vi.mock("@/api/services/marvel");
vi.mock("@/hooks/context/use-app-context");

describe("useGetCharacterInfo", () => {
  const mockFavouriteCharacters = [{ id: 1, name: "Spider-Man" }];
  const mockCharacter = { id: 1, name: "Spider-Man" };
  const mockComics = [{ id: 1, title: "Amazing Spider-Man #1" }];

  beforeEach(() => {
    vi.clearAllMocks();
    (useAppContext as Mock).mockReturnValue({
      favouriteCharacters: mockFavouriteCharacters,
    });
    (getCharacterById as Mock).mockResolvedValue([mockCharacter]);
    (getCharacterComics as Mock).mockResolvedValue(mockComics);
  });

  it("should fetch and return character info with favourite status", async () => {
    (useSWR as Mock).mockReturnValue({
      data: {
        character: [{ ...mockCharacter, isFavourite: true }],
        comics: mockComics,
      },
      error: null,
      mutate: vi.fn(),
    });

    const { result } = renderHook(() => useGetCharacterInfo(1));

    expect(result.current.character).toEqual({
      ...mockCharacter,
      isFavourite: true,
    });
    expect(result.current.comics).toEqual(mockComics);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it("should handle loading state correctly", async () => {
    (useSWR as Mock).mockReturnValue({
      data: null,
      error: null,
      mutate: vi.fn(),
    });

    const { result } = renderHook(() => useGetCharacterInfo(1));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
  });

  it("should handle error state correctly", async () => {
    (useSWR as Mock).mockReturnValue({
      data: null,
      error: new Error("Failed to fetch"),
      mutate: vi.fn(),
    });

    const { result } = renderHook(() => useGetCharacterInfo(1));

    expect(result.current.isError).toBe(true);
    expect(result.current.isLoading).toBe(false);
  });
});
