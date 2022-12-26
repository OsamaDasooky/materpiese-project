import React, { useEffect, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useValidation from "../hooks/useValidation";
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../fierbase";
import { useSignIn } from "react-auth-kit";

function JoinUs() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);

  const [shopRegister, setShopRegister] = useState({
    shop_name: "",
    city: "",
    email: "",
    password: "",
    password_confirmation: "",
    address: "",
    category_id: "",
    profile_photo: "",
    close_time: "",
    open_time: "",
    phone_number: "",
    wallet_account: "",
  });
  const {
    emailValidation,
    passwordValidation,
    isNotEmptyValidation,
    phoneValidation,
    message,
    setMessage,
  } = useValidation();
  const signIn = useSignIn();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/allCategory")
      .then((res) => setCategories(res.data.data))
      .catch((err) => console.log(err));
  }, []);
  const handleOnChange = (e) => {
    setShopRegister((pervs) => ({ ...pervs, [e.target.name]: e.target.value }));
  };
  const checkValidation = () => {
    let name = isNotEmptyValidation("shop_name", shopRegister.shop_name);
    let email = emailValidation(shopRegister.email);
    let pass = passwordValidation(
      shopRegister.password,
      shopRegister.password_confirmation
    );
    let phoneN = phoneValidation(shopRegister.phone_number);
    let phoneW = phoneValidation(shopRegister.wallet_account, "wallet_account");
    let city = isNotEmptyValidation("city", shopRegister.city);
    let category = isNotEmptyValidation("category", shopRegister.city);
    let address = isNotEmptyValidation("address", shopRegister.address);
    let profilePhoto = isNotEmptyValidation(
      "profile_photo",
      shopRegister.profile_photo
    );
    let CTime = isNotEmptyValidation("close_time", shopRegister.close_time);
    let OTime = isNotEmptyValidation("open_time", shopRegister.open_time);
    if (
      name &&
      email &&
      pass &&
      phoneN &&
      city &&
      address &&
      profilePhoto &&
      CTime &&
      OTime &&
      category &&
      phoneW
    ) {
      return true;
    } else return false;
  };
  const handleRegisterShop = () => {
    console.log(message);
    console.log(shopRegister);
    if (checkValidation()) {
      console.log("oooky");
      const config = {
        method: "post",
        url: "http://127.0.0.1:8000/api/shopRegister",
        headers: {
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
        },
        data: shopRegister,
      };
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
            setError(false);
            return navigate("/shopOwner");
          }
        })
        .catch(function (error) {
          setMessage({
            ...message,
            serverError: error.response.data.message,
          });
          setError(true);
          console.log(error);
        });
    }
  };

  const uploadImage = (image) => {
    if (image == null) return false;
    const imageRef = ref(storage, `userImage/${image.name + v4()}`);
    const response = uploadBytes(imageRef, image).then((res) => {
      console.log(res);
      getDownloadURL(res.ref).then((response) => {
        setShopRegister((pervs) => ({ ...pervs, profile_photo: response }));
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
            'URL("https://cdn.searchenginejournal.com/wp-content/uploads/2022/06/small-business-searches-62bd9fe5c4d5d-sej-1520x800.png")',
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
        <MDBRow className="justify-content-between">
          <MDBCol
            md="5"
            className="text-center text-md-start d-flex flex-column justify-content-center"
          >
            <h2 className="text-white text-center" style={{ zIndex: 1 }}>
              You don’t need to have a 100 person company to develop that idea.{" "}
              <br />
              you need <b style={{ color: "#ed2647" }}>3rood</b>
            </h2>
          </MDBCol>
          <MDBCol md="5">
            <form>
              <MDBCard className="my-5">
                <MDBCardBody className="p-5">
                  <div className="text-center mb-5">
                    <img src={logo} height="40" alt="" loading="lazy" />
                  </div>
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
                  <MDBRow className="d-flex justify-content-between">
                    <div className="col-6 ">
                      <p className="text-danger m-0 small">
                        {message.shop_name}
                      </p>

                      <MDBInput
                        wrapperClass="mb-4"
                        label="Shop Name"
                        type="text"
                        name="shop_name"
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className="col-6 ">
                      <p className="text-danger m-0 small">{message.city}</p>

                      <MDBInput
                        wrapperClass="mb-4"
                        label="City"
                        type="text"
                        onChange={handleOnChange}
                        name="city"
                      />
                    </div>
                    <div className="col-12 ">
                      <p className="text-danger m-0 small">{message.email}</p>

                      <MDBInput
                        wrapperClass="mb-4"
                        label="Email"
                        type="email"
                        onChange={handleOnChange}
                        name="email"
                      />
                    </div>
                    <div className="col-12 ">
                      <p className="text-danger m-0 small">{message.address}</p>

                      <MDBInput
                        wrapperClass="mb-4"
                        label="Address"
                        type="text"
                        onChange={handleOnChange}
                        name="address"
                      />
                    </div>

                    <div className="col-6 ">
                      <p className="text-danger m-0 small">
                        {message.category}
                      </p>

                      <select
                        name="category_id"
                        className="form-select"
                        onChange={handleOnChange}
                      >
                        <option value="">Chose category</option>
                        {categories?.map((category) => {
                          return (
                            <option value={category.Category_id}>
                              {category.categoryName}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="col-6 ">
                      <p className="text-danger m-0 small">
                        {message.phone_number}
                      </p>

                      <MDBInput
                        wrapperClass="mb-4"
                        label="Phone Number"
                        type="tel"
                        onChange={handleOnChange}
                        name="phone_number"
                      />
                    </div>
                    <div className="col-6 ">
                      <p className="text-danger m-0 small">
                        {message.open_time}
                      </p>

                      <MDBInput
                        wrapperClass="mb-4"
                        label="Open Time"
                        type="time"
                        name="open_time"
                        onChange={handleOnChange}
                      />
                    </div>
                    <div className="col-6 ">
                      <p className="text-danger m-0 small">
                        {message.close_time}
                      </p>

                      <MDBInput
                        wrapperClass="mb-4"
                        label="Close Time"
                        type="time"
                        name="close_time"
                        onChange={handleOnChange}
                      />
                    </div>
                    <p className="text-danger m-0 small">{message.password}</p>
                    <div className="col-6 ">
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Password"
                        type="password"
                        onChange={handleOnChange}
                        name="password"
                      />
                    </div>
                    <div className="col-6 ">
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Confirm Password"
                        type="password"
                        onChange={handleOnChange}
                        name="password_confirmation"
                      />
                    </div>
                    <div className="col-12 ">
                      <p className="text-danger m-0 small">
                        {message.wallet_account}
                      </p>

                      <MDBInput
                        wrapperClass="mb-4"
                        label="Wallet Number"
                        type="tel"
                        onChange={handleOnChange}
                        name="wallet_account"
                      />
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <div className="col-4">
                        <img
                          src={shopRegister.profile_photo}
                          alt=""
                          width={100}
                        />
                      </div>
                      <div className="col-8">
                        <span>Product photo</span>
                        <p className="text-danger m-0 small">
                          {message?.profile_photo}
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

                  <MDBBtn
                    className="w-100 mb-2"
                    size="md"
                    color="dark"
                    type="button"
                    onClick={handleRegisterShop}
                  >
                    sign up
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

export default JoinUs;
