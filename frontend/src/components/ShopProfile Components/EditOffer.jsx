import axios from "axios";
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
import { useAuthUser } from "react-auth-kit";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { fetchShopProfileData } from "../../redusers/ShopProfileReduser";
import useValidation from "../hooks/useValidation";
import AddOfferComp from "./AddOfferComp";
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../fierbase";

export default function EditOffer({
  setStaticModal,
  staticModal,
  toggleShow,
  offerData,
}) {
  const auth = useAuthUser();
  const dispatch = useDispatch();
  const { isNotEmptyValidation, message } = useValidation();

  const [editOfferData, setEditOfferData] = useState({
    expiration_date: offerData.expirationDate,
    product_description: offerData.productDescription,
    product_name: offerData.productName,
    product_image: offerData.productPhoto,
    product_price: offerData.productPrice,
    product_Quantity: offerData.productQuantity,
    product_tag: offerData.tag,
  });
  const handleEditChange = (e) => {
    setEditOfferData({ ...editOfferData, [e.target.name]: e.target.value });
  };
  const checkValidation = () => {
    let Name = isNotEmptyValidation("product_name", editOfferData.product_name);
    let price = isNotEmptyValidation(
      "product_price",
      editOfferData.product_price
    );
    let image = isNotEmptyValidation(
      "product_image",
      editOfferData.product_image
    );
    let Quantity = isNotEmptyValidation(
      "product_Quantity",
      editOfferData.product_Quantity
    );
    let duoTo = isNotEmptyValidation(
      "expiration_date",
      editOfferData.expiration_date
    );
    let tag = isNotEmptyValidation("product_tag", editOfferData.product_tag);
    let description = isNotEmptyValidation(
      "product_description",
      editOfferData.product_description
    );

    if (Name && price && image && Quantity && tag && duoTo && description) {
      return true;
    } else return false;
  };
  const handleEdit = async () => {
    const config = {
      method: "put",
      url: `http://127.0.0.1:8000/api/shop/editOffer/${offerData.product_id} `,
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${auth().token}`,
      },
      data: editOfferData,
    };

    if (checkValidation()) {
      console.log("check ok");
      axios(config)
        .then(function (res) {
          console.log(res.data);

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
            title: res.data.message,
          });
          toggleShow();
          dispatch(fetchShopProfileData(auth().token));
        })
        .catch(function (error) {
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
        setEditOfferData((pervs) => ({ ...pervs, product_image: response }));
      });
    });
    return response;
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
              <MDBModalTitle>Edit Offer</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <AddOfferComp
                offerData={editOfferData}
                handleChange={handleEditChange}
                uploadImage={uploadImage}
              />
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="danger" onClick={toggleShow}>
                Cancel
              </MDBBtn>
              <MDBBtn color="dark" onClick={handleEdit}>
                save change
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
