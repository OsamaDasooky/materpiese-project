import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import { RequireAuth, useAuthUser, useIsAuthenticated } from "react-auth-kit";

import { Home } from "./components/pages/Home";
import { About } from "./components/pages/About";
import { Contact } from "./components/pages/Contact";
import Footer from "./components/Footer";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import { Shops } from "./components/pages/Shops";
import ShopLogin from "./components/pages/ShopLogin";
import JoinUs from "./components/pages/JoinUs";
import { ShopProfile } from "./components/pages/ShopProfile";
import UserProfile from "./components/pages/UserProfile";
import OrderDetails from "./components/pages/OrderDetails";
import EditProfile from "./components/pages/EditProfile";
import { Cart } from "./components/pages/Cart";
import { Checkout } from "./components/pages/Checkout";
import { ShopOwner } from "./components/pages/ShopOwner";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserProfile } from "./redusers/UserData";
import Authorization from "./Authorization";
import { PageNotFound } from "./PageNotFound";

function App() {
  //---------------------------------------------------------------------//
  // this code to fitch user information if he is isAuthenticated to make accusable every were
  const auth = useAuthUser();
  const isAuthenticated = useIsAuthenticated();
  const { userData } = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated() && userData.length === 0) {
      dispatch(fetchUserProfile(auth().token));
    }
  }, []);
  //---------------------------------------------------------------------//
  return (
    <>
      <NavBar />
      <Routes>
        {/* ----------public routes----------- */}
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <Authorization forAuth={false}>
              <Login />
            </Authorization>
          }
        />
        <Route
          path="/shopLogin"
          element={
            <Authorization forAuth={false}>
              <ShopLogin />
            </Authorization>
          }
        />
        <Route
          path="/joinUs"
          element={
            <Authorization forAuth={false}>
              <JoinUs />
            </Authorization>
          }
        />
        <Route
          path="/register"
          element={
            <Authorization forAuth={false}>
              <Register />
            </Authorization>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/cart"
          element={
            <Authorization deny={"shop"}>
              <Cart />
            </Authorization>
          }
        />
        <Route
          path="/shops"
          element={
            <Authorization deny={"shop"}>
              <Shops />
            </Authorization>
          }
        />
        <Route
          path="/shopProfile/:shopName"
          element={
            <Authorization deny={"shop"}>
              <ShopProfile />
            </Authorization>
          }
        />
        {/* ----------user routes-------------- */}
        <Route
          path="/checkout"
          element={
            <RequireAuth loginPath={"/login"}>
              <Authorization permissions="user">
                <Checkout />
              </Authorization>
            </RequireAuth>
          }
        />
        <Route
          path="/orderDetails/:id"
          element={
            <RequireAuth loginPath={"/login"}>
              <OrderDetails />
            </RequireAuth>
          }
        />
        <Route
          path="/userProfile"
          element={
            <RequireAuth loginPath={"/login"}>
              <Authorization deny={"shop"}>
                <UserProfile />
              </Authorization>
            </RequireAuth>
          }
        />
        <Route
          path="/userProfile/edit"
          element={
            <RequireAuth loginPath={"/login"}>
              <Authorization deny={"shop"}>
                <EditProfile />
              </Authorization>
            </RequireAuth>
          }
        />
        {/* ----------shop routes-------------/ */}
        <Route
          path="/shopOwner"
          element={
            <RequireAuth loginPath={"/login"}>
              <Authorization permissions="shop">
                <ShopOwner />
              </Authorization>
            </RequireAuth>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
