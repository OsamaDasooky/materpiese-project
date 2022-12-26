import {
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

export default function Zigzag() {
  return (
    <MDBContainer className="position-relative" style={{ top: -50 }}>
      <div className="mx-auto py-5 ">
        <MDBRow className="g-0 justify-content-between align-items-center">
          <MDBCol md="5">
            <MDBCardImage
              src="https://imageio.forbes.com/specials-images/imageserve/5f2982a05d9f67f9bbbca5df/Two-women-small-business-owners-accepting-new-orders-online/0x0.jpg?format=jpg&crop=5012,3759,x665,y0,safe&width=960"
              alt="..."
              fluid
              className="rounded"
            />
          </MDBCol>
          <MDBCol md="6">
            <MDBCardBody className="px-5 py-5 d-flex flex-column justify-content-between">
              <MDBCardTitle className="h1 mb-3">Small Business</MDBCardTitle>
              <MDBCardText>
                <div className="mb-4 ">
                  <p className="mb-3 lh-lg">
                    Lorem Ipsum dolor sit amet, consectetur adipsicing kengan
                    omeg kohm tokito Professional charity theme based Sed leo
                    nisl, posuere at molestie ac, suscipit auctor mauris. Etiam
                    quis metus
                  </p>
                  <Link to="/joinUs">
                    <MDBBtn className="mx-2" color="dark">
                      Join Us Now
                    </MDBBtn>
                  </Link>
                </div>
              </MDBCardText>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
        <MDBRow className="g-0 mt-5 justify-content-between align-items-center">
          <MDBCol md="6">
            <MDBCardBody className=" d-flex flex-column justify-content-between">
              <MDBCardTitle className="h1 mb-3">
                people who want to sell item
              </MDBCardTitle>
              <MDBCardText>
                <div className="mb-4 ">
                  <p className="mb-3 lh-lg">
                    Lorem Ipsum dolor sit amet, consectetur adipsicing kengan
                    omeg kohm tokito Professional charity theme based Sed leo
                    nisl, posuere at molestie ac, suscipit auctor mauris. Etiam
                    quis metus
                  </p>
                  <Link to="/joinUs">
                    <MDBBtn className="mx-2" color="dark">
                      Join Us Now
                    </MDBBtn>
                  </Link>
                </div>
              </MDBCardText>
            </MDBCardBody>
          </MDBCol>
          <MDBCol md="5">
            <MDBCardImage
              src="https://media.istockphoto.com/id/500797791/photo/portrait-of-smiling-woman-with-box-at-yard-sale.jpg?b=1&s=170667a&w=0&k=20&c=6VH0TOEuRxSRHqBKPCVJgVNes67qOVa4UdZCaKkqyyM="
              alt="..."
              fluid
              className="rounded"
            />
          </MDBCol>
        </MDBRow>
      </div>
    </MDBContainer>
  );
}
