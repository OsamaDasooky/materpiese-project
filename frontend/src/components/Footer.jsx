import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn,
} from "mdb-react-ui-kit";
import logo from "./asset/BrandFiles/3rood-low-resolution-logo-color-on-transparent-background.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <MDBFooter className="text-center" color="white" bgColor="dark">
      <MDBContainer className="p-4">
        <section className="">
          <MDBRow>
            <MDBCol lg="2" md="6" className="mb-4 mb-md-0 align-self-center">
              <img src={logo} height="35" alt="" loading="lazy" />
            </MDBCol>
            <MDBCol lg="3" md="6" className="mb-4 mb-md-0 align-self-center">
              <h5 className="text-capitalize" style={{ color: "#ed2647" }}>
                Get in Touch
              </h5>
              <p>
                34/8, East Hukupara, Gifirtok, Sadan. support@fruitkha.com +00
                111 222 3333
              </p>
            </MDBCol>

            <MDBCol lg="3" md="6" className="mb-4 mb-md-0 align-self-center">
              <h5 className="text-capitalize" style={{ color: "#ed2647" }}>
                Quick Links
              </h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <Link className="text-white">Shops</Link>
                </li>
                <li>
                  <Link className="text-white">About</Link>
                </li>
                <li>
                  <Link className="text-white">Join us</Link>
                </li>
                <li>
                  <Link className="text-white">Contact</Link>
                </li>
              </ul>
            </MDBCol>

            <MDBCol lg="4" md="6" className="mb-4 mb-md-0 align-self-center">
              <MDBCol size="auto">
                <p className="pt-2">
                  <strong>Sign up for our newsletter</strong>
                </p>
              </MDBCol>

              <MDBCol md="10" className="mx-auto">
                <MDBInput
                  contrast
                  type="email"
                  label="Email address"
                  className="mb-4"
                />
              </MDBCol>

              <MDBCol size="auto">
                <MDBBtn
                  outline
                  color="light"
                  type="submit"
                  className="mb-4"
                  rippleColor="red"
                >
                  Subscribe
                </MDBBtn>
              </MDBCol>
            </MDBCol>
          </MDBRow>
        </section>
      </MDBContainer>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2020 Copyright:3rood.com
      </div>
    </MDBFooter>
  );
}
