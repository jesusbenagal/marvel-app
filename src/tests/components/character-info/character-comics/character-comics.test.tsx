import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, Mock, beforeEach } from "vitest";

import CharacterComics from "@/components/character-info/character-comics";
import { useAppContext } from "@/hooks/context/use-app-context";

vi.mock("@/hooks/context/use-app-context", () => ({
  useAppContext: vi.fn(),
}));

vi.mock("./Comic", () => ({
  __esModule: true,
  default: ({
    title,
    date,
    image,
  }: {
    title: string;
    date: string;
    image: string;
  }) => (
    <div>
      <img src={image} alt="comic" />
      <p>{title}</p>
      <span>{date}</span>
    </div>
  ),
}));

describe("CharacterComics", () => {
  const comics = [
    {
      id: 1,
      title: "Amazing Spider-Man #1",
      description: "Comic description",
      dates: [{ type: "onsaleDate", date: "2021-10-10" }],
      thumbnail: { path: "path/to/comic1", extension: "jpg" },
    },
    {
      id: 2,
      title: "Amazing Spider-Man #2",
      description: "Comic description",
      dates: [{ type: "onsaleDate", date: "2021-11-11" }],
      thumbnail: { path: "path/to/comic2", extension: "jpg" },
    },
  ];

  beforeEach(() => {
    (useAppContext as Mock).mockReturnValue({
      mqDetector: false,
    });
  });

  it("should render the comics section title correctly", () => {
    render(<CharacterComics comics={comics} />);

    expect(screen.getByText("Comics")).toBeInTheDocument();
  });

  it("should render a list of comics", () => {
    render(<CharacterComics comics={comics} />);

    expect(screen.getByText("Amazing Spider-Man #1")).toBeInTheDocument();
    expect(screen.getByText("Amazing Spider-Man #2")).toBeInTheDocument();
  });
});
