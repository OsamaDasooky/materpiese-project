import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { useAuthUser } from "react-auth-kit";
import useValidation from "../hooks/useValidation";
import { useState } from "react";
import axios from "axios";
import { fetchUserProfile, saveData } from "../../redusers/UserData";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { useEffect } from "react";
const qs = require("qs");

function EditProfile() {
  const auth = useAuthUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData, isLoading } = useSelector((state) => state.userData);
  const [userInfo, setUserInfo] = useState({
    first_name: userData.firstName,
    last_name: userData.lastName,
    email: userData.userEmail,
    city: userData.city,
    gender: userData.gender,
    phone_number: userData.phoneNumber,
    birthday: userData.birthday,
    profile_photo: "",
  });
  const location = useLocation();
  const redirectPath = location.state?.from?.pathname || "/userProfile";

  useEffect(() => {
    if (userData.length === 0) {
      dispatch(fetchUserProfile(auth().token));
    }
  }, []);
  useEffect(() => {
    setUserInfo({
      first_name: userData.firstName,
      last_name: userData.lastName,
      email: userData.userEmail,
      city: userData.city,
      gender: userData.gender,
      phone_number: userData.phoneNumber,
      birthday: userData.birthday,
      profile_photo: "",
    });
  }, [userData]);

  useEffect(() => {
    if (
      userInfo.city === null ||
      userInfo.birthday === null ||
      userInfo.gender === null ||
      userInfo.phone_number === null
    ) {
      setError(true);
      console.log("error");
    } else setError(false);
  }, [userInfo]);
  const [error, setError] = useState(false);

  const config = {
    method: "put",
    url: "http://127.0.0.1:8000/api/profile/edit",
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${auth().token}`,
    },
    data: qs.stringify(userInfo),
  };
  const handleOnChange = (e) => {
    setUserInfo((pervs) => ({ ...pervs, [e.target.name]: e.target.value }));
  };

  const { isNotEmptyValidation, phoneValidation, message } = useValidation();

  const checkValidation = () => {
    let fname = isNotEmptyValidation("first_name", userInfo.first_name);
    let lname = isNotEmptyValidation("last_name", userInfo.last_name);
    let phoneNumber = phoneValidation(userInfo.phone_number);
    let city = isNotEmptyValidation("city", userInfo.city);
    let gender = isNotEmptyValidation("gender", userInfo.gender);
    let birthday = isNotEmptyValidation("birthday", userInfo.birthday);
    if (fname && lname && phoneNumber && city && gender && birthday && !error)
      return true;
    else return false;
  };

  const handleEdit = (e) => {
    e.preventDefault();
    if (checkValidation()) {
      axios(config)
        .then(function (res) {
          if (res.data.data) {
            dispatch(saveData(res.data.data.userInfo));
            return navigate(redirectPath);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  if (userData.length === 0) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <MDBSpinner role="status " style={{ width: "3rem", height: "3rem" }}>
          <span className="visually-hidden">Loading...</span>
        </MDBSpinner>
      </div>
    );
  }
  return (
    <>
      <MDBContainer
        fluid
        className="p-4 position-relative"
        style={{ backgroundColor: "#eee" }}
      >
        <MDBRow className="justify-content-around">
          <MDBCol md="5">
            <form onSubmit={handleEdit}>
              <MDBCard className="my-5">
                <MDBCardBody className="p-5">
                  <div className="text-center mb-4">
                    <h3>Edit Profile</h3>
                  </div>{" "}
                  {error ? (
                    <div
                      className="text-danger text-center p-2 mb-4 rounded-5 small"
                      style={{ backgroundColor: "#f9c7c4" }}
                    >
                      please complete your information
                    </div>
                  ) : (
                    ""
                  )}
                  <MDBRow className="d-flex justify-content-between">
                    <div className="col-6 ">
                      <p className="text-danger m-0 small">
                        {message.first_name}
                      </p>
                      <MDBInput
                        wrapperClass="mb-4"
                        label="First Name"
                        name="first_name"
                        onChange={handleOnChange}
                        value={userInfo.first_name}
                      />
                    </div>
                    <div className="col-6 ">
                      <p className="text-danger m-0 small">
                        {message.last_name}
                      </p>
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Last Name"
                        type="text"
                        name="last_name"
                        onChange={handleOnChange}
                        value={userInfo.last_name}
                      />
                    </div>
                    <div className="col-12 ">
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Email"
                        type="email"
                        name="email"
                        disabled
                        onChange={handleOnChange}
                        value={userInfo.email}
                      />
                      <div className="col-12">
                        <p className="text-danger m-0 small">{message.file}</p>
                        <MDBInput
                          wrapperClass="mb-4"
                          type="file"
                          name="profile_photo"
                          onChange={(e) => {
                            console.log(e.target.files[0].name.split(".")[1]);
                          }}
                        />
                      </div>
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
                        value={
                          userInfo.birthday === null ? "" : userInfo.birthday
                        }
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

                    <div className="col-6 ">
                      <p className="text-danger m-0 small">{message.city}</p>
                      <MDBInput
                        wrapperClass="mb-4"
                        label="City"
                        type="text"
                        name="city"
                        onChange={handleOnChange}
                        value={userInfo.city === null ? "" : userInfo.city}
                      />
                    </div>
                    <div className="col-6 ">
                      <p className="text-danger m-0 small">
                        {message.phone_number}
                      </p>
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Phone Number"
                        type="tel"
                        name="phone_number"
                        onChange={handleOnChange}
                        value={
                          userInfo.phone_number === null
                            ? ""
                            : userInfo.phone_number
                        }
                      />
                    </div>
                  </MDBRow>
                  <MDBBtn className="w-100 mb-2" size="md" color="dark">
                    save
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default EditProfile;
