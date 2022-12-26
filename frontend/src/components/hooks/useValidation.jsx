import { useState } from "react";

const emailRegx = /^[\w-\.]+(.[\w-\.]+)?@([\w-]+\.)+[\w-]{2,8}$/;
const nameRegx = /^[a-zA-Z\s]{4,}$/;
const passRegx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const phoneRegx = /07\d{8}$/;

const useValidation = () => {
  const [message, setMessage] = useState({
    first_name: "",
    last_name: "",
    password: "",
    email: "",
    city: "",
    gender: "",
    phone_number: "",
    birthday: "",
    serverError: "",
  });
  ////////////////////////////////////////////////
  const passwordValidation = (pass, confirmPass) => {
    if (!passRegx.test(pass)) {
      setMessage((pervs) => ({
        ...pervs,
        password:
          "invalid password should include at lest 8 Characters,at least one letter, one number and one special character",
      }));
      return false;
    }
    if (pass == "" || confirmPass == "") {
      setMessage((pervs) => ({
        ...pervs,
        password: "password and confirmation password are required",
      }));
      return false;
    }
    if (!(pass === confirmPass)) {
      setMessage((pervs) => ({
        ...pervs,
        password: "password and confirmation password should be same",
      }));
      return false;
    }
    setMessage((pervs) => ({
      ...pervs,
      password: "",
    }));
    return true;
  };
  /////////////////////////////////////////////////////////////
  const emailValidation = (email) => {
    if (emailRegx.test(email) === false) {
      setMessage((pervs) => ({
        ...pervs,
        email: "invalid email should include like test.(optional)@gmail.com",
      }));
      return false;
    }
    if (email == "") {
      setMessage((pervs) => ({
        ...pervs,
        email: "email is  required",
      }));
      return false;
    }
    setMessage((pervs) => ({
      ...pervs,
      email: "",
    }));
    return true;
  };
  ///////////////////////////////////////////
  const NameValidation = (inputName, value) => {
    if (inputName == "") {
      setMessage((pervs) => ({
        ...pervs,
        [inputName]: "name is required",
      }));
      return false;
    }
    if (!nameRegx.test(value)) {
      setMessage((pervs) => ({
        ...pervs,
        [inputName]:
          "invalid name should include just white space and characters",
      }));
      return false;
    }
    setMessage((pervs) => ({
      ...pervs,
      [inputName]: "",
    }));
    return true;
  };
  const phoneValidation = (phone, inputName = "phone_number") => {
    if (phone == "") {
      setMessage((pervs) => ({
        ...pervs,
        [inputName]: `phone number is required`,
      }));
      return false;
    }
    if (!phoneRegx.test(phone)) {
      setMessage((pervs) => ({
        ...pervs,
        [inputName]: "phone number should be 10 numbers like 0788887777",
      }));
      return false;
    }

    setMessage((pervs) => ({
      ...pervs,
      [inputName]: "",
    }));
    return true;
  };
  const isNotEmptyValidation = (input, value) => {
    if (value == "") {
      setMessage((pervs) => ({
        ...pervs,
        [input]: `${input} is required`,
      }));
      return false;
    }
    setMessage((pervs) => ({
      ...pervs,
      [input]: "",
    }));
    return true;
  };
  return {
    NameValidation,
    emailValidation,
    passwordValidation,
    isNotEmptyValidation,
    phoneValidation,
    message,
    setMessage,
  };
};
export default useValidation;
