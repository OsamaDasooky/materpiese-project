import React from "react";
import {
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, switchShop } from "../../redusers/CartReduser";
import Swal from "sweetalert2";

function ShopProduct({ productData, shopData }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleAddToCart = () => {
    if (
      cart.shopInfo.shopId !== 0 &&
      cart.shopInfo.shopId !== shopData.shop_id
    ) {
      Swal.fire({
        title: "Are you sure?",
        html: `Your order from <b>${cart.shopInfo.shopName}</b> shop. <br/>Do you want to continue with <b>${shopData.shopName}</b>`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#332d2d",
        cancelButtonColor: "#dc4c64",
        confirmButtonText: "Yes, Continue",
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("ok lets go");
          dispatch(
            switchShop({ productData: productData, shopData: shopData })
          );
        }
      });
    }
    dispatch(addToCart({ productData: productData, shopData: shopData }));
  };
  return (
    <MDBCol md="6" lg="3" className="mb-4 ps-2">
      <MDBCard>
        <MDBCardImage
          src={productData.productPhoto}
          position="top"
          alt="Laptop"
        />
        <MDBCardBody>
          <div className="d-flex justify-content-between">
            <p className="small">Duo to</p>
            <p className="small text-secondary">{productData.expirationDate}</p>
          </div>

          <div
            className="d-flex justify-content-between mb-3 align-items-center"
            style={{ minHeight: 60 }}
          >
            <h5 className="mb-0">{productData.productName}</h5>
            <h5 className="text-danger mb-0">{productData.productPrice}JD</h5>
          </div>

          <div class="d-flex justify-content-center mb-2">
            <MDBBtn
              outline
              className="mx-2"
              color="dark"
              onClick={handleAddToCart}
            >
              Add To Cart
            </MDBBtn>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
}

export default ShopProduct;
