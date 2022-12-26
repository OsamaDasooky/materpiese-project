import React from "react";
import { MDBBtn, MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <>
      <MDBCarousel showControls showIndicators dark fade>
        <MDBCarouselItem
          style={{ height: "60vh", filter: "brightness(0.5)" }}
          className="w-100 d-block"
          itemId={1}
          src="https://cdn.searchenginejournal.com/wp-content/uploads/2020/04/should-you-discount-your-seo-services-because-of-coronavirus-5e8c7fb2d5d72.png"
          alt="..."
        ></MDBCarouselItem>
        <MDBCarouselItem
          style={{
            height: "60vh",
            filter: "brightness(0.5)",
            display: "block ",
          }}
          className="w-100 d-block"
          itemId={2}
          src="https://media.istockphoto.com/id/669966070/photo/sale-background.jpg?s=170667a&w=0&k=20&c=U79_-Jv3FQ2tqnfhNWl7ymncQq0VyZtANBxtbEn3lVw="
          alt="..."
        ></MDBCarouselItem>

        <MDBCarouselItem
          style={{ height: "60vh", filter: "brightness(0.5)" }}
          className="w-100 d-block"
          itemId={3}
          src="https://img.freepik.com/free-vector/modern-sale-banner-with-text-space-area_1017-27331.jpg?w=2000"
          alt="..."
        ></MDBCarouselItem>
      </MDBCarousel>
      <div
        className="text-white mb-5 position-relative text-center"
        style={{ zIndex: 1, top: -200, left: "0" }}
      >
        <h1>3rood To Make you smile</h1>
        <p>All the offers you need in the same place</p>
        <Link to="/shops">
          <MDBBtn className="mx-2" color="dark">
            Shop Now
          </MDBBtn>
        </Link>
      </div>
    </>
  );
}
