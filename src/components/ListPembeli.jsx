/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import CardBarang from "./CardBarang";
import notFound from "../assets/notFound.png";

function ListPembeli(props) {
  const [filterCategory, setFilterCategory] = useState(-1);
  const [filterBrand, setFilterBrand] = useState(-1);

  const [isLoading, setIsLoading] = useState(true);
  const [datas, setDatas] = useState(props.barang);

  useEffect(() => {
    // Filter
    let newBarang = [];
    setDatas([]);

    if (filterCategory != -1) {
      let temp = props.barang.filter((b) =>
        b.kategori.toString().includes(filterCategory)
      );
      if (filterBrand != -1) {
        temp = temp.filter((b) => b.merk == filterBrand);
      }
      newBarang = [...temp];
    } else if (filterBrand != -1) {
      let temp = props.barang.filter((b) => b.merk == filterBrand);
      newBarang = [...temp];
    }

    if (filterCategory == -1 && filterBrand == -1) {
      setDatas(props.barang);
    } else {
      setDatas(newBarang);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, [1000]);
  }, [filterCategory, filterBrand, props.barang]);

  return (
    <>
      <div className="d-flex align-items-center pt-4">
        <h1 className="px-5">List Barang</h1>
        <div
          className="ms-5 d-flex align-items-center"
          style={{ width: "20%" }}
        >
          <label className="fs-4 me-2 pb-1">Kategori:</label>
          <select
            className="form-select"
            id="inputGroupSelect01"
            onChange={(e) => {
              setFilterCategory(e.target.value);
              setIsLoading(true);
            }}
          >
            <option key={-1} value={-1}>
              None
            </option>
            {props.categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nama}
              </option>
            ))}
          </select>
        </div>
        <div
          className="ms-5 d-flex align-items-center"
          style={{ width: "20%" }}
        >
          <label className="fs-4 me-2 pb-1">Merk:</label>
          <select
            className="form-select"
            id="inputGroupSelect02"
            onChange={(e) => {
              setFilterBrand(e.target.value);
              setIsLoading(true);
            }}
          >
            <option key={-1} value={-1}>
              None
            </option>
            {props.brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.nama}
              </option>
            ))}
          </select>
        </div>
        <div className="w-25 ms-auto d-flex justify-content-end me-5">
          <button
            className="border-0 rounded-3 fs-4 w-25 mx-3 text-white py-1"
            style={{ backgroundColor: "#7c2023" }}
            onClick={() => props.setRoutePembeli("cart")}
          >
            Cart
          </button>
          <button
            className="border-0 rounded-3 fs-4 w-25 mx-3 text-white py-1"
            style={{ backgroundColor: "#7c2023" }}
            onClick={() => props.setRoutePembeli("history")}
          >
            History
          </button>
        </div>
      </div>

      <div className="row row-cols-4 g-4 d-flex w-100 px-5 m-0 pb-5">
        {isLoading && (
          <div className="loader-container">
            <div className="loader"></div>
            <div className="loader-text">Loading...</div>
          </div>
        )}
        {isLoading == false &&
          datas.length > 0 &&
          datas.map((b) => (
            <CardBarang
              key={b.id}
              user="pembeli"
              barang={props.barang}
              setBarang={props.setBarang}
              categories={props.categories}
              brands={props.brands}
              cart={props.cart}
              setCart={props.setCart}
              {...b}
            ></CardBarang>
          ))}
        {isLoading == false && datas.length <= 0 && (
          <div
            className="container-fluid d-flex align-items-center w-50 py-5"
            style={{ height: "75vh" }}
          >
            <img className="img-fluid w-100 h-100" src={notFound} alt="" />
          </div>
        )}
      </div>
    </>
  );
}
export default ListPembeli;
