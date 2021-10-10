import React from "react";
import { render, screen } from "@testing-library/react";
import CustomerDashboard from "../components/customerDashboard";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store";

test("renders Customer Dashboard", () => {
  render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <CustomerDashboard />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
  const linkElement = screen.getByText(/Filters/);
  expect(linkElement).toBeInTheDocument();
});
