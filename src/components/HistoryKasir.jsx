/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ListHistory from "./ListHistory";
import { useDispatch, useSelector } from "react-redux";
import { setRouteKasir } from "../redux/routeSlice";
import DetailTransaction from "./DetailTransaction";

function HistoryKasir() {
  const [isLoading, setIsLoading] = useState(false);
  const [userTransaction, setUserTransaction] = useState([]);

  const id = useSelector((state) => state.route.id);
  const transactions = useSelector(
    (state) => state.transaction.listTransaction
  );
  const routeHistoryKasir = useSelector(
    (state) => state.route.routeHistoryKasir
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);

    setUserTransaction([...transactions.filter((t) => t.idKasir == id)]);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [id, transactions]);

  return (
    <>
      <div className="d-flex align-items-center pt-4">
        <h1 className="px-5">Transaction</h1>
        <div className="w-25 ms-auto d-flex justify-content-end me-5">
          <button
            className="border-0 rounded-3 fs-4 w-25 mx-3 text-white py-1"
            style={{ backgroundColor: "#7c2023" }}
            onClick={() => dispatch(setRouteKasir("home"))}
          >
            Back
          </button>
        </div>
      </div>

      <div className="w-100 d-flex">
        {isLoading && (
          <div className="loader-container">
            <div className="loader"></div>
            <div className="loader-text">Loading...</div>
          </div>
        )}

        {isLoading == false && routeHistoryKasir == "list" && (
          <ListHistory userTransaction={userTransaction}></ListHistory>
        )}
        {isLoading == false && routeHistoryKasir == "detail" && (
          <DetailTransaction />
        )}
      </div>
    </>
  );
}

export default HistoryKasir;
