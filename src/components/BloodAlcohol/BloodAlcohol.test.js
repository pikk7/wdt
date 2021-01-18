import React from "react";
import { shallow } from "enzyme";
import BloodAlcohol from "./BloodAlcohol";

describe("BloodAlcohol", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<BloodAlcohol />);
    expect(wrapper).toMatchSnapshot();
  });
});
