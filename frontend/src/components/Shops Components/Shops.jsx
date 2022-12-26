import {
  MDBCardImage,
  MDBRipple,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
} from "mdb-react-ui-kit";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Shops = ({ shopData }) => {
  const navigate = useNavigate();

  return (
    <>
      <MDBCol md="6" lg="3" className="mb-4 ps-2">
        <MDBCard>
          <MDBRipple
            rippleColor="light"
            rippleTag="div"
            className="bg-image rounded hover-zoom"
          >
            <MDBCardImage
              src={shopData.ProfilePhoto}
              // fluid
              width={"100%"}
              height={250}
            />
            <Link to={`/shopProfile/${shopData.shopName}`}>
              <div class="hover-overlay">
                <div
                  className="mask"
                  style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                ></div>
              </div>
            </Link>
          </MDBRipple>
          <MDBCardBody className="text-center">
            <Link
              to={`/shopProfile/${shopData.shopName}`}
              className="text-reset"
            >
              <h4
                className="card-title mb-3 text-capitalize "
                style={{ color: " #ed2647", fontWeight: 700, maxHeight: 75 }}
              >
                {shopData.shopName.slice(0, 30)}
              </h4>
            </Link>
            <p>{shopData.category}</p>{" "}
            <MDBBtn
              className="mx-2"
              color="dark"
              onClick={() => {
                navigate(`/shopProfile/${shopData.shopName}`);
              }}
            >
              Shop now
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </>
  );
};
