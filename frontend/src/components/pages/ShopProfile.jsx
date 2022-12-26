import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBSpinner,
  MDBBtn,
} from "mdb-react-ui-kit";
import ShopProduct from "../ShopProfile Components/ShopProduct";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShopProfile } from "../../redusers/AllShopsReducer";

export function ShopProfile() {
  const { shopName } = useParams();
  const dispatch = useDispatch();
  const { shopData } = useSelector((state) => state.shops);

  useEffect(() => {
    dispatch(fetchShopProfile(shopName));
  }, []);

  if (shopData.length === 0) {
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
    <div className="gradient-custom-2">
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="12" xl="12">
            <MDBCard>
              <div
                className="rounded-top text-white d-flex flex-column flex-sm-row align-items-center"
                style={{ backgroundColor: "#000", minHeight: "200px" }}
              >
                <div
                  className="ms-md-4 mt-md-5  d-flex flex-column  align-self-center"
                  style={{ width: "250px" }}
                >
                  <MDBCardImage
                    src={shopData.shop_info.ProfilePhoto}
                    alt="Generic placeholder image"
                    className="mt-2 mt-md-5 mb-2 img-thumbnail "
                    fluid
                    style={{ width: "300px", zIndex: "1" }}
                  />
                </div>
                <div className="ms-4 mt-md-5" style={{ marginsTop: "90px" }}>
                  <MDBTypography tag="h2" style={{ color: " #ed2647" }}>
                    {shopData.shop_info.shopName}
                  </MDBTypography>
                  <MDBCardText tag="h5">
                    {shopData.shop_info.category}
                  </MDBCardText>
                </div>
              </div>
              <div
                className="p-4 text-black"
                style={{ backgroundColor: "#f8f9fa" }}
              >
                <div className="d-flex justify-content-end text-center py-1 pt-4 pt-md-0">
                  <div className="me-4">
                    <MDBCardText className="mb-1 h5 ">city</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">
                      {shopData.shop_info.city.slice(0, 10)}
                    </MDBCardText>
                  </div>
                  <div>
                    {Number(shopData.shop_info.openTime.slice(0, 2)) <
                    new Date().getHours() <
                    Number(shopData.shop_info.closeTime.slice(0, 2)) ? (
                      <MDBCardText className="mb-1 h5 text-success">
                        Open
                      </MDBCardText>
                    ) : (
                      <MDBCardText className="mb-1 h5 text-danger">
                        Close
                      </MDBCardText>
                    )}
                    <MDBCardText className="small text-muted mb-0">
                      {shopData.shop_info.openTime.slice(0, 5)} -{" "}
                      {shopData.shop_info.closeTime.slice(0, 5)}
                    </MDBCardText>
                  </div>
                </div>
              </div>
              <MDBCardBody className="text-black p-4 mt-5">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <MDBCardText className="lead fw-normal mb-0">
                    <b>Active Offers</b>
                  </MDBCardText>
                </div>
                <hr className="mt-0" />
                <MDBRow className="g-0 justify-content-start align-items-start ">
                  {shopData.shop_products?.map((product) => {
                    return new Date(product.expirationDate) > new Date() ? (
                      <ShopProduct
                        productData={product}
                        shopData={{
                          shop_id: shopData.shop_info.shop_id,
                          shopName: shopData.shop_info.shopName,
                        }}
                        key={product.productName}
                      />
                    ) : (
                      ""
                    );
                  })}
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
