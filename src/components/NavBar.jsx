import { useDispatch, useSelector } from "react-redux";
import {
  setRoute,
  setId,
  setRoutePembeli,
  setRouteKasir,
  setRouteAdmin,
  setActive,
} from "../redux/routeSlice";
import { setCart } from "../redux/cartSlice";

/* eslint-disable react/prop-types */
function Navbar() {
  const id = useSelector((state) => state.route.id);
  const users = useSelector((state) => state.user.listUser);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(setId(-1));
    dispatch(setRoute("login"));
    dispatch(setCart([]));
    dispatch(setRouteAdmin("list"));
    dispatch(setRoutePembeli("list"));
    dispatch(setRouteKasir("home"));
    dispatch(setActive(null));
  };

  const capitalizeWords = (word) => {
    const firstLetter = word.charAt(0).toUpperCase();
    const rest = word.slice(1).toLowerCase();

    return firstLetter + rest;
  };

  let user = "";
  if (id == -1) {
    user = { id: id, username: "admin", role: "admin" };
  } else {
    user = users.find((u) => u.id == id);
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-black border-bottom border-3 border-black">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="w-75 px-4 py-2">
              {user.role == "admin" ? (
                <h1 className="text-white">
                  Welcome, {capitalizeWords(user.username)}!
                </h1>
              ) : (
                <h1 className="text-white">
                  Welcome, {capitalizeWords(user.username)}! (
                  {capitalizeWords(user.role.toLowerCase())})
                </h1>
              )}
            </div>
            <div className="w-25 d-flex justify-content-end px-4">
              <button
                className="btn text-white fs-3 text-white"
                style={{ backgroundColor: "#7c2023" }}
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
