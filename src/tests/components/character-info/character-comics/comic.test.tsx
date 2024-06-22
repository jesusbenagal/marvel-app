import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import Comic from "@/components/character-info/character-comics/comic";

describe("Comic", () => {
  const comicProps = {
    title: "Amazing Spider-Man",
    date: "2021-10-10",
    image: "path/to/comic.jpg",
  };

  it("should render comic details correctly", () => {
    render(<Comic {...comicProps} />);

    expect(screen.getByAltText("comic")).toBeInTheDocument();
    expect(screen.getByText("Amazing Spider-Man")).toBeInTheDocument();
    expect(screen.getByText("2021")).toBeInTheDocument();
  });

  it('should show "Unknown" for invalid date', () => {
    const comicPropsWithInvalidDate = { ...comicProps, date: "invalid-date" };
    render(<Comic {...comicPropsWithInvalidDate} />);

    expect(screen.getByText("Unknown")).toBeInTheDocument();
  });

  it("should apply correct styles to elements", () => {
    render(<Comic {...comicProps} />);

    const imageElement = screen.getByAltText("comic");
    const titleElement = screen.getByText("Amazing Spider-Man");
    const yearElement = screen.getByText("2021");

    expect(imageElement).toHaveStyle({
      width: "200px",
      height: "250px",
    });

    expect(titleElement).toHaveStyle({
      width: "200px",
      wordWrap: "break-word",
      overflowWrap: "break-word",
      whiteSpace: "normal",
      fontSize: "1rem",
      fontWeight: "bold",
    });

    expect(yearElement).toHaveStyle({
      fontSize: "0.8rem",
      color: "#777",
    });
  });
});
