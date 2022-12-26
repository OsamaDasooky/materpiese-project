import React from "react";
import { Link } from "react-router-dom";

export const Categories = () => {
  return (
    <div
      className="row mb-3 mx-0 justify-content-evenly position-relative"
      style={{ top: -100 }}
    >
      <div className="col-lg-4 col-md-6 col-6 mb-4 mb-lg-0">
        <div className="featured-block d-flex justify-content-center align-items-center hover-zoom">
          <Link className="d-block">
            <img
              src="https://cdn-icons-png.flaticon.com/128/2515/2515263.png"
              className="featured-block-image img-fluid"
              alt=""
              width="150px"
            />

            <h4
              className="featured-block-text text-center mt-3"
              style={{ color: " #ed2647" }}
            >
              <strong>Food</strong> Offers
            </h4>
          </Link>
        </div>
      </div>
      <div className="col-lg-4 col-md-6 col-6 mb-4 mb-lg-0">
        <div className="featured-block d-flex justify-content-center align-items-center hover-zoom">
          <Link className="d-block">
            <img
              src="https://cdn-icons-png.flaticon.com/128/3211/3211391.png"
              width="150px"
              className="featured-block-image img-fluid"
              alt=""
            />

            <h4
              className="featured-block-text text-center mt-3"
              style={{ color: " #ed2647" }}
            >
              <strong>Fashion</strong> Offers
            </h4>
          </Link>
        </div>
      </div>
      <div className="col-lg-4 col-md-6 col-6 mb-4 mb-lg-0">
        <div className="featured-block d-flex justify-content-center align-items-center hover-zoom">
          <Link className="d-block">
            <img
              src="https://cdn-icons-png.flaticon.com/128/862/862856.png"
              className="featured-block-image img-fluid"
              alt=""
              width="150px"
            />

            <h4
              className="featured-block-text text-center mt-3"
              style={{ color: " #ed2647" }}
            >
              <strong>Mart</strong> Offers
            </h4>
          </Link>
        </div>
      </div>
    </div>
  );
};
