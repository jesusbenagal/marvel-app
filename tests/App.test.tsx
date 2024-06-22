import { beforeEach, describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import App from "../src/App";

describe("prueba", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("should render App component", () => {
    const searchInput = screen.getByPlaceholderText("Search a character...");

    expect(searchInput).toBeInTheDocument();
  });
});
