import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import GridContainer from "@/components/core/grid-container";

describe("GridContainer", () => {
  it("should render children correctly", () => {
    render(
      <GridContainer>
        <div data-testid="child">Child 1</div>
        <div data-testid="child">Child 2</div>
      </GridContainer>
    );

    const children = screen.getAllByTestId("child");
    expect(children.length).toBe(2);
    expect(children[0]).toHaveTextContent("Child 1");
    expect(children[1]).toHaveTextContent("Child 2");
  });

  it("should apply default grid styles", () => {
    render(
      <GridContainer>
        <div data-testid="child">Child</div>
      </GridContainer>
    );

    const container = screen.getByTestId("child").parentElement;
    expect(container).toHaveStyle({
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      columnGap: "16px",
      rowGap: "16px",
    });
  });
});
