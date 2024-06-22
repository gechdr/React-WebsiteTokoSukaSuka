import { useEffect, useState } from "react";
import Navbar from "./NavBar";
import formatter from "./formatter";
import { useForm } from "react-hook-form";
import HistoryKasir from "./HistoryKasir";
import { useDispatch, useSelector } from "react-redux";
import { updateQty } from "../redux/barangSlice";
import { updateStatus } from "../redux/transactionSlice";
import { setRouteHistoryKasir, setRouteKasir } from "../redux/routeSlice";

/* eslint-disable react/prop-types */
function Kasir() {
  const [active, setActive] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const routeKasir = useSelector((state) => state.route.routeKasir);
  const id = useSelector((state) => state.route.id);
  const items = useSelector((state) => state.barang.listBarang);
  const transactions = useSelector(
    (state) => state.transaction.listTransaction
  );
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm();

  const clear = () => {
    reset();
    setActive(null);
    setIsLoading(true);
  };

  const handleSearch = (data) => {
    setIsLoading(true);
    let searchId = data.search.toUpperCase();

    reset();
    setActive(transactions.find((t) => t.id == searchId));

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (active != null) {
      let searchId = active.id;
      clear();
      setActive(transactions.find((t) => t.id == searchId));

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactions]);

  const checkStock = () => {
    let warning = false;
    let tempCart = active.cart;

    for (let i = 0; i < tempCart.length; i++) {
      const c = tempCart[i];

      const item = items.find((b) => b.id == c.id);
      if (item.qty - c.qty < 0) {
        warning = true;
      }
    }

    if (warning) {
      return "*Warning! Accepting this transaction will cause the stock to go minus.";
    } else {
      return "";
    }
  };

  const handleStatus = (action) => {
    let updateStatusTransaction = [];
    let updateBarang = [];

    if (action == "reject") {
      //Reject
      for (let i = 0; i < transactions.length; i++) {
        let t = transactions[i];

        if (t.id == active.id) {
          updateStatusTransaction.push({
            id: t.id,
            status: "Rejected",
            idKasir: id,
          });
        }
      }

      dispatch(updateStatus(updateStatusTransaction));
    } else {
      //Confirm
      for (let i = 0; i < transactions.length; i++) {
        let t = transactions[i];

        if (t.id == active.id) {
          //Confirm
          updateStatusTransaction.push({
            id: t.id,
            status: "Confirm",
            idKasir: id,
          });

          dispatch(updateStatus(updateStatusTransaction));

          for (let j = 0; j < t.cart.length; j++) {
            const c = t.cart[j];

            updateBarang.push({
              id: c.id,
              qty: c.qty,
            });
          }
        }

        dispatch(updateQty(updateBarang));
      }
    }
  };

  return (
    <>
      <Navbar></Navbar>

      {routeKasir == "home" && (
        <>
          <div className="d-flex align-items-center pt-4">
            <h1 className="px-5">Transaction</h1>
            <div className="ms-5">
              <form
                className="d-flex align-items-center flex-wrap"
                onSubmit={handleSubmit(handleSearch)}
              >
                <label className="fs-4 me-2 pb-1">ID Transaction: </label>
                <input
                  className="fs-6 rounded-3 px-3 py-1"
                  type="text"
                  autoComplete="off"
                  onFocus={() => reset({ search: "" })}
                  {...register("search")}
                />
                <button
                  className="btn rounded-3 text-white fs-7 ms-3"
                  style={{ backgroundColor: "#7c2023" }}
                >
                  Cek
                </button>
              </form>
            </div>

            <div className="w-25 ms-auto d-flex justify-content-end me-5">
              <button
                className="border-0 rounded-3 fs-4 w-25 mx-3 text-white py-1"
                style={{ backgroundColor: "#7c2023" }}
                onClick={() => {
                  dispatch(setRouteKasir("history"));
                  dispatch(setRouteHistoryKasir("list"));
                  clear();
                }}
              >
                History
              </button>
            </div>
          </div>

          {isLoading && (
            <div className="loader-container">
              <div className="loader"></div>
              <div className="loader-text">Loading...</div>
            </div>
          )}

          {isLoading == false && active != null && (
            <>
              <div
                className="container-fluid d-flex align-items-end w-100 px-5"
                style={{ minHeight: "50vh" }}
              >
                <div className="glass-container w-50 d-flex my-auto flex-column align-items-center justify-content-center">
                  <div className="w-100 bg-white mx-auto shadow rounded-3 p-4 bg-warning">
                    <div className="w-100 d-flex">
                      <div className="w-50 d-flex align-items-center justify-content-start">
                        <h3 className="w-100">{active.id}</h3>
                      </div>
                      <div className="w-50 d-flex align-items-center justify-content-end">
                        <h4>{active.date}</h4>
                      </div>
                    </div>
                    <hr />
                    <div className="w-100 d-flex">
                      <div className="w-50 d-flex align-items-center justify-content-start">
                        <h3>{formatter.format(active.totalHarga)}</h3>
                      </div>
                      <div className="w-50 d-flex align-items-center justify-content-end">
                        <h3
                          className="fw-bold"
                          style={{
                            color:
                              active.status == "Pending"
                                ? "orange"
                                : active.status == "Confirm"
                                ? "green"
                                : "#7c2023",
                          }}
                        >
                          {active.status}
                        </h3>
                      </div>
                    </div>
                  </div>
                  {active.status == "Pending" && (
                    <div className="w-100 d-flex align-items-center justify-content-end mt-3">
                      <div className="w-50 d-flex align-items-center">
                        <span className="" style={{ color: "red" }}>
                          {checkStock()}
                        </span>
                      </div>
                      <div className="w-50 d-flex align-items-center justify-content-end">
                        <button
                          className="btn rounded-3 fs-3 mx-2 text-white"
                          style={{ backgroundColor: "#7c2023" }}
                          onClick={() => handleStatus("reject")}
                        >
                          Reject
                        </button>
                        <button
                          className="btn rounded-3 fs-3 mx-2 text-white"
                          style={{ backgroundColor: "green" }}
                          onClick={() => handleStatus("confirm")}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </>
      )}

      {routeKasir == "history" && <HistoryKasir></HistoryKasir>}
    </>
  );
}

export default Kasir;
