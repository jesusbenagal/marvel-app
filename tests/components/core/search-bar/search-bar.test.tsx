import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import SearchBar from "@/components/core/search-bar";

describe("SearchBar", () => {
  const mockSetSearchValue = vi.fn();
  const mockSetIsFavouriteFilter = vi.fn();

  const defaultProps = {
    count: 10,
    isLoading: false,
    setSearchValue: mockSetSearchValue,
    isFavouriteFilter: false,
    setIsFavouriteFilter: mockSetIsFavouriteFilter,
    totalFavourites: 5,
  };

  it("should render search input and icon correctly", () => {
    render(<SearchBar {...defaultProps} />);

    expect(
      screen.getByPlaceholderText("Search a character...")
    ).toBeInTheDocument();
    expect(screen.getByAltText("Search Icon")).toBeInTheDocument();
  });

  it("should display the correct count of results", () => {
    render(<SearchBar {...defaultProps} />);

    expect(screen.getByText("10 results")).toBeInTheDocument();
  });

  it('should display "Loading Results" when isLoading is true', () => {
    render(<SearchBar {...defaultProps} isLoading={true} />);

    expect(screen.getByText("Loading Results")).toBeInTheDocument();
  });

  it("should display the correct count of favourite results when isFavouriteFilter is true", () => {
    render(<SearchBar {...defaultProps} isFavouriteFilter={true} />);

    expect(screen.getByText("5 results")).toBeInTheDocument();
  });

  it("should call setSearchValue and reset isFavouriteFilter when Enter key is pressed", () => {
    render(<SearchBar {...defaultProps} isFavouriteFilter={true} />);

    const input = screen.getByPlaceholderText("Search a character...");

    fireEvent.change(input, { target: { value: "Spider-Man" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(mockSetSearchValue).toHaveBeenCalledWith("Spider-Man");
    expect(mockSetIsFavouriteFilter).toHaveBeenCalledWith(false);
  });

  it("should update input value on change", () => {
    render(<SearchBar {...defaultProps} />);

    const input = screen.getByPlaceholderText("Search a character...");
    fireEvent.change(input, { target: { value: "Iron Man" } });

    expect(input).toHaveValue("Iron Man");
  });
});
