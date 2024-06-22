import { useEffect, useState } from "react";
import CardKeranjang from "./CardKeranjang";
import leftArrow from "../assets/left-arrow.png";
import formatter from "./formatter";
import check from "../assets/check.png";

import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../redux/cartSlice";
import { setRouteHistoryPembeli, setRoutePembeli } from "../redux/routeSlice";
import { setTransaction } from "../redux/transactionSlice";

/* eslint-disable react/prop-types */
function CartPembeli() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalBarang, setTotalBarang] = useState(0);
  const [totalHarga, setTotalHarga] = useState(0);

  const id = useSelector((state) => state.route.id);
  const carts = useSelector((state) => state.cart.listCart);
  const transactions = useSelector(
    (state) => state.transaction.listTransaction
  );
  const dispatch = useDispatch();

  useEffect(() => {
    let tempTotalBarang = 0;
    let tempTotalHarga = 0;

    for (let i = 0; i < carts.length; i++) {
      const data = carts[i];
      tempTotalBarang += data.qty;
      tempTotalHarga += data.harga * data.qty;
    }

    // Set
    setData(carts);
    setTotalBarang(tempTotalBarang);
    setTotalHarga(tempTotalHarga);
  }, [carts]);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [data]);

  const handleTransaction = () => {
    // Create Transaction

    // ID Transaction
    let newId = "TR001";

    if (transactions.length > 0) {
      let temp = transactions[transactions.length - 1].id;
      let tempId = temp.substring(2);
      newId = "TR" + (parseInt(tempId) + 1).toString().padStart(3, "0");
    }

    // Date
    const date = new Date();
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().padStart(4, "0");
    const currentDate = `${day}-${month}-${year}`;

    // Status
    const status = "Pending";

    // ID Pembeli
    const idPembeli = id;

    // ID Kasir
    const idKasir = -1;

    // ADD
    const newData = {
      id: newId,
      date: currentDate,
      cart: carts,
      totalHarga: totalHarga,
      status: status,
      idPembeli: idPembeli,
      idKasir: idKasir,
    };

    let tempTransaction = transactions;
    dispatch(setTransaction([...tempTransaction, newData]));
    dispatch(setCart([]));
  };

  return (
    <>
      <div className="d-flex align-items-center pt-4">
        <div className="w-50">
          <h1 className="px-5">Cart</h1>
        </div>
        <div className="w-25 ms-auto d-flex justify-content-end me-5">
          <button
            className="border-0 rounded-3 fs-4 w-25 mx-3 text-white py-1"
            style={{ backgroundColor: "#7c2023" }}
            onClick={() => dispatch(setRoutePembeli("list"))}
          >
            List
          </button>
          <button
            className="border-0 rounded-3 fs-4 w-25 mx-3 text-white py-1"
            style={{ backgroundColor: "#7c2023" }}
            onClick={() => {
              dispatch(setRoutePembeli("history"));
              dispatch(setRouteHistoryPembeli("list"));
            }}
          >
            History
          </button>
        </div>
      </div>
      <div className="w-100 d-flex position-relative">
        {isLoading && (
          <div className="loader-container">
            <div className="loader"></div>
            <div className="loader-text">Loading...</div>
          </div>
        )}

        {isLoading == false && (
          <>
            <div
              className="row row-cols-2 g-4 d-flex ps-5 m-0 pb-5"
              style={{ width: "70%" }}
            >
              {data.length > 0 &&
                data.map((c) => (
                  <CardKeranjang key={c.id} {...c}></CardKeranjang>
                ))}
            </div>
            <div
              className="position-fixed mt-4"
              style={{ width: "30%", right: "0" }}
            >
              <div className="d-flex justify-content-center align-items-center">
                <div
                  className="card rounded-4 shadow w-25 h-25"
                  style={{ minWidth: "450px", minHeight: "450px" }}
                >
                  <h2 className="text-black text-center pt-3 mb-5">Summary</h2>
                  <div className="w-100 d-flex flex-column">
                    <h2 className="ms-4">Total Barang</h2>
                    <div className="d-flex ms-4 align-items-center">
                      <img src={leftArrow} alt="" />
                      <span className="fs-2">{totalBarang} Barang.</span>
                    </div>
                  </div>
                  <div className="w-100 d-flex flex-column mt-4">
                    <h2 className="ms-4">Total Harga</h2>
                    <div className="d-flex ms-4 align-items-center">
                      <img src={leftArrow} alt="" />
                      <span className="fs-2">
                        {formatter.format(totalHarga)}
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-primary rounded-4 mt-auto mx-4 mb-4 fs-4"
                    style={{ backgroundColor: "#7c2023" }}
                    data-bs-toggle="modal"
                    data-bs-target="#confirmModal"
                  >
                    Purchase
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Modal */}

      <div
        className="modal shadow"
        id="confirmModal"
        tabIndex={-1}
        aria-labelledby="confirmModal"
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
              <h1>Are You Sure?</h1>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn text-white"
                style={{ backgroundColor: "#7c2023" }}
                // data-bs-dismiss="modal"
                aria-label="Close"
                data-bs-toggle="modal"
                data-bs-target="#successModal"
                onClick={handleTransaction}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal shadow"
        id="successModal"
        tabIndex={-1}
        aria-labelledby="successModalLabel"
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
              <h1>Success!</h1>
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

export default CartPembeli;
