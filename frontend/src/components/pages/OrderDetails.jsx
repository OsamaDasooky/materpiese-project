import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBSpinner,
  MDBTypography,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function OrderDetails() {
  const { id } = useParams();
  const auth = useAuthUser();
  const [orderData, setOrderData] = useState(null);
  const config = {
    method: "get",
    url: `http://127.0.0.1:8000/api/order/${id}`,
    headers: {
      Accept: "application/vnd.api+json",
      typ: "application/vnd.api+json",
      Authorization: `Bearer ${auth().token}`,
    },
  };
  const fetchOrderData = () => {
    axios(config)
      .then(function (response) {
        setOrderData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchOrderData();
  }, []);
  if (orderData == null) {
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
      <section
        className="h-100 gradient-custom"
        style={{ backgroundColor: "#eee" }}
      >
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="10" xl="10">
              <MDBCard style={{ borderRadius: "10px" }}>
                <MDBCardHeader className="px-4 py-5">
                  <MDBTypography tag="h5" className="text-muted mb-0">
                    Thanks for your Order ,
                    <span
                      style={{
                        color: " #ed2647",
                        textTransform: "capitalize",
                        fontWeight: "bold",
                      }}
                    >
                      {auth().role === "user"
                        ? auth().user.firstName
                        : auth().shop.shopName}
                    </span>
                  </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody className="p-4">
                  <MDBCard className="shadow-0 border mb-4">
                    <MDBCardBody>
                      {orderData.orderProducts.map((order) => {
                        return (
                          <MDBRow>
                            <MDBCol md="3">
                              <MDBCardImage
                                src={order.productPhoto}
                                fluid
                                alt="Phone"
                              />
                            </MDBCol>
                            <MDBCol
                              md="3"
                              className="text-center d-flex justify-content-center align-items-center"
                            >
                              <p className="text-muted h5  mb-0">
                                {order.productName}
                              </p>
                            </MDBCol>

                            <MDBCol
                              md="3"
                              className="text-center d-flex justify-content-center align-items-center"
                            >
                              <p className="text-muted  mb-0 ">
                                Qty: {order.Quantity}
                              </p>
                            </MDBCol>
                            <MDBCol
                              md="3"
                              className="text-center d-flex justify-content-center align-items-center"
                            >
                              <p className="text-muted  mb-0 ">
                                {order.productPrice}JD
                              </p>
                            </MDBCol>
                          </MDBRow>
                        );
                      })}
                    </MDBCardBody>
                  </MDBCard>

                  <div className="row d-flex justify-content-between py-2 ">
                    <div className="col-12 col-md-6 my-3">
                      <p className="fw-bold mb-0">Shop: {orderData.shopName}</p>
                      <p className="text-muted mb-0">
                        <span className="fw-bold me-4">Order to:</span>
                        {orderData.deliveryInfo.name}
                      </p>
                      <p className="text-muted mb-0">
                        <span className="fw-bold me-4">Total</span>
                        {orderData.total}JD
                      </p>
                      <p className="text-muted mb-0">
                        <b>order id:</b> {orderData.order_id}
                      </p>
                      {orderData.orderStatus == "rejected" ? (
                        <p className="text-muted mb-0">
                          <span className="fw-bold me-4">Order status:</span>{" "}
                          <span className="text-danger ">
                            {orderData.orderStatus}
                          </span>
                        </p>
                      ) : (
                        <p className="text-muted mb-0">
                          <span className="fw-bold me-4">Order status:</span>{" "}
                          {orderData.orderStatus == "pending" ? (
                            <span className="text-warning ">
                              {orderData.orderStatus}
                            </span>
                          ) : (
                            <>
                              <span className="text-success ">
                                {orderData.orderStatus}
                              </span>
                              <span className="ms-2">
                                {orderData.orderStage}
                              </span>
                            </>
                          )}
                        </p>
                      )}
                      <p className="text-muted mb-0">
                        <span className="fw-bold me-4">Delivery Charges</span>{" "}
                        2JD
                      </p>
                      <p className="text-muted mb-0">
                        <b>Order Date </b>: {orderData.created_at.split("T")[0]}
                      </p>
                    </div>
                    <div className="col-12 col-md-6 my-3">
                      <p className="text-muted mb-0">
                        <b> phone:</b> {orderData.deliveryInfo.phone_number}
                      </p>

                      <p className="text-muted mb-0">
                        <b>City:</b> {orderData.deliveryInfo.city}
                      </p>
                      <p className="text-muted mb-0">
                        <b>Order Note:</b> {orderData.deliveryInfo.note}
                      </p>
                      <p className="text-muted mb-0">
                        <b>Address Delivery:</b>{" "}
                        {orderData.deliveryInfo.address}
                      </p>
                    </div>
                  </div>
                </MDBCardBody>
                <MDBCardFooter
                  className="border-0 "
                  style={{
                    backgroundColor: " #ed2647",
                    borderBottomLeftRadius: "10px",
                    borderBottomRightRadius: "10px",
                  }}
                >
                  <MDBTypography
                    tag="h5"
                    className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0"
                  >
                    Total paid:{" "}
                    <span className="h2 mb-0 ms-2">{orderData.total}JD</span>
                  </MDBTypography>
                </MDBCardFooter>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
}
