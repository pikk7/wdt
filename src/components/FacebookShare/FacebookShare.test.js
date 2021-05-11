import React from "react";
import { shallow } from "enzyme";
import FacebookShare from "./FacebookShare";

describe("FacebookShare", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<FacebookShare />);
    expect(wrapper).toMatchSnapshot();
  });
});
