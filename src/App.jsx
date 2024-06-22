import { useEffect, useState } from "react";
import Login from "./components/Login";
import client from "./components/client";
import Admin from "./components/Admin";
import Kasir from "./components/Kasir";
import Pembeli from "./components/Pembeli";
// import './App.css'

function App() {
  const [route, setRoute] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [id, setId] = useState(-1);
  const [barang, setBarang] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [cart, setCart] = useState([]);
  const [transaction, setTransaction] = useState([]);

  const fetchUsers = async () => {
    setIsLoading(true);
    const getUser = await client.get("/users");
    setUsers(getUser.data);
    setIsLoading(false);
  };

  const fetchItems = async () => {
    setIsLoading(true);
    const getItems = await client.get("/barang");
    setBarang(getItems.data);
    setIsLoading(false);
  };

  const fetchCategories = async () => {
    setIsLoading(true);
    const getCategories = await client.get("/kategori");
    setCategories(getCategories.data);
    setIsLoading(false);
  };

  const fetchBrands = async () => {
    setIsLoading(true);
    const getBrands = await client.get("/merk");
    setBrands(getBrands.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
    fetchItems();
    fetchCategories();
    fetchBrands();
  }, []);

  return (
    <>
      {route == "login" && isLoading == false && (
        <Login users={users} id={id} setId={setId} setRoute={setRoute}></Login>
      )}
      {route == "admin" && isLoading == false && (
        <Admin
          users={users}
          id={id}
          setId={setId}
          setRoute={setRoute}
          barang={barang}
          setBarang={setBarang}
          categories={categories}
          brands={brands}
          setCart={setCart}
        ></Admin>
      )}
      {route == "PEMBELI" && isLoading == false && (
        <Pembeli
          users={users}
          id={id}
          setId={setId}
          setRoute={setRoute}
          barang={barang}
          setBarang={setBarang}
          categories={categories}
          brands={brands}
          cart={cart}
          setCart={setCart}
          transaction={transaction}
          setTransaction={setTransaction}
        ></Pembeli>
      )}
      {route == "KASIR" && isLoading == false && (
        <Kasir
          users={users}
          id={id}
          setId={setId}
          setRoute={setRoute}
          setCart={setCart}
          barang={barang}
          setBarang={setBarang}
          transaction={transaction}
          setTransaction={setTransaction}
        ></Kasir>
      )}
    </>
  );
}

export default App;
