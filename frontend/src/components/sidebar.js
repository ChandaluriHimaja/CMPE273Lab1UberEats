import React from "react";
import { useSelector } from "react-redux";
import ListItemSideBar from "./common/ListItemSideBar";

const SideBar = () => {
  const jwt = useSelector((state) => state.auth.jwt);
  const user = useSelector((state) => state.auth.auth);
  console.log("In sidebar ----------------------- ", user);
  return (
    <div>
      {jwt && (
        <nav
          className="col-md-2 d-none d-md-block bg-light sidebar"
          style={{ marginTop: "50px", paddingTop: "25px" }}
        >
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              {user.isRestaurant ? (
                <React.Fragment>
                  <ListItemSideBar
                    iconClass="fa fa-dashboard"
                    label="Dashboard"
                    path="/restaurantDashboard"
                  ></ListItemSideBar>
                  <ListItemSideBar
                    iconClass="fa fa-bookmark"
                    label="Orders"
                    path="/orders"
                  ></ListItemSideBar>
                  <ListItemSideBar
                    iconClass="fa fa-bookmark"
                    label="Dishes"
                    path="/restaurantDishes"
                  ></ListItemSideBar>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <ListItemSideBar
                    iconClass="fa fa-credit-card"
                    label="Dashboard"
                    path="/myDashboard"
                  ></ListItemSideBar>
                  <ListItemSideBar
                    iconClass="fa fa-credit-card"
                    label="Profile"
                    path="/myProfile"
                  ></ListItemSideBar>
                  <ListItemSideBar
                    iconClass="fa fa-credit-card"
                    label="My Favourites"
                    path="/myFavourites"
                  ></ListItemSideBar>
                  <ListItemSideBar
                    iconClass="fa fa-credit-card"
                    label="Orders"
                    path="/myOrders"
                  ></ListItemSideBar>
                </React.Fragment>
              )}
            </ul>
          </div>
        </nav>
      )}
    </div>
  );
};

export default SideBar;
