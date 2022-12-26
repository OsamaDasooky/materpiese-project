/* eslint-disable jsx-a11y/alt-text */
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBPopover,
  MDBPopoverBody,
  MDBRipple,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  decreesQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../redusers/CartReduser";

export function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <section className="h-100 gradient-custom">
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center my-4">
          {cart.items === 0 ? (
            <MDBCol md="8" style={{ height: "40vh" }}>
              <MDBCard className="mb-4">
                <MDBCardHeader className="py-3">
                  <MDBTypography tag="h5" className="mb-0">
                    Cart - {cart.items} items
                  </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>
                  <div className="text-center">
                    <h3 className="mb-4">Your Cart is Empty </h3>
                    <Link to="/shops">
                      <MDBBtn color="dark">go to shops</MDBBtn>
                    </Link>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ) : (
            <>
              <MDBCol md="8">
                <MDBCard className="mb-4">
                  <MDBCardHeader className="py-3">
                    <MDBTypography tag="h5" className="mb-0">
                      Cart - {cart.items} items
                    </MDBTypography>
                  </MDBCardHeader>
                  <MDBCardBody>
                    {cart?.products.map((product, index) => {
                      return (
                        <>
                          <MDBRow>
                            <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                              <MDBRipple
                                rippleTag="div"
                                rippleColor="light"
                                className="bg-image rounded hover-zoom hover-overlay"
                              >
                                <img
                                  src={product.productPhoto}
                                  className="w-100"
                                />
                              </MDBRipple>
                            </MDBCol>

                            <MDBCol lg="5" md="6" className=" mb-4 mb-lg-0">
                              <p>
                                <strong>{product.productName} </strong>
                              </p>
                              <p>
                                <strong>{product.productPrice}JD</strong>
                              </p>
                              <MDBPopover
                                size="sm"
                                color="danger"
                                btnChildren={
                                  <div>
                                    <MDBIcon fas icon="trash-alt" />
                                  </div>
                                }
                                dismiss
                              >
                                <MDBPopoverBody>
                                  <h6>Are you sure?</h6>
                                  <p>You won't be able to revert this!</p>
                                  <MDBBtn
                                    color="danger"
                                    onClick={() => {
                                      dispatch(
                                        removeFromCart({
                                          product_id: product.product_id,
                                        })
                                      );
                                    }}
                                  >
                                    Remove
                                  </MDBBtn>
                                </MDBPopoverBody>
                              </MDBPopover>
                            </MDBCol>
                            <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
                              <div
                                className="d-flex mb-4"
                                style={{ maxWidth: "300px" }}
                              >
                                <MDBBtn
                                  className="px-3 me-2 bg-dark"
                                  onClick={() => {
                                    dispatch(
                                      decreesQuantity({
                                        product_id: product.product_id,
                                        quantity:
                                          cart.productsForOrder[index]
                                            .quantity + 1,
                                      })
                                    );
                                  }}
                                >
                                  <MDBIcon fas icon="minus" />
                                </MDBBtn>
                                <MDBInput
                                  value={cart.productsForOrder[index].quantity}
                                  min={1}
                                  type="number"
                                  label="Quantity"
                                  name="Quantity"
                                />

                                <MDBBtn
                                  className="px-3 ms-2 bg-dark"
                                  onClick={() => {
                                    dispatch(
                                      increaseQuantity({
                                        product_id: product.product_id,
                                        quantity:
                                          cart.productsForOrder[index]
                                            .quantity + 1,
                                      })
                                    );
                                  }}
                                >
                                  <MDBIcon fas icon="plus" />
                                </MDBBtn>
                              </div>
                            </MDBCol>
                          </MDBRow>
                          <hr className="my-4" />
                        </>
                      );
                    })}
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol md="4">
                <MDBCard className="mb-4">
                  <MDBCardHeader>
                    <MDBTypography tag="h5" className="mb-0">
                      Summary
                    </MDBTypography>
                  </MDBCardHeader>
                  <MDBCardBody>
                    <MDBListGroup flush>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Sub Total
                        <span>{cart.orderInfo.total}JD</span>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0">
                        Delivery
                        <span> 2JD</span>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                          <strong>Total amount</strong>
                        </div>
                        <span>
                          <strong>{cart.orderInfo.total + 2}JD</strong>
                        </span>
                      </MDBListGroupItem>
                    </MDBListGroup>

                    <Link to="/checkout">
                      {" "}
                      <MDBBtn
                        block
                        size="lg"
                        color="dark"
                        onClick={() => {
                          navigate("", { state: location.pathname });
                        }}
                      >
                        Go to checkout
                      </MDBBtn>
                    </Link>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </>
          )}
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
