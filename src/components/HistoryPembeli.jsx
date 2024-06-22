import { useEffect, useState } from "react";
import ListHistory from "./ListHistory";
import { useDispatch, useSelector } from "react-redux";
import { setRoutePembeli } from "../redux/routeSlice";
import DetailTransaction from "./DetailTransaction";

/* eslint-disable react/prop-types */
function HistoryPembeli() {
  const [isLoading, setIsLoading] = useState(false);
  const [userTransaction, setUserTransaction] = useState([]);

  const id = useSelector((state) => state.route.id);
  const transactions = useSelector(
    (state) => state.transaction.listTransaction
  );
  const routeHistoryPembeli = useSelector(
    (state) => state.route.routeHistoryPembeli
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);

    setUserTransaction([...transactions.filter((t) => t.idPembeli == id)]);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [id, transactions]);

  return (
    <>
      <div className="d-flex align-items-center pt-4">
        <div className="w-50">
          <h1 className="px-5">History</h1>
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
            onClick={() => dispatch(setRoutePembeli("cart"))}
          >
            Cart
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

        {isLoading == false && routeHistoryPembeli == "list" && (
          <ListHistory userTransaction={userTransaction}></ListHistory>
        )}
        {isLoading == false && routeHistoryPembeli == "detail" && (
          <DetailTransaction />
        )}
      </div>
    </>
  );
}

export default HistoryPembeli;
