import React from "react";
import {
  MDBBtn,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBPopover,
  MDBPopoverBody,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
import { useDispatch } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { fetchShopProfileData } from "../../redusers/ShopProfileReduser";

export default function PendingOrder({ offerData }) {
  const auth = useAuthUser();
  const dispatch = useDispatch();

  const handleApproveOrReject = (id, action) => {
    const config = {
      method: "put",
      url: `http://127.0.0.1:8000/api/${action}/${id}`,
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        Authorization: `Bearer  ${auth().token}`,
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
    <>
      <MDBListGroupItem className="d-flex justify-content-between align-items-center px-2">
        <div className="d-flex align-items-center">
          <div className="ms-3">
            <p className="fw-bold mb-1">
              <p className="mb-1">order ID: {offerData.order_id}</p>
              <p className="mb-1">
                Amount : <b>{offerData.total}</b>
              </p>
            </p>
            <p className="text-muted mb-0">
              Order From : {offerData.orderOwner}
            </p>
          </div>
        </div>
        <Link to={`/orderDetails/${offerData.order_id}`}>
          <MDBBtn size="sm" rounded color="link">
            View Details
          </MDBBtn>
        </Link>
        <div className="d-flex flex-column flex-md-row  justify-content-center align-items-center">
          <MDBPopover
            size="sm"
            rounded
            color="danger"
            btnClassName="ms-2 mt-2"
            btnChildren={"Reject"}
          >
            <MDBPopoverBody>
              <h6>Are you sure?</h6>
              <p>You won't be able to revert this!</p>
              <MDBBtn
                size="xs"
                color="danger"
                className="ms-2 mt-2"
                onClick={() => {
                  handleApproveOrReject(offerData.order_id, "reject");
                }}
              >
                Reject
              </MDBBtn>
            </MDBPopoverBody>
          </MDBPopover>

          <MDBBtn
            size="sm"
            rounded
            color="success"
            className="ms-2 mt-2"
            onClick={() => {
              handleApproveOrReject(offerData.order_id, "approve");
            }}
          >
            Approve
          </MDBBtn>
        </div>
      </MDBListGroupItem>
    </>
  );
}
