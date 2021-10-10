import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Home extends React.Component {
  render() {
    const jwt = this.props.jwt;
    const user = this.props.auth;
    console.log("Got user data again in HOME: ", user);

    if (!jwt) {
      return (
        <div
          style={{
            marginLeft: "-300px",
            backgroundImage: `url("https://eng.uber.com/wp-content/uploads/2017/03/UberEatsheader_.jpg")`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundColor: "#765E51",
            backgroundSize: "contain",
          }}
        >
          <div
            style={{
              paddingLeft: "150px",
              paddingTop: "600px",
              paddingBottom: "200px",
            }}
          >
            <Link className="btn btn-light" to={"/customerSignup"}>
              Customer SignUp
            </Link>
            <Link
              className="btn btn-light"
              style={{ marginLeft: "50px" }}
              to={"/restaurantSignup"}
            >
              Restaurant SignUp
            </Link>
          </div>
        </div>
      );
    } else {
      if (user.isRestaurant) {
        return (
          <Redirect
            to={{
              pathname: "/restaurantDashboard",
            }}
          ></Redirect>
        );
      } else {
        return (
          <Redirect
            to={{
              pathname: "/myDashboard",
            }}
          ></Redirect>
        );
      }
    }
  }
}

const mapStoreToProps = (state) => {
  return {
    auth: state.auth.auth,
    jwt: state.auth.jwt,
  };
};

export default connect(mapStoreToProps)(Home);
