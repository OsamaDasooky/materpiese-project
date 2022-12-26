import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import logo from "../asset/BrandFiles/3rood-low-resolution-logo-color-on-transparent-background.png";
import { useAuthUser, useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ShopLogin() {
  const [credential, seCredential] = useState({ email: "", password: "" });
  const [message, setMessage] = useState({ clintError: "", serverError: "" });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const signIn = useSignIn();
  const navigate = useNavigate();
  const data = new FormData();
  const config = {
    method: "post",
    url: "http://127.0.0.1:8000/api/shopLogin",
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
    },
    data: data,
  };
  const handleChange = (e) => {
    seCredential({ ...credential, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);
    console.log(credential);
    setMessage({ clintError: "", serverError: "" });
    // check if email and pass in not empty
    if (credential.email == "" || credential.password == "") {
      setError(true);
      setMessage({
        serverError: "",
        clintError: "please inter your email and password",
      });
    } else {
      setLoading(true);
      // append email and pass with request
      data.append("email", credential.email);
      data.append("password", credential.password);
      axios(config)
        .then(function (res) {
          console.log(res.data);
          if (
            signIn({
              token: res.data.data.token,
              expiresIn: 1000,
              tokenType: "Bearer",
              authState: {
                shop: res.data.data.shop,
                token: res.data.data.token,
                role: "shop",
              },
            })
          ) {
            return navigate("/shopOwner");
          }
          setLoading(false);
        })
        .catch(function (error) {
          setError(true);
          setMessage({
            clintError: "",
            serverError: error.response.data.message,
          });
          console.log(error);
          setLoading(false);
        });
    }
  };
  return (
    <>
      <MDBContainer
        fluid
        className="p-4 position-relative"
        style={{
          backgroundImage:
            'URL("https://miro.medium.com/max/1000/0*sWMRrKgLhSoB5IRw.")',
          backgroundSize: "cover",
        }}
      >
        {" "}
        <div class="overlay">
          <div
            className="position-absolute "
            style={{
              backgroundColor: "#00000069",

              height: "100%",
              width: "100%",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          ></div>
        </div>
        <MDBRow className="justify-content-evenly">
          <MDBCol md="5">
            <MDBCard className="my-5">
              <MDBCardBody className="p-5">
                <div className="text-center mb-3">
                  <img src={logo} height="60" alt="" loading="lazy" />
                  <h5 className="mt-4 m-0">Shop Login </h5>
                </div>
                {error ? (
                  <div
                    className="text-danger text-center p-2 mb-2 rounded-5 small"
                    style={{ backgroundColor: "#f9c7c4" }}
                  >
                    {message.clintError}
                    {message.serverError}
                  </div>
                ) : (
                  ""
                )}
                <MDBInput
                  wrapperClass="mb-4"
                  label="Email"
                  type="email"
                  name="email"
                  onChange={handleChange}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                />

                {!loading ? (
                  <MDBBtn
                    className="w-100 mb-2"
                    size="md"
                    color="dark"
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
                  >
                    Login
                  </MDBBtn>
                ) : (
                  <MDBBtn
                    className="w-100 mb-2"
                    size="md"
                    color="dark"
                    disabled
                  >
                    <span
                      class="spinner-border spinner-border-sm text-light"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Loading...
                  </MDBBtn>
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default ShopLogin;
