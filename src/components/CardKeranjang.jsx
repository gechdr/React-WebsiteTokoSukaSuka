/* eslint-disable react/prop-types */
import { useState } from "react";
import add from "../assets/add.png";
import minus from "../assets/minus.png";
import formatter from "./formatter";

function CardKeranjang(props) {
  const [quantity, setQuantity] = useState(props.qty);

  const getCategories = (kategori) => {
    let categoriesArr = [];
    if (kategori.length > 1) {
      for (let i = 0; i < kategori.length; i++) {
        const k = kategori[i];

        const temp = props.categories.find((c) => c.id == k);

        categoriesArr.push(temp.nama);
      }
    } else {
      const temp = props.categories.find((c) => c.id == kategori);
      categoriesArr.push(temp.nama);
    }

    let categoriesStr = categoriesArr.join(", ");

    return categoriesStr;
  };

  const getBrands = (merk) => {
    const brand = props.brands.find((b) => b.id == merk);
    return brand.nama;
  };

  const handlePlus = () => {
    // Plus
    let q = quantity;
    q = q + 1;

    let tempBarang = props.barang.find((b) => b.id == props.id);

    if (q > tempBarang.qty) {
      q = tempBarang.qty;
    }
    setQuantity(q);
    updateData("+");
  };

  const handleMinus = () => {
    // Minus
    let q = quantity;
    q = q - 1;

    if (q < 0) {
      q = 0;
    }
    setQuantity(q);
    updateData("-");
  };

  const updateData = (e) => {
    let tempCart = props.cart;
    let newCart = [];

    for (let i = 0; i < tempCart.length; i++) {
      let c = tempCart[i];

      if (c.id == props.id) {
        if (e == "+") {
          c.qty += 1;

          const b = props.barang.find((b) => b.id == c.id);
          if (c.qty > b.qty) {
            c.qty = b.qty;
          }
        } else {
          c.qty -= 1;
        }
      }

      if (c.qty > 0) {
        newCart.push(c);
      }
    }

    props.setCart(newCart);
  };

  return (
    <>
      <div className="col border-0 w-100">
        <div className="card rounded-4 shadow h-100">
          <div className="card-body w-100 d-flex flex-column">
            <div>{props.id}</div>
            <div className="w-100 h-75">
              <h2 className="card-title">{props.nama}</h2>
            </div>
            <div className="w-100 pt-3">
              <h5 className="card-text">
                Kategori: {getCategories(props.kategori)}
              </h5>
            </div>
            <div className="w-100 pt-3">
              <h5 className="card-text">Merk: {getBrands(props.merk)}</h5>
            </div>
            <div className="d-flex mt-3 align-items-center">
              <div className="w-100">
                <h4 className="card-text">
                  Harga: {formatter.format(props.harga)}
                </h4>
              </div>
              <div className="w-50 d-flex align-items-center justify-content-end pe-3">
                <button
                  type="button"
                  className="btn btn-danger btn-rounded d-flex justify-content-center mx-2"
                  style={{ backgroundColor: "#7c2023" }}
                  onClick={handleMinus}
                >
                  <img src={minus} alt="buttonMinus" />
                </button>
                <div className="w-25 d-flex justify-content-center align-items-center">
                  <span className="fs-3">{quantity}</span>
                </div>
                <button
                  type="button"
                  className="btn btn-rounded d-flex justify-content-center mx-2"
                  style={{ backgroundColor: "#7c2023" }}
                  onClick={handlePlus}
                >
                  <img src={add} alt="buttonAdd" />
                </button>
              </div>
            </div>
            <div className="w-100 mt-3">
              <h4 className="card-text">
                Subtotal: {formatter.format(props.harga * quantity)}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardKeranjang;
