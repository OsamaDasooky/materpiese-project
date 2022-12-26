import React from "react";
import { MDBCol, MDBCardBody, MDBInput } from "mdb-react-ui-kit";

function ChangePassComp({ handleOnChange, message, error }) {
  return (
    <>
      <MDBCol md="12">
        <div className="">
          {error ? (
            <div
              className="text-danger text-center p-2 mb-2 rounded-5 small"
              style={{ backgroundColor: "#f9c7c4" }}
            >
              <p className="m-0 mb-2">{message.password_current} </p>
              <p className="m-0 mb-2">{message.password} </p>
              <p className="m-0">{message.serverError}</p>
            </div>
          ) : (
            ""
          )}
          <MDBCardBody className="p-5">
            <form>
              <MDBInput
                wrapperClass="mb-4"
                label="Current Password"
                type="password"
                name="password_current"
                onChange={handleOnChange}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="New Password"
                type="password"
                name="password"
                onChange={handleOnChange}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Confirm Password"
                type="password"
                name="password_confirmation"
                onChange={handleOnChange}
              />
            </form>
          </MDBCardBody>
        </div>
      </MDBCol>
    </>
  );
}

export default ChangePassComp;
