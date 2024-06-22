import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import AppLayout from "@/layout/app-layout";

vi.mock("@/components/core", () => ({
  Header: () => <div data-testid="header">Header</div>,
}));

describe("AppLayout", () => {
  it("should render Header component", () => {
    render(
      <AppLayout>
        <div>Child Content</div>
      </AppLayout>
    );

    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  it("should render children content correctly", () => {
    render(
      <AppLayout>
        <div data-testid="child-content">Child Content</div>
      </AppLayout>
    );

    expect(screen.getByTestId("child-content")).toBeInTheDocument();
    expect(screen.getByTestId("child-content")).toHaveTextContent(
      "Child Content"
    );
  });

  it("should render main element correctly", () => {
    render(
      <AppLayout>
        <div>Child Content</div>
      </AppLayout>
    );

    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
