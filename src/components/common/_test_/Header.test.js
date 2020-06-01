import React from "react";
import { render, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import Header from "../Header";

afterEach(cleanup);

describe("Header Test", () => {
  it("Renders Correctly", () => {
    const div = document.createElement("div");
    render(<Header />, div);
  });

  it("Matches Snapshot", () => {
    const headerSnapshot = renderer.create(<Header />).toJSON();
    expect(headerSnapshot).toMatchSnapshot();
  });
});
