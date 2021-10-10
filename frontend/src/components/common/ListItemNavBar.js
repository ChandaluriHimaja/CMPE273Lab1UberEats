import React from "react";
import { NavLink } from "react-router-dom";

class ListItemNavBar extends React.Component {
  render() {
    let { iconClass, label, path } = this.props;
    console.log("PATH: ", path);
    iconClass = iconClass + " fa-navbar-icons";

    return (
      <React.Fragment>
        <i className={iconClass} aria-hidden="true"></i>

        <NavLink
          className="nav-link"
          style={{
            marginTop: "2px",
            float: "right",
            padding: "0px",
            fontFamily: "sans-serif",
            letterSpacing: "1px",
            color: "black",
          }}
          to={path}
        >
          {label}
        </NavLink>
      </React.Fragment>
    );
  }
}

export default ListItemNavBar;
