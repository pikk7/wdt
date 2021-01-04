import React from "react";
import { shallow } from "enzyme";
import Reason from "./Reason";

describe("Reason", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Reason />);
    expect(wrapper).toMatchSnapshot();
  });
});
