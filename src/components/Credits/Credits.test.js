import React from "react";
import { shallow } from "enzyme";
import Credits from "./Credits";

describe("Credits", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Credits />);
    expect(wrapper).toMatchSnapshot();
  });
});
