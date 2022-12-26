import React, { useState } from "react";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBRow,
  MDBSpinner,
  MDBListGroup,
} from "mdb-react-ui-kit";
import OfferForShop from "./OfferForShop";
import ApprovedOrder from "./ApprovedOrder";
import PendingOrder from "./PendingOrder";
import { useSelector } from "react-redux";

export default function PillsForShop() {
  const [basicActive, setBasicActive] = useState("tab1");
  const { shopData } = useSelector((state) => state.shopProfile);
  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }
    setBasicActive(value);
  };

  if (shopData.length == 0) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <MDBSpinner role="status " style={{ width: "3rem", height: "3rem" }}>
          <span className="visually-hidden">Loading...</span>
        </MDBSpinner>
      </div>
    );
  }
  return (
    <>
      <MDBTabs pills className="mb-3">
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleBasicClick("tab1")}
            active={basicActive === "tab1"}
            style={{ color: "white" }}
          >
            Active Offers
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleBasicClick("tab2")}
            active={basicActive === "tab2"}
            style={{ color: "white" }}
          >
            Orders
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={basicActive === "tab1"}>
          <MDBRow className="g-0 justify-content-start align-items-start ">
            {shopData.shop_products?.map((offer) => {
              return <OfferForShop offerData={offer} />;
            })}
          </MDBRow>
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === "tab2"}>
          <h3 className="my-4" style={{ color: " #ed2647", fontWeight: 600 }}>
            Pending Order
          </h3>
          <MDBListGroup>
            {shopData.shop_orders?.map((offer) => {
              if (offer.orderStatus == "pending") {
                return <PendingOrder offerData={offer} />;
              }
            })}
          </MDBListGroup>
          <hr />
          <h3 className="my-4" style={{ color: " #ed2647", fontWeight: 600 }}>
            Approved Order
          </h3>
          <MDBListGroup>
            {shopData.shop_orders?.map((offer) => {
              if (
                offer.orderStatus == "approved" &&
                offer.orderStage != "Delivered"
              ) {
                return <ApprovedOrder offerData={offer} />;
              }
            })}
          </MDBListGroup>
        </MDBTabsPane>
      </MDBTabsContent>
    </>
  );
}
