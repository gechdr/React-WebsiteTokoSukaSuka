/* eslint-disable react/prop-types */
import { useState } from "react";
import Navbar from "./NavBar";
import "./style.css";

import ListPembeli from "./ListPembeli";
import CartPembeli from "./CartPembeli";
import HistoryPembeli from "./HistoryPembeli";

function Pembeli(props) {
  const [routePembeli, setRoutePembeli] = useState("list");

  return (
    <>
      <Navbar
        users={props.users}
        id={props.id}
        setId={props.setId}
        setRoute={props.setRoute}
        setCart={props.setCart}
      ></Navbar>
      {routePembeli == "list" && (
        <ListPembeli
          barang={props.barang}
          setBarang={props.setBarang}
          categories={props.categories}
          brands={props.brands}
          cart={props.cart}
          setCart={props.setCart}
          setRoutePembeli={setRoutePembeli}
        ></ListPembeli>
      )}

      {routePembeli == "cart" && (
        <CartPembeli
          setRoutePembeli={setRoutePembeli}
          cart={props.cart}
          setCart={props.setCart}
          categories={props.categories}
          brands={props.brands}
          barang={props.barang}
          transaction={props.transaction}
          setTransaction={props.setTransaction}
          id={props.id}
        ></CartPembeli>
      )}

      {routePembeli == "history" && (
        <HistoryPembeli
          id={props.id}
          transaction={props.transaction}
          setRoutePembeli={setRoutePembeli}
        ></HistoryPembeli>
      )}
    </>
  );
}

export default Pembeli;
