/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import CardBarang from "./CardBarang";
import Navbar from "./NavBar";

function Admin(props) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <Navbar
        users={props.users}
        id={props.id}
        setId={props.setId}
        setRoute={props.setRoute}
        setCart={props.setCart}
      ></Navbar>
      <h1 className="px-5 pt-4">List Barang</h1>

      {isLoading && (
        <div className="loader-container">
          <div className="loader"></div>
          <div className="loader-text">Loading...</div>
        </div>
      )}

      {isLoading == false && (
        <div className="row row-cols-4 g-4 d-flex w-100 px-5 m-0 pb-5">
          {props.barang.map((b) => (
            <CardBarang
              key={b.id}
              user="admin"
              barang={props.barang}
              setBarang={props.setBarang}
              categories={props.categories}
              brands={props.brands}
              {...b}
            ></CardBarang>
          ))}
        </div>
      )}
    </>
  );
}

export default Admin;
