import React, { useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBRadio,
  MDBRow,
  MDBTextArea,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useValidation from "../hooks/useValidation";
import Swal from "sweetalert2";
import axios from "axios";
import { useAuthUser } from "react-auth-kit";
import { alert, emptyCart } from "../../redusers/CartReduser";

export function Checkout() {
  const cart = useSelector((state) => state.cart);
  const [orderData, setOrderData] = useState({
    deliveryInfo: {
      name: "",
      address: "",
      city: "",
      phone_number: "",
      note: "",
    },
    productsForOrder: cart.productsForOrder,
    orderInfo: cart.orderInfo,
  });
  const auth = useAuthUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(orderData);
  const { NameValidation, phoneValidation, message, isNotEmptyValidation } =
    useValidation();
  const handleChange = (e) => {
    setOrderData({
      ...orderData,
      deliveryInfo: {
        ...orderData.deliveryInfo,
        [e.target.name]: e.target.value,
      },
    });
  };
  const checkValidation = () => {
    let name = NameValidation("name", orderData.deliveryInfo.name);
    let phone = phoneValidation(orderData.deliveryInfo.phone_number);
    let city = isNotEmptyValidation("city", orderData.deliveryInfo.city);
    let address = isNotEmptyValidation(
      "address",
      orderData.deliveryInfo.address
    );
    if (name && address && phone && city) {
      return true;
    } else return false;
  };
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const orderConfig = {
      method: "post",
      url: "http://127.0.0.1:8000/api/order/placeOrder",
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        Authorization: `Bearer ${auth().token}`,
      },
      data: orderData,
    };
    if (checkValidation()) {
      Swal.fire({
        title: "Are you sure?",
        html: `Your order is <b>${cart.items} items</b> from <b>${
          cart.shopInfo.shopName
        }</b> shop and the total price is <b>${
          cart.orderInfo.total + 2
        }JD </b>`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#332d2d",
        cancelButtonColor: "#dc4c64",
        confirmButtonText: "Yes, Continue",
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("ok lets go");
          axios(orderConfig)
            .then(function (res) {
              console.log(res.data);
              alert("your order received to shop successfully");
              navigate(`/orderDetails/${res.data.data.order_id}`);
              dispatch(emptyCart());
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      });
    }
  };
  return (
    <MDBContainer className="my-3 py-5" style={{ maxWidth: "1300px" }}>
      <section>
        <MDBRow>
          <MDBCol md="8" className="mb-4">
            <MDBCard className="mb-4">
              <MDBCardHeader className="py-3">
                <MDBTypography
                  tag="h5"
                  className="mb-0 text-font text-capitalize"
                >
                  Delivery address
                </MDBTypography>
              </MDBCardHeader>
              <MDBCardBody>
                <MDBRow className="mb-4">
                  <MDBCol>
                    <p className="text-danger m-0 small">{message.name}</p>
                    <MDBInput
                      label="Full name"
                      type="text"
                      name="name"
                      onChange={handleChange}
                    />
                  </MDBCol>
                  <MDBCol>
                    <p className="text-danger m-0 small">
                      {message.phone_number}
                    </p>
                    <MDBInput
                      label="Phone"
                      type="tel"
                      name="phone_number"
                      onChange={handleChange}
                    />
                  </MDBCol>
                </MDBRow>
                <p className="text-danger m-0 small">{message.city}</p>
                <MDBInput
                  label="City"
                  type="text"
                  className="mb-4"
                  name="city"
                  onChange={handleChange}
                />
                <p className="text-danger m-0 small">{message.address}</p>
                <MDBInput
                  label="Address"
                  type="text"
                  className="mb-4"
                  name="address"
                  onChange={handleChange}
                />
                <MDBTextArea
                  label="Additional information"
                  rows={4}
                  name="note"
                  className="mb-4"
                  onChange={handleChange}
                />
              </MDBCardBody>
            </MDBCard>
            <div>
              <h3>Payment method</h3>
              <MDBRadio
                name="flexRadioDefault"
                id="flexRadioDefault1"
                label="VISA"
              />
              <MDBRadio
                name="flexRadioDefault"
                id="flexRadioDefault2"
                label="Cash on Delivery"
                required
                checked
              />
            </div>
          </MDBCol>

          <MDBCol md="4" className="mb-4 position-statics">
            <MDBCard className="mb-4">
              <MDBCardHeader className="py-3">
                <MDBTypography tag="h5" className="mb-0 text-font">
                  {cart.items} item
                  <Link to={"/cart"}>
                    <span
                      className="float-end mt-1"
                      style={{ fontSize: "13px" }}
                    >
                      Edit
                    </span>
                  </Link>
                </MDBTypography>
              </MDBCardHeader>
              <MDBCardBody>
                {cart.products.map((product, index) => {
                  return (
                    <MDBRow className="d-flex justify-content-around mt-3">
                      <MDBCol md="5">
                        <MDBCardImage
                          src={product.productPhoto}
                          className="rounded-3"
                          style={{ minWidth: "100px", maxWidth: "100%" }}
                          alt="Blue Jeans Jacket"
                        />
                      </MDBCol>
                      <MDBCol md="5" className="ms-3 mt-3">
                        <p
                          className="mb-1 text-descriptions"
                          style={{ color: " #ed2647" }}
                        >
                          <b>{product.productName}</b>
                        </p>
                        <span className="mb-2 text-price">
                          <b>{product.productPrice}JD</b>
                        </span>

                        <p className="text-descriptions mt-0">
                          Qty:{cart.productsForOrder[index].quantity}
                        </p>
                      </MDBCol>
                    </MDBRow>
                  );
                })}
              </MDBCardBody>
              <MDBCardFooter className="mt-4">
                <MDBListGroup flush>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0 text-muted">
                    Subtotal
                    <span>{cart.orderInfo.total}JD</span>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0 text-muted">
                    Delivery
                    <span>{2}JD</span>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 fw-bold text-uppercase">
                    Total to pay
                    <span>{cart.orderInfo.total + 2}JD</span>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardFooter>
            </MDBCard>
            <div className="text-center">
              <MDBBtn
                className="button-order col-md-12 bg-dark"
                onClick={handlePlaceOrder}
              >
                Place order
              </MDBBtn>
            </div>
          </MDBCol>
        </MDBRow>
      </section>
    </MDBContainer>
  );
}
