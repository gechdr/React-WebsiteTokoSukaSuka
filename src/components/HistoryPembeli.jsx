import { useEffect, useState } from "react";
import ListHistory from "./ListHistory";

/* eslint-disable react/prop-types */
function HistoryPembeli(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [userTransaction, setUserTransaction] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    setUserTransaction([
      ...props.transaction.filter((t) => t.idPembeli == props.id),
    ]);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [props.id, props.transaction]);

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
            onClick={() => props.setRoutePembeli("list")}
          >
            List
          </button>
          <button
            className="border-0 rounded-3 fs-4 w-25 mx-3 text-white py-1"
            style={{ backgroundColor: "#7c2023" }}
            onClick={() => props.setRoutePembeli("cart")}
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

        {isLoading == false && (
          <ListHistory userTransaction={userTransaction}></ListHistory>
        )}
      </div>
    </>
  );
}

export default HistoryPembeli;
