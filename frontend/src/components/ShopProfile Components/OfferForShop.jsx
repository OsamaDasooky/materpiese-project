import React, { useState } from "react";
import {
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBIcon,
  MDBPopover,
  MDBPopoverBody,
} from "mdb-react-ui-kit";
import EditOffer from "./EditOffer";
import { useAuthUser } from "react-auth-kit";
import { useDispatch } from "react-redux";
import axios from "axios";
import { fetchShopProfileData } from "../../redusers/ShopProfileReduser";
import Swal from "sweetalert2";

function OfferForShop({ offerData }) {
  const [staticModal, setStaticModal] = useState(false);
  const toggleShow = () => setStaticModal(!staticModal);

  const auth = useAuthUser();
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    const config = {
      method: "delete",
      url: `http://127.0.0.1:8000/api/shop/${id}`,
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        Authorization: `Bearer ${auth().token}`,
      },
    };

    axios(config).then((res) => {
      console.log(res);
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
      dispatch(fetchShopProfileData(auth().token));
    });
  };
  return (
    <MDBCol md="6" lg="3" className="mb-4 ps-2">
      <MDBCard>
        <MDBCardImage
          src={offerData.productPhoto}
          position="top"
          alt="Laptop"
        />
        <MDBCardBody>
          <div className="d-flex justify-content-between">
            <p className="small">Duo to</p>
            <p className="small text-secondary">{offerData.expirationDate}</p>
          </div>

          <div className="d-flex justify-content-between mb-3">
            <h5 className="mb-0">{offerData.productName}</h5>
            <h5 className="text-danger mb-0">{offerData.productPrice}JD</h5>
          </div>

          <div class="d-flex justify-content-center mb-2">
            <MDBPopover
              size="sm"
              color="danger"
              btnChildren={
                <div>
                  <MDBIcon fas icon="trash-alt" />
                  delete
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
                    handleDelete(offerData.product_id);
                  }}
                >
                  delete
                </MDBBtn>
              </MDBPopoverBody>
            </MDBPopover>
            <MDBBtn color="dark" className="ms-1" onClick={toggleShow}>
              <MDBIcon fas icon="edit" />
              Edit
            </MDBBtn>
          </div>
          <EditOffer
            setStaticModal={setStaticModal}
            staticModal={staticModal}
            toggleShow={toggleShow}
            offerData={offerData}
          />
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
}

export default OfferForShop;
