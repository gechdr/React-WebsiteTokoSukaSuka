/* eslint-disable react/prop-types */
import Navbar from "./NavBar";
import "./style.css";

import ListPembeli from "./ListPembeli";
import CartPembeli from "./CartPembeli";
import HistoryPembeli from "./HistoryPembeli";
import { useSelector } from "react-redux";

function Pembeli() {
  const routePembeli = useSelector((state) => state.route.routePembeli);

  return (
    <>
      <Navbar></Navbar>
      {routePembeli == "list" && <ListPembeli></ListPembeli>}

      {routePembeli == "cart" && <CartPembeli></CartPembeli>}

      {routePembeli == "history" && <HistoryPembeli></HistoryPembeli>}
    </>
  );
}

export default Pembeli;
