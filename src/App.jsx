import { useEffect, useState } from "react";
import Login from "./components/Login";
import Admin from "./components/Admin";
import Kasir from "./components/Kasir";
import Pembeli from "./components/Pembeli";
import { useDispatch, useSelector } from "react-redux";
import { setBarang } from "./redux/barangSlice";
import {
  useGetBarangQuery,
  useGetKategoriQuery,
  useGetMerkQuery,
  useGetUserQuery,
} from "./redux/api";
import { setKategori } from "./redux/kategoriSlice";
import { setMerk } from "./redux/merkSlice";
import { setUsers } from "./redux/userSlice";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const route = useSelector((state) => state.route.route);
  const dispatch = useDispatch();

  const dataUser = useGetUserQuery().data;
  const dataBarang = useGetBarangQuery().data;
  const dataKategori = useGetKategoriQuery().data;
  const dataMerk = useGetMerkQuery().data;

  useEffect(() => {
    setIsLoading(true);

    dispatch(setUsers(dataUser));
    dispatch(setBarang(dataBarang));
    dispatch(setKategori(dataKategori));
    dispatch(setMerk(dataMerk));

    setIsLoading(false);
  }, [dataUser, dataBarang, dataKategori, dataMerk, dispatch]);

  return (
    <>
      {route == "login" && isLoading == false && <Login></Login>}
      {route == "admin" && isLoading == false && <Admin></Admin>}
      {route == "PEMBELI" && isLoading == false && <Pembeli></Pembeli>}
      {route == "KASIR" && isLoading == false && <Kasir></Kasir>}
    </>
  );
}

export default App;
