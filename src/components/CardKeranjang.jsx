/* eslint-disable react/prop-types */
import { useState } from "react";
import add from "../assets/add.png";
import minus from "../assets/minus.png";
import formatter from "./formatter";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../redux/cartSlice";

function CardKeranjang(props) {
  const [quantity, setQuantity] = useState(props.qty);

  const items = useSelector((state) => state.barang.listBarang);
  const categories = useSelector((state) => state.kategori.listKategori);
  const brands = useSelector((state) => state.merk.listMerk);
  const carts = useSelector((state) => state.cart.listCart);
  const dispatch = useDispatch();

  const getCategories = (kategori) => {
    let categoriesArr = [];
    if (kategori.length > 1) {
      for (let i = 0; i < kategori.length; i++) {
        const k = kategori[i];

        const temp = categories.find((c) => c.id == k);

        categoriesArr.push(temp.nama);
      }
    } else {
      const temp = categories.find((c) => c.id == kategori);
      categoriesArr.push(temp.nama);
    }

    let categoriesStr = categoriesArr.join(", ");

    return categoriesStr;
  };

  const getBrands = (merk) => {
    const brand = brands.find((b) => b.id == merk);
    return brand.nama;
  };

  const handlePlus = () => {
    // Plus
    let q = quantity;
    q = q + 1;

    let tempBarang = items.find((b) => b.id == props.id);

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
    let tempCart = carts;
    
    let updateQtyCart = [];
    for (let i = 0; i < tempCart.length; i++) {
      let c = tempCart[i];

      if (c.id == props.id) {
        const b = items.find((b) => b.id == c.id);
        updateQtyCart.push({
          id: c.id,
          qty: 1,
          action: e,
          max: b.qty,
        });
      }
    }

    dispatch(updateCart(updateQtyCart));
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
