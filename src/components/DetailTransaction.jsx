/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import formatter from "./formatter";
import {
  setRouteHistoryKasir,
  setRouteHistoryPembeli,
} from "../redux/routeSlice";

function DetailTransaction() {
  const active = useSelector((state) => state.route.active);
  const transactions = useSelector(
    (state) => state.transaction.listTransaction
  );
  const route = useSelector((state) => state.route.route);
  const categories = useSelector((state) => state.kategori.listKategori);
  const brands = useSelector((state) => state.merk.listMerk);
  const transaction = transactions.find((t) => t.id == active);
  const dispatch = useDispatch();

  const getCategories = (item) => {
    let categoriesArr = [];
    if (item.kategori.length > 1) {
      for (let i = 0; i < item.kategori.length; i++) {
        const kategori = item.kategori[i];

        const temp = categories.find((c) => c.id == kategori);

        categoriesArr.push(temp.nama);
      }
    } else {
      const temp = categories.find((c) => c.id == item.kategori);
      categoriesArr.push(temp.nama);
    }

    let categoriesStr = categoriesArr.join(", ");

    return categoriesStr;
  };

  const getBrands = (item) => {
    const brand = brands.find((b) => b.id == item.merk);
    return brand.nama;
  };

  return (
    <>
      <div className="w-100 d-flex flex-column mt-5">
        <div className="d-flex justify-content-end pe-5 mb-5">
          <button
            className="border-0 rounded-3 fs-4 me-5 text-white py-1"
            style={{ backgroundColor: "#7c2023", width: "10%" }}
            onClick={() => {
              if (route == "PEMBELI") {
                dispatch(setRouteHistoryPembeli("list"));
              } else {
                dispatch(setRouteHistoryKasir("list"));
              }
            }}
          >
            Back
          </button>
        </div>
        <div className="w-100">
          <div
            className="container-fluid d-flex align-items-end w-100 px-5 pb-5"
            style={{ minHeight: "50vh" }}
          >
            <div className="glass-container w-75 d-flex my-auto flex-column align-items-center justify-content-center">
              <div className="w-100 bg-white mx-auto shadow rounded-3 p-4">
                <div className="w-100 d-flex">
                  <div className="w-50 d-flex align-items-center justify-content-start">
                    <h3 className="w-100">{transaction.id}</h3>
                  </div>
                  <div className="w-50 d-flex align-items-center justify-content-end">
                    <h4>{transaction.date}</h4>
                  </div>
                </div>
                <hr />
                <div className="w-100">
                  {transaction.cart.map((c) => (
                    <div
                      key={c.id}
                      className="card rounded-4 shadow-lg h-100 my-4"
                      style={{ cursor: "pointer" }}
                    >
                      <div className="card-body w-100 d-flex flex-column">
                        <div>{c.id}</div>
                        <div className="w-100 h-75">
                          <h2 className="card-title">{c.nama}</h2>
                        </div>
                        <div className="w-100 pt-3">
                          <h5 className="card-text">
                            Kategori: {getCategories(c)}
                          </h5>
                        </div>
                        <div className="w-100 pt-3">
                          <h5 className="card-text">Merk: {getBrands(c)}</h5>
                        </div>
                        <div className="d-flex mt-3 align-items-center">
                          <div className="w-100">
                            <h4 className="card-text">
                              {formatter.format(c.harga)}
                            </h4>
                          </div>
                          <div className="w-50 d-flex justify-content-end pe-3">
                            <h3 className="card-text fw-bold">x{c.qty}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <hr />
                <div className="w-100 d-flex">
                  <div className="w-50 d-flex align-items-center justify-content-start">
                    <h3>{formatter.format(transaction.totalHarga)}</h3>
                  </div>
                  <div className="w-50 d-flex align-items-center justify-content-end">
                    <h3
                      className="fw-bold"
                      style={{
                        color:
                          transaction.status == "Pending"
                            ? "orange"
                            : transaction.status == "Confirm"
                            ? "green"
                            : "#7c2023",
                      }}
                    >
                      {transaction.status}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailTransaction;
