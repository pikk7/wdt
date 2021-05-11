import React from "react";
import { shallow } from "enzyme";
import AddDrink from "./AddDrink";

describe("AddDrink", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<AddDrink />);
    expect(wrapper).toMatchSnapshot();
  });
});
