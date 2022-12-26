import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import logo from "../asset/BrandFiles/3rood-low-resolution-logo-color-on-transparent-background.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import useValidation from "../hooks/useValidation";
import axios from "axios";
import { useSignIn } from "react-auth-kit";
import RegisterGoogle from "../Google/RegisterGoogle";
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../fierbase";

function Register() {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
    password: "",
    password_confirmation: "",
    email: "",
    city: "",
    gender: "",
    phone_number: "",
    birthday: "",
    profile_photo: "",
  });
  const {
    NameValidation,
    emailValidation,
    passwordValidation,
    isNotEmptyValidation,
    phoneValidation,
    message,
    setMessage,
  } = useValidation();
  const location = useLocation();
  const redirectPath = location.state?.from?.pathname || "/userProfile";
  const config = {
    method: "post",
    url: "http://127.0.0.1:8000/api/userRegister",
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
    },
    data: userInfo,
  };
  const checkValidation = () => {
    let fName = NameValidation("first_name", userInfo.first_name);
    let lName = NameValidation("last_name", userInfo.last_name);
    let email = emailValidation(userInfo.email);
    let pass = passwordValidation(
      userInfo.password,
      userInfo.password_confirmation
    );
    let phone = phoneValidation(userInfo.phone_number);
    let city = isNotEmptyValidation("city", userInfo.city);
    let gender = isNotEmptyValidation("gender", userInfo.gender);
    let birthday = isNotEmptyValidation("birthday", userInfo.birthday);
    let profile = isNotEmptyValidation("profilePhoto", userInfo.birthday);
    if (
      fName &&
      lName &&
      email &&
      pass &&
      phone &&
      city &&
      gender &&
      birthday &&
      profile
    ) {
      return true;
    } else return false;
  };

  const handleOnChange = (e) => {
    setUserInfo((pervs) => ({ ...pervs, [e.target.name]: e.target.value }));
  };
  const handleRegister = (e) => {
    e.preventDefault();

    if (checkValidation()) {
      axios(config)
        .then(function (res) {
          console.log(res.data);
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
        .catch(function (error) {
          console.log(error);
          setError(true);
          setMessage({ ...message, serverError: error.response.data.message });
        });
    }
  };
  const uploadImage = (image) => {
    if (image == null) return false;
    const imageRef = ref(storage, `userImage/${image.name + v4()}`);
    const response = uploadBytes(imageRef, image).then((res) => {
      console.log(res);
      getDownloadURL(res.ref).then((response) => {
        setUserInfo((pervs) => ({ ...pervs, profile_photo: response }));
      });
    });
    return response;
  };

  return (
    <>
      <MDBContainer
        fluid
        className="p-4 position-relative"
        style={{
          backgroundImage:
            'URL("https://torange.biz/photofxnew/196/HD/best-background-template-discount-offer-sale-196639.jpg")',
          backgroundSize: "cover",
        }}
      >
        {" "}
        <div className="overlay">
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
        <MDBRow className="justify-content-around">
          <MDBCol
            md="6"
            className="text-center text-md-start d-flex flex-column justify-content-center"
          >
            <div
              style={{ backgroundColor: "#0000008f", zIndex: 1 }}
              className="rounded-5 text-center"
            >
              <h1 className="my-5 display-3 fw-bold ls-tight px-3 text-light">
                The best offer for you
              </h1>
              <h3 className="text-light ">
                Join Us and Enjoy with a lot of offers
              </h3>
            </div>
          </MDBCol>
          <MDBCol md="5">
            <form
              onSubmit={(e) => {
                handleRegister(e);
              }}
            >
              <MDBCard className="my-5">
                <MDBCardBody className="p-5">
                  <div className="text-center mb-5">
                    <img src={logo} height="60" alt="" loading="lazy" />
                  </div>
                  <MDBRow className="d-flex justify-content-between">
                    {error ? (
                      <div
                        className="text-danger text-center p-2 mb-2 rounded-5 small"
                        style={{ backgroundColor: "#f9c7c4" }}
                      >
                        {message.serverError}
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="col-6 ">
                      <p className="text-danger m-0 small">
                        {message.first_name}
                      </p>
                      <MDBInput
                        wrapperClass="mb-4"
                        label="First Name"
                        name="first_name"
                        id="form1"
                        type="text"
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className="col-6 ">
                      <p className="text-danger m-0 small">
                        {message.last_name}
                      </p>

                      <MDBInput
                        wrapperClass="mb-4"
                        label="Last Name"
                        name="last_name"
                        id="form2"
                        type="text"
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className="col-12 ">
                      <p className="text-danger m-0 small">{message.email}</p>

                      <MDBInput
                        wrapperClass="mb-4"
                        label="Email"
                        type="email"
                        name="email"
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className="col-6 ">
                      <p className="text-danger m-0 small">
                        {message.birthday}
                      </p>

                      <MDBInput
                        wrapperClass="mb-4"
                        label="birthday"
                        type="date"
                        name="birthday"
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className="col-6 ">
                      <p className="text-danger m-0 small">{message.gender}</p>

                      <select
                        name="gender"
                        className="form-select"
                        onChange={handleOnChange}
                      >
                        <option value="">gender</option>
                        <option value="male">male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    <p className="text-danger m-0 small">{message.password}</p>
                    <div className="col-6 ">
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Password"
                        type="password"
                        name="password"
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className="col-6 ">
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Confirm Password"
                        type="password"
                        name="password_confirmation"
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className="col-6 ">
                      <p className="text-danger m-0 small">{message.city}</p>

                      <MDBInput
                        wrapperClass="mb-4"
                        label="City"
                        type="text"
                        name="city"
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className="col-6 ">
                      <p className="text-danger m-0 small ">
                        {message.phone_number}
                      </p>

                      <MDBInput
                        wrapperClass="mb-4"
                        label="Phone Number"
                        type="tel"
                        name="phone_number"
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <div className="col-4">
                        <img src={userInfo.profile_photo} alt="" width={150} />
                      </div>
                      <div className="col-8">
                        <span>Product photo</span>
                        <p className="text-danger m-0 small">
                          {message?.profilePhoto}
                        </p>
                        <MDBInput
                          wrapperClass="mb-4"
                          type="file"
                          name="product_image"
                          onChange={(e) => {
                            uploadImage(e.target.files[0]);
                          }}
                        />
                      </div>
                    </div>
                  </MDBRow>

                  <MDBBtn className="w-100 mb-2" size="md" color="dark">
                    sign up
                  </MDBBtn>

                  <p className="text-center mb-1">or </p>

                  <RegisterGoogle setError={setError} setMessage={setMessage} />
                  <div className="text-center mt-4">
                    do you have account ?<Link to="/login">Login</Link>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default Register;
