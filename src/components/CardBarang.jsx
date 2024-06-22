import { useState } from "react";
import check from "../assets/check.png";
import formatter from "./formatter";
import { useDispatch, useSelector } from "react-redux";
import { setBarang } from "../redux/barangSlice";
import { setCart, updateCart } from "../redux/cartSlice";

/* eslint-disable react/prop-types */
function CardBarang(props) {
  const [stock, setStock] = useState(props.qty);

  const categories = useSelector((state) => state.kategori.listKategori);
  const items = useSelector((state) => state.barang.listBarang);
  const brands = useSelector((state) => state.merk.listMerk);
  const carts = useSelector((state) => state.cart.listCart);
  const dispatch = useDispatch();

  const getCategories = () => {
    let categoriesArr = [];
    if (props.kategori.length > 1) {
      for (let i = 0; i < props.kategori.length; i++) {
        const kategori = props.kategori[i];

        const temp = categories.find((c) => c.id == kategori);

        categoriesArr.push(temp.nama);
      }
    } else {
      const temp = categories.find((c) => c.id == props.kategori);
      categoriesArr.push(temp.nama);
    }

    let categoriesStr = categoriesArr.join(", ");

    return categoriesStr;
  };

  const getBrands = () => {
    const brand = brands.find((b) => b.id == props.merk);
    return brand.nama;
  };

  const save = () => {
    let newBarang = [];

    for (let i = 0; i < items.length; i++) {
      const e = items[i];

      if (e.id == props.id) {
        let newData = {
          id: props.id,
          nama: props.nama,
          harga: props.harga,
          qty: stock,
          kategori: props.kategori,
          merk: props.merk,
        };
        newBarang.push(newData);
      } else {
        newBarang.push(e);
      }
    }

    dispatch(setBarang(newBarang));
  };

  const addCart = () => {
    let tempCart = carts;
    let found = tempCart.find((c) => c.id == props.id);

    if (found) {
      let updateQtyCart = [];
      for (let i = 0; i < tempCart.length; i++) {
        let c = tempCart[i];

        if (c.id == props.id) {
          const b = items.find((b) => b.id == c.id);
          updateQtyCart.push({
            id: c.id,
            qty: 1,
            action: "+",
            max: b.qty,
          });
        }
      }

      dispatch(updateCart(updateQtyCart));
    } else {
      const tempBarang = items.find((b) => b.id == props.id);
      if (tempBarang.qty > 0) {
        let newCart = {
          id: props.id,
          nama: props.nama,
          harga: props.harga,
          qty: 1,
          kategori: props.kategori,
          merk: props.merk,
        };

        dispatch(setCart([...carts, newCart]));
      }
    }
  };

  return (
    <>
      <div className="col border-0 w-25">
        {props.qty < 10 && props.user == "admin" ? (
          <div
            className="card rounded-4 shadow-lg h-100 alerts-border"
            style={{ cursor: "pointer" }}
            data-bs-toggle="modal"
            data-bs-target={"#" + props.id + "addModal"}
          >
            <div className="card-body w-100 d-flex flex-column">
              <div>{props.id}</div>
              <div className="w-100 h-75">
                <h2 className="card-title">{props.nama}</h2>
              </div>
              <div className="w-100 pt-3">
                <h5 className="card-text">Kategori: {getCategories()}</h5>
              </div>
              <div className="w-100 pt-3">
                <h5 className="card-text">Merk: {getBrands()}</h5>
              </div>
              <div className="d-flex mt-3 align-items-center">
                <div className="w-100">
                  <h4 className="card-text">{formatter.format(props.harga)}</h4>
                </div>
                <div className="w-50 d-flex justify-content-end pe-3">
                  <p className="card-text fw-bold text-danger">
                    Stock: {props.qty}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : props.user == "admin" ? (
          <div
            className="card rounded-4 shadow h-100"
            style={{ cursor: "pointer" }}
            data-bs-toggle="modal"
            data-bs-target={"#" + props.id + "addModal"}
          >
            <div className="card-body w-100 d-flex flex-column">
              <div>{props.id}</div>
              <div className="w-100 h-75">
                <h2 className="card-title">{props.nama}</h2>
              </div>
              <div className="w-100 pt-3">
                <h5 className="card-text">Kategori: {getCategories()}</h5>
              </div>
              <div className="w-100 pt-3">
                <h5 className="card-text">Merk: {getBrands()}</h5>
              </div>
              <div className="d-flex mt-3 align-items-center">
                <div className="w-100">
                  <h4 className="card-text">{formatter.format(props.harga)}</h4>
                </div>
                <div className="w-50 d-flex justify-content-end pe-3">
                  <p className="fw-bold card-text">Stock: {props.qty}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="card rounded-4 shadow h-100">
            <div className="card-body w-100 d-flex flex-column">
              <div>{props.id}</div>
              <div className="w-100 h-75">
                <h2 className="card-title">{props.nama}</h2>
              </div>
              <div className="w-100 pt-3">
                <h5 className="card-text">Kategori: {getCategories()}</h5>
              </div>
              <div className="w-100 pt-3">
                <h5 className="card-text">Merk: {getBrands()}</h5>
              </div>
              <div className="d-flex mt-3 align-items-center">
                <div className="w-100">
                  <h4 className="card-text">{formatter.format(props.harga)}</h4>
                </div>
                <div className="w-50 d-flex justify-content-end pe-3">
                  <p className="fw-bold card-text">Stock: {props.qty}</p>
                </div>
              </div>
              <div className="mt-3 d-flex justify-content-end align-items-center">
                <button
                  className="fs-4 border-0 rounded-3 py-2 px-3 text-white"
                  style={{ backgroundColor: "#7c2023" }}
                  data-bs-toggle="modal"
                  data-bs-target={"#" + props.id + "addCartModal"}
                  onClick={addCart}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}

      <div
        className="modal shadow"
        id={props.id + "addModal"}
        tabIndex={-1}
        aria-labelledby={props.id + "addModalLabel"}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Tambah Stock
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setStock(props.qty)}
              ></button>
            </div>
            <div className="modal-body d-flex justify-content-center align-items-center">
              <div className="w-75 h-100 d-flex justify-content-end">
                <input
                  className="w-50 fs-2 text-end me-3"
                  type="number"
                  value={stock}
                  disabled
                />
              </div>
              <div className="w-50 h-100">
                <button
                  className="border-0 w-25 h-100 d-flex justify-content-center align-items-center p-0"
                  onClick={() => setStock(stock + 1)}
                  style={{
                    width: "10%",
                    height: "10%",
                    backgroundColor: "#a1a1a1",
                  }}
                >
                  <span className="fs-2 text-white">+</span>
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn text-white"
                style={{ backgroundColor: "#7c2023" }}
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={save}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal shadow"
        id={props.id + "addCartModal"}
        tabIndex={-1}
        aria-labelledby={props.id + "addCartModalLabel"}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body d-flex justify-content-center align-items-center flex-column">
              <img className="img-fluid w-25 h-25" src={check} alt="check" />
              <h1>Berhasil ditambahkan!</h1>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn text-white"
                style={{ backgroundColor: "#7c2023" }}
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardBarang;
