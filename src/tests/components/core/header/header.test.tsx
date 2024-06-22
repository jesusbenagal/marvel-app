import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { MemoryRouter, useLocation, useNavigate } from "react-router-dom";

import Header from "@/components/core/header";
import { useAppContext } from "@/hooks/context/use-app-context";
import { appRoutes } from "@/constants/app-routes";

vi.mock("@/hooks/context/use-app-context", () => ({
  useAppContext: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: vi.fn(),
  useLocation: vi.fn(),
  MemoryRouter: ({ children }: { children: React.ReactNode }) => children,
}));

describe("Header", () => {
  const mockNavigate = vi.fn();
  const mockSetIsFavouriteFilter = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    (useAppContext as Mock).mockReturnValue({
      totalFavourites: 5,
      setIsFavouriteFilter: mockSetIsFavouriteFilter,
    });
    (useNavigate as Mock).mockReturnValue(mockNavigate);
    (useLocation as Mock).mockReturnValue({ pathname: "/some-path" });
  });

  it("should render the logo and favourites icon correctly", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByAltText("logo")).toBeInTheDocument();
    expect(screen.getByAltText("heart-fill")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("should navigate to home and reset favourite filter when logo is clicked", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByAltText("logo"));

    expect(mockNavigate).toHaveBeenCalledWith(appRoutes.HOME);
    expect(mockSetIsFavouriteFilter).toHaveBeenCalledWith(false);
  });

  it("should set favourite filter and navigate to home when favourites icon is clicked", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByAltText("heart-fill"));

    expect(mockSetIsFavouriteFilter).toHaveBeenCalledWith(true);
    expect(mockNavigate).toHaveBeenCalledWith(appRoutes.HOME);
  });
});
