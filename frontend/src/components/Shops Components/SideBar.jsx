import React, { useState } from "react";
import {
  MDBRow,
  MDBCol,
  MDBRadio,
  MDBInput,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { Shops } from "./Shops";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllShops,
  filterShopsByCategory,
  reset,
  searchShops,
} from "../../redusers/AllShopsReducer";
import axios from "axios";

export const SideBar = () => {
  const dispatch = useDispatch();
  const { allShopsForFilter, isLoading } = useSelector((state) => state.shops);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (allShopsForFilter.length === 0) {
      dispatch(fetchAllShops());
    }
    dispatch(reset());
  }, []);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/allCategory")
      .then((res) => setCategories(res.data.data))
      .catch((err) => console.log(err));
  }, []);
  if (isLoading) {
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
      <MDBRow className="g-0 justify-content-between align-items-start">
        <MDBCol className="col-4 col-md-2 mt-5">
          <div className="d-flex mb-3 mx-md-3">
            <MDBInput
              label="Search"
              onChange={(e) => {
                dispatch(searchShops(e.target.value));
              }}
            />
          </div>
          <h4
            className="text-center mb-3"
            style={{ color: " #ed2647", fontWeight: 700 }}
          >
            Categories
          </h4>
          <div className="ms-md-4">
            <MDBRadio
              btn
              btnColor="light"
              id="btn-radio"
              name="category"
              wrapperTag="div"
              wrapperClass="mx-2 my-2"
              label="All"
              onChange={(e) => {
                dispatch(reset());
              }}
              defaultChecked
            />

            {categories?.map((category, index) => {
              return (
                <MDBRadio
                  btn
                  btnColor="light"
                  id={"btn-radio" + index}
                  name="category"
                  wrapperTag="div"
                  label={category.categoryName}
                  wrapperClass="mx-2 my-2"
                  onChange={(e) => {
                    dispatch(
                      filterShopsByCategory(e.target.labels[0].innerHTML)
                    );
                  }}
                />
              );
            })}
          </div>
        </MDBCol>
        <MDBCol className="col-8 col-md-10 mt-5 px-4 pt-4">
          <MDBRow className="g-0 justify-content-evenly align-items-center g-2">
            {allShopsForFilter?.map((shop) => {
              return <Shops shopData={shop} key={shop.shopName} />;
            })}
          </MDBRow>
        </MDBCol>
      </MDBRow>
    </>
  );
};
