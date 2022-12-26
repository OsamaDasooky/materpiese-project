import React, { useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBBadge,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "./asset/BrandFiles/3rood-low-resolution-logo-color-on-transparent-background.png";
import { useAuthUser, useSignOut } from "react-auth-kit";
import { useIsAuthenticated } from "react-auth-kit";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart } from "../redusers/CartReduser";
import { userLogout } from "../redusers/UserData";

export default function NavBar() {
  const [showBasic, setShowBasic] = useState(false);
  const auth = useAuthUser();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const signOut = useSignOut();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const logout = () => {
    axios.request({
      method: "delete",
      url: "http://127.0.0.1:8000/api/logout",
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        Authorization: `Bearer ${auth().token}`,
      },
    });
  };
  return (
    <MDBNavbar expand="lg" light sticky bgColor="light">
      <MDBContainer fluid>
        <MDBNavbarBrand>
          <img src={logo} height="30" alt="" loading="lazy" />
        </MDBNavbarBrand>
        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className="mr-auto mb-2 mb-lg-0 justify-content-center">
            <MDBNavbarItem>
              <MDBNavbarLink>
                <NavLink to="/" className="text-dark">
                  Home
                </NavLink>
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink>
                <NavLink to="/shops" className="text-dark">
                  Shops
                </NavLink>
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink>
                <NavLink to="/joinUs" className="text-dark">
                  Join Us
                </NavLink>
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink>
                <NavLink to="/about" className="text-dark">
                  About
                </NavLink>
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink>
                <NavLink to="/contact" className="text-dark">
                  Contact
                </NavLink>
              </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>

          <MDBNavbarNav
            className="justify-content-end align-items-center flex-row "
            style={{ flexBasis: "20%" }}
          >
            {auth()?.role != "shop" ? (
              <Link to="/cart">
                <MDBNavbarLink>
                  <MDBBadge pill color="danger">
                    {cartItems}
                  </MDBBadge>
                  <span>
                    <MDBIcon fas icon="shopping-cart" />
                  </span>
                </MDBNavbarLink>
              </Link>
            ) : (
              ""
            )}

            {!isAuthenticated() ? (
              <MDBDropdown>
                <MDBDropdownToggle className="ms-3 me-lg-0 align-self-center px-3 bg-dark">
                  Login
                  <MDBIcon fas icon="sign-in-alt" />
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem className="py-2 px-3 ">
                    <Link to="/login" className="text-dark">
                      As User
                    </Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem className="py-2 px-3 ">
                    <Link to="/shopLogin" className="text-dark">
                      As Shop
                    </Link>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            ) : auth().role == "user" ? (
              <MDBNavbarItem className="px-3">
                <MDBDropdown>
                  <MDBDropdownToggle tag="a" className="nav-link" role="button">
                    <img src={auth()?.user.useProfile} alt="" width="40px" />
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem className="py-2 px-3 ">
                      <Link to="/userProfile/edit" className="text-dark">
                        Edit profile
                      </Link>
                    </MDBDropdownItem>
                    <MDBDropdownItem className="py-2 px-3 ">
                      <Link to="/userProfile" className="text-dark">
                        View Profile
                      </Link>
                    </MDBDropdownItem>
                    <MDBDropdownItem
                      className="py-2 px-3 text-danger"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        signOut();
                        logout();
                        dispatch(emptyCart());
                        dispatch(userLogout());
                        navigate("/", { replace: true });
                      }}
                    >
                      Logout
                      <MDBIcon fas icon="sign-out-alt" />
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
            ) : (
              <MDBNavbarItem className="px-3">
                <MDBDropdown>
                  <MDBDropdownToggle tag="a" className="nav-link" role="button">
                    <img src={auth()?.shop?.ProfilePhoto} alt="" width="40px" />
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem className="py-2 px-3 ">
                      <Link to="/shopOwner" className="text-dark">
                        View Profile
                      </Link>
                    </MDBDropdownItem>
                    <MDBDropdownItem
                      className="py-2 px-3 text-danger"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        signOut();
                        logout();
                        navigate("/", { replace: true });
                      }}
                    >
                      Logout
                      <MDBIcon fas icon="sign-out-alt" />
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
            )}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
