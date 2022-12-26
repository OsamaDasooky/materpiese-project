import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { useState } from "react";
import useValidation from "../hooks/useValidation";
import ChangePassComp from "./ChangePassComp";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuthUser } from "react-auth-kit";

const qs = require("qs");

export default function ChangePass({
  setStaticModal,
  staticModal,
  toggleShow,
}) {
  const [userPass, setUserPass] = useState({
    password_current: "",
    password: "",
    password_confirmation: "",
  });
  const auth = useAuthUser();

  const [error, setError] = useState(false);
  const { passwordValidation, isNotEmptyValidation, message, setMessage } =
    useValidation();
  const data = qs.stringify({
    password_current: userPass.password_current,
    password: userPass.password,
    password_confirmation: userPass.password_confirmation,
  });
  const uri =
    auth().role === "user"
      ? "http://127.0.0.1:8000/api/userChangePass"
      : auth().role === "shop"
      ? "http://127.0.0.1:8000/api/shopChangePass"
      : "";
  const config = {
    method: "put",
    url: uri,
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${auth().token}`,
    },
    data: data,
  };
  const handleOnChange = (e) => {
    setUserPass((pervs) => ({ ...pervs, [e.target.name]: e.target.value }));
  };
  const filedValidation = () => {
    let currantPass = isNotEmptyValidation(
      "password_current",
      userPass.password_current
    );
    let newPass = passwordValidation(
      userPass.password,
      userPass.password_confirmation
    );

    if (newPass && currantPass) return true;
    else return false;
  };

  const handleChangePass = () => {
    setMessage((pervs) => ({ ...pervs, password: "", password_current: "" }));
    setError(false);
    if (filedValidation()) {
      axios(config)
        .then(function (response) {
          setUserPass({
            password_current: "",
            password: "",
            password_confirmation: "",
          });
          const Toast = Swal.mixin({
            toast: true,
            position: "top-right",
            iconColor: "white",
            customClass: {
              popup: "colored-toast",
            },
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          });
          Toast.fire({
            icon: "success",
            title: response.data.message,
          });
          toggleShow();
        })
        .catch(function (error) {
          console.log(error.response.data.message);
          setError(true);
          setMessage((pervs) => ({
            ...pervs,
            serverError: error.response.data.message,
          }));
        });
    } else {
      setError(true);
    }
  };
  return (
    <>
      <MDBModal
        staticBackdrop
        tabIndex="-1"
        show={staticModal}
        setShow={setStaticModal}
      >
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Change Password</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <ChangePassComp
                handleOnChange={handleOnChange}
                message={message}
                error={error}
              />
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="danger" onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn color="dark" onClick={handleChangePass}>
                Save Change
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
