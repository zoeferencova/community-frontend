import React from "react";
import { render } from "enzyme";
import HomePage from "./HomePage";
import { BrowserRouter } from "react-router-dom";
import CommUnityContext from "../../contexts/context";

import mockContext from "../../contexts/mock-context";

describe("HomePage", () => {
    it("renders HomePage component given mock context data", () => {
        const wrapper = render(
            <CommUnityContext.Provider value={mockContext}>
                <BrowserRouter>
                    <HomePage />
                </BrowserRouter>
            </CommUnityContext.Provider>
        );
        
        expect(wrapper).toMatchSnapshot();
    });
});