import React from "react";
import { MDBBtn, MDBListGroup, MDBListGroupItem } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
import { useDispatch } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { fetchShopProfileData } from "../../redusers/ShopProfileReduser";

export default function ApprovedOrder({ offerData }) {
  const auth = useAuthUser();
  const dispatch = useDispatch();
  const handleApproveOrReject = (id, action) => {
    const data = { change_stage: action };
    const config = {
      method: "post",
      url: `http://127.0.0.1:8000/api/stage/${id}`,
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        Authorization: `Bearer  ${auth().token}`,
      },
      data: data,
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
  console.log(offerData.orderStage);
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
              Order Date: {offerData.created_at.split("T")[0]} at{" "}
              {offerData.created_at.split("T")[1].slice(0, 5)}
            </p>
          </div>
        </div>
        <Link to={`/orderDetails/${offerData.order_id}`}>
          <MDBBtn size="sm" rounded color="link">
            View Details
          </MDBBtn>
        </Link>
        <div>
          <h6 className="text-center">{offerData.orderStage}</h6>
          <div className="d-flex flex-column flex-md-row  justify-content-center ">
            <MDBBtn
              size="sm"
              rounded
              color="secondary"
              className="ms-2 mt-2"
              onClick={() => {
                handleApproveOrReject(offerData.order_id, "preparing");
              }}
            >
              preparing
            </MDBBtn>
            <MDBBtn
              size="sm"
              rounded
              color="warning"
              className="ms-2 mt-2"
              onClick={() => {
                handleApproveOrReject(offerData.order_id, "onDelivery");
              }}
            >
              onDelivery
            </MDBBtn>
            <MDBBtn
              size="sm"
              rounded
              color="success"
              className="ms-2 mt-2"
              onClick={() => {
                handleApproveOrReject(offerData.order_id, "Delivered");
              }}
            >
              delivered
            </MDBBtn>
          </div>
        </div>
      </MDBListGroupItem>
    </>
  );
}
