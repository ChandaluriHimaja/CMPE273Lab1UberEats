import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../components/home";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store";

test("renders Home", () => {
  render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <Home />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
  const linkElement = screen.getByText(/Customer SignUp/);
  expect(linkElement).toBeInTheDocument();
});
