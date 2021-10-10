import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "../components/login";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store";

test("renders Login", () => {
  render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
  const linkElement = screen.getByText(/Login/, { selector: "button" });
  expect(linkElement).toBeInTheDocument();
});
