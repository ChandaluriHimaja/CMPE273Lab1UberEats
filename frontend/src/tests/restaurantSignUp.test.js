import React from "react";
import { render, screen } from "@testing-library/react";
import RestaurantSignUp from "../components/restaurantSignUp";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store";

test("renders Restaurant SignUp", () => {
  render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <RestaurantSignUp />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
  const linkElement = screen.getByText(/Sign Up/, { selector: "button" });
  expect(linkElement).toBeInTheDocument();
});
