import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
  shopInfo: { shopId: 0, shopName: "" },
  orderInfo: { shopId: 0, total: 0 },
  productsForOrder: [],
  products: [],
  items: 0,
};
export const alert = (title) => {
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
    title: title,
  });
};
export const CartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (state.orderInfo.shopId == action.payload.shopData.shop_id) {
        //add product price to total order price
        state.orderInfo.total += action.payload.productData.productPrice;
        //save product Data to display it in cart and checkout pages
        state.products.push(action.payload.productData);
        state.productsForOrder.push({
          productId: action.payload.productData.product_id,
          quantity: 1,
        });
        // increment in total items in cart
        state.items += 1;
        alert("product add to cart successfully");
      } else if (state.orderInfo.shopId == 0) {
        // save the shop that user want to order from
        state.shopInfo.shopName = action.payload.shopData.shopName;
        state.shopInfo.shopId = action.payload.shopData.shop_id;

        //add product price to total order price and save the shop that user want to order from (for backend)
        state.orderInfo.shopId = action.payload.shopData.shop_id;
        state.orderInfo.total += action.payload.productData.productPrice;

        //save product Data to display it in cart and checkout pages
        state.products.push(action.payload.productData);
        state.productsForOrder.push({
          productId: action.payload.productData.product_id,
          quantity: 1,
        });

        // increment in total items in cart
        state.items += 1;

        alert("product add to cart successfully");
      }
    },
    removeFromCart: (state, action) => {
      state.products = state.products.filter((product, index) => {
        if (product.product_id != action.payload.product_id) {
          return true;
        } else {
          state.items -= 1;

          state.orderInfo.total -=
            product.productPrice * state.productsForOrder[index].quantity;
        }
      });
      state.productsForOrder = state.productsForOrder.filter((product) => {
        return product.productId != action.payload.product_id;
      });
    },
    switchShop: (state, action) => {
      //add product price to total order price and save the shop that user want to order from (for backend)
      state.orderInfo.shopId = action.payload.shopData.shop_id;
      state.orderInfo.total = action.payload.productData.productPrice;
      // save the shop that user want to order from
      state.shopInfo.shopId = action.payload.shopData.shop_id;
      state.shopInfo.shopName = action.payload.shopData.shopName;
      //save product Data to display it in cart and checkout pages
      state.products = [action.payload.productData];
      state.productsForOrder = [
        {
          productId: action.payload.productData.product_id,
          quantity: 1,
        },
      ];
      // reset number of items in cart
      state.items = 1;
      alert(
        `product add to cart successfully and your cart from ${state.shopInfo.shopName}`
      );
    },
    increaseQuantity: (state, action) => {
      state.products.map((product, index) => {
        if (product.product_id == action.payload.product_id) {
          state.productsForOrder[index].quantity += 1;
          return (state.orderInfo.total += product.productPrice);
        }
      });
    },
    decreesQuantity: (state, action) => {
      state.products.map((product, index) => {
        if (product.product_id == action.payload.product_id) {
          if (state.productsForOrder[index].quantity !== 1) {
            state.productsForOrder[index].quantity -= 1;
            return (state.orderInfo.total -= product.productPrice);
          }
        }
      });
    },
    emptyCart: (state) => {
      state.shopInfo = { shopId: 0, shopName: "" };
      state.orderInfo = { shopId: 0, total: 0 };
      state.productsForOrder = [];
      state.products = [];
      state.items = 0;
    },
  },
});
export const {
  addToCart,
  removeFromCart,
  switchShop,
  increaseQuantity,
  decreesQuantity,
  emptyCart,
} = CartReducer.actions;

export default CartReducer.reducer;
