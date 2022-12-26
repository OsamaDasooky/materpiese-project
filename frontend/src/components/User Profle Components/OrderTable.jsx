import React from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBListGroupItem,
  MDBListGroup,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export default function OrderTable() {
  const userOrders = useSelector((state) => state.userData.userOrder);

  return (
    <MDBListGroup>
      {userOrders.map((userOrder) => {
        return (
          <MDBListGroupItem className="d-flex justify-content-between align-items-center px-2">
            <div className="d-flex align-items-center">
              <div className="d-flex flex-column flex-md-row  ">
                <p className="mb-1 ms-3" style={{ width: "250px" }}>
                  Shop name: <b>{userOrder.shopName.slice(0, 30)}</b>
                </p>
                <p className="mb-1  ms-3">
                  order ID: <b>{userOrder.order_id}</b>
                </p>
                <p className="mb-1  ms-3">
                  Amount : <b>{userOrder.total} JD</b>
                </p>

                <p className="text-muted mb-0  ms-3">
                  order date : <b>{userOrder.created_at.split("T")[0]}</b>
                </p>
              </div>
            </div>
            <Link to={"/orderDetails/" + userOrder.order_id}>
              <MDBBtn size="sm" rounded color="secondary">
                View Details
              </MDBBtn>
            </Link>
          </MDBListGroupItem>
        );
      })}
    </MDBListGroup>
  );
}
