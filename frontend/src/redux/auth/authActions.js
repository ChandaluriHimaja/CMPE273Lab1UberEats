import * as actions from "./authActionTypes";
import http from "../../services/httpService";
import jwtDecode from "jwt-decode";
import { apiUrl } from "../../config.json";
// import { getAllRestaurants } from "../../graphql/query";
// import { ApolloClient, InMemoryCache } from "@apollo/client";
// import { RestLink } from "apollo-link-rest";

// import { useQuery } from "@apollo/client";
// const restLink = new RestLink({ uri: "https://localhost:3900/graphql" });

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: restLink,
// });

const apiEndpoint = apiUrl + "/auth";

export const loginRequest = () => {
  return {
    type: actions.USER_LOGIN_REQUEST,
  };
};

export const loginSuccess = (jwt, auth) => {
  return {
    type: actions.USER_LOGIN_SUCCESS,
    payload: {
      jwt,
      auth,
    },
  };
};

export const loginFailure = (error) => {
  return {
    type: actions.USER_LOGIN_FAILURE,
    payload: {
      error,
    },
  };
};

export const logout = () => {
  return {
    type: actions.USER_LOGOUT,
  };
};

export const login = (email, password) => {
  console.log("in LOGIN AUTH ACTIONS");
  return async (dispatch) => {
    try {
      dispatch(loginRequest());
      console.log("Dispatched loginRequest");
      // client.query({ get }).then(response => {
      //   console.log(response.data.name);
      // });
      // console.log("GRAPHQL DATA: ", data);
      const response = await http.post(apiEndpoint, { email, password });
      console.log("User data: ", response.data);
      if (response && response.status === 200) {
        console.log("User data: ", response.data);
        const jwt = response.data;
        const auth = jwtDecode(jwt);
        http.setJwt(jwt);
        dispatch(loginSuccess(jwt, auth));
      }
    } catch (ex) {
      console.log("Graphql exception: ", ex);
      if (ex.response && ex.response.status === 400) {
        dispatch(loginFailure("Invalid Credentials"));
      }
    }
  };
};
