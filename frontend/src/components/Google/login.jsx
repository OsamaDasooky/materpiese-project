import { React, useEffect, useState } from "react";
import { gapi } from "gapi-script";
import { useLocation, useNavigate } from "react-router";
import { GoogleLogin } from "react-google-login";

import { refreshTokenSetup } from "./refreshToken";
import axios from "axios";
import { useSignIn } from "react-auth-kit";

const clientId =
  "653384430282-jvi1sj56j6954ojmhvhlpa0lhn2sn9hq.apps.googleusercontent.com";

function LoginGoogle({ setMessage, setError }) {
  const navigate = useNavigate();
  const signIn = useSignIn();
  const location = useLocation();
  const redirectPath = location.state?.from?.pathname || "/userProfile";

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  // check if the email exists first and logiin if ture  retiger if false
  // check if the email exists first and logiin if ture  retiger if false
  const onSuccess = (res) => {
    const data = {
      email: res.profileObj.email,
      google_id: res.profileObj.googleId,
    };
    const config = {
      method: "post",
      url: "http://localhost:8000/api/userLoginGoogle",
      headers: {
        Accept: "application/vnd.api+json",
      },
      data: data,
    };
    console.log(data);
    console.log(res.profileObj);

    axios(config)
      .then((res) => {
        console.log(res);
        if (
          signIn({
            token: res.data.token,
            expiresIn: 1000,
            tokenType: "Bearer",
            authState: {
              user: res.data.data.user,
              token: res.data.data.token,
              role: res.data.data.user.role,
            },
          })
        ) {
          return navigate(redirectPath);
        }
      })
      .catch((error) => {
        setError(true);
        setMessage({
          serverError: "",
          clintError: error.response.data.message,
        });
        console.log(error);
      });
  };

  const onFailure = (res) => {};

  return (
    <div className="d-flex flex-wrap mt-3 p-">
      <GoogleLogin
        className="d-flex justify-content-center text-dark rounded-4 w-100 dark"
        // bg-dark text-light style if we want it to be dark
        clientId={clientId}
        buttonText="Login with google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}

export default LoginGoogle;
