/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import CardBarang from "./CardBarang";
import Navbar from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { setActive, setRouteAdmin } from "../redux/routeSlice";
import formatter from "./formatter";
import CardTransaction from "./CardTransaction";
import { setData, setTotalSales } from "../redux/reportSlice";

function Admin() {
  const [isLoading, setIsLoading] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm();

  const routeAdmin = useSelector((state) => state.route.routeAdmin);
  const items = useSelector((state) => state.barang.listBarang);
  const active = useSelector((state) => state.route.active);
  const data = useSelector((state) => state.report.data);
  const totalSales = useSelector((state) => state.report.totalSales);
  const transactions = useSelector(
    (state) => state.transaction.listTransaction
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    setIsLoading(true);

    const barang = items.find((b) => b.id == active);
    if (barang != undefined) {
      const harga = barang.harga;
      let tempArr = [];
      let tempTotal = 0;
      for (let i = 0; i < transactions.length; i++) {
        const t = transactions[i];

        for (let j = 0; j < t.cart.length; j++) {
          const c = t.cart[j];

          if (c.id == active) {
            tempArr.push(t);
            if (t.status == "Confirm") {
              tempTotal += c.qty * harga;
            }
          }
        }
      }

      dispatch(setData(tempArr));
      dispatch(setTotalSales(tempTotal));
    } else {
      dispatch(setData([]));
      dispatch(setTotalSales(0));
    }

    reset();

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [active, dispatch, items, reset, transactions]);

  const handleSearch = (data) => {
    // Search
    dispatch(setRouteAdmin("laporan"));
    dispatch(setActive(data.idBarang.toUpperCase()));
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="w-100 d-flex">
        <div className="w-50 pt-4 d-flex align-items-center">
          {routeAdmin == "list" ? (
            <h1 className="px-5">List Barang</h1>
          ) : (
            <button
              className="rounded-3 border-0 text-white fs-2 ms-5 px-5"
              style={{ backgroundColor: "#7c2023" }}
              onClick={() => {
                dispatch(setRouteAdmin("list"));
                dispatch(setActive(null));
              }}
            >
              Back
            </button>
          )}
        </div>
        <div className="w-50 d-flex mb-2 align-items-end justify-content-end pe-5">
          <form onSubmit={handleSubmit(handleSearch)}>
            <label className="fs-3 me-2 pb-1">ID Barang:</label>
            <input
              className="rounded fs-5"
              type="text"
              {...register("idBarang")}
            />
            <button
              className="ms-2 rounded-3 border-0 fs-5 py-1 px-3 text-white"
              style={{ backgroundColor: "#7c2023" }}
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {isLoading && (
        <div className="loader-container">
          <div className="loader"></div>
          <div className="loader-text">Loading...</div>
        </div>
      )}

      {isLoading == false && routeAdmin == "list" && (
        <div className="row row-cols-4 g-4 d-flex w-100 px-5 m-0 pb-5">
          {items.map((b) => (
            <CardBarang key={b.id} user="admin" {...b}></CardBarang>
          ))}
        </div>
      )}

      {isLoading == false && routeAdmin == "laporan" && data.length > 0 && (
        <div className="d-flex flex-column glass-container rounded-5 m-5">
          <h1 className="ms-5 mt-5">ID Barang: {active}</h1>
          <div className="row row-cols-4 g-4 d-flex w-100 px-5 m-0 pb-5">
            {data.map((t) => (
              <CardTransaction key={t.id} {...t}></CardTransaction>
            ))}
          </div>
          <div className="w-100 d-flex mt-auto justify-content-end pe-5 mb-4">
            <span className="fs-2 fw-bold">
              Total Pendapatan: {formatter.format(totalSales)}
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default Admin;
