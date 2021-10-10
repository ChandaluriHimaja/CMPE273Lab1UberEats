const axios = require("axios");

const assert = require("assert");

const apiUrl = "http://localhost:3900/api";

const restaurantJwt = "";
const customerJwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjIyLCJlbWFpbCI6InN1amFAbi5jb20iLCJpc1Jlc3RhdXJhbnQiOjAsImlhdCI6MTYzMzgxNjc3NX0.qQc_183EpxMZ4IIBQgeDNHEkN56PGxOukvAHQdcyzCw";

// axios.defaults.headers.common["x-auth-token"] = jwt;

describe("POST - get token during login (customer/restaurant)", () => {
  it("/auth", (done) => {
    axios
      .post(apiUrl + "/auth", { email: "suja@n.com", password: "123456" })
      .then((response) => {
        console.log(response.data);
        assert.equal(response.status, 200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET - get customer details by authID", () => {
  axios.defaults.headers.common["x-auth-token"] = customerJwt;
  it("/:id", (done) => {
    axios
      .get(apiUrl + "/customer/22")
      .then((response) => {
        console.log(response.data);
        assert.equal(response.status, 200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET - customer delivery addresses by custID", () => {
  axios.defaults.headers.common["x-auth-token"] = customerJwt;
  it("/deliveryAddresses/:id", (done) => {
    axios
      .get(apiUrl + "/deliveryAddresses/8")
      .then((response) => {
        console.log(response.data);
        assert.equal(response.status, 200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET - dish details by dishID", () => {
  it("/dish/:id", (done) => {
    axios
      .get(apiUrl + "/dish/1")
      .then((response) => {
        console.log(response.data);
        assert.equal(response.status, 200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST - toggle customer favorite option", () => {
  it("/like", (done) => {
    axios
      .post(apiUrl + "/like", { _custId: 8, _restaurantId: 4 })
      .then((response) => {
        console.log(response.data);
        assert.equal(response.status, 200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
