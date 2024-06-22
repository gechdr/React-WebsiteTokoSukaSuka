/* eslint-disable react/prop-types */
import "./style.css";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useDispatch, useSelector } from "react-redux";
import { setRoute, setId } from "../redux/routeSlice";

function Login() {
  const users = useSelector((state) => state.user.listUser);
  const dispatch = useDispatch();

  const schema = Joi.object({
    username: Joi.string().required().messages({
      "string.empty": "*Field is Empty!",
    }),
    password: Joi.string().required().messages({
      "string.empty": "*Field is Empty!",
    }),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });

  const handleLogin = (data) => {
    if (data.username.toLowerCase() == "admin") {
      if (data.password.toLowerCase() == "admin") {
        // Login Admin
        dispatch(setRoute("admin"));
      } else {
        setError("password", { type: "custom", message: "*Wrong Password!" });
      }
    } else {
      let safe = false;
      let found = false;

      let user = null;
      for (let i = 0; i < users.length; i++) {
        user = users[i];

        if (user.username == data.username) {
          // Found
          found = true;
          if (user.password == data.password) {
            dispatch(setId(user.id));
            safe = true;
            break;
          }
        }
      }

      if (found && safe) {
        // Login
        dispatch(setRoute(user.role));
      } else if (found) {
        // Wrong Password
        setError("password", { type: "custom", message: "*Wrong Password!" });
      } else {
        // User Not Found
        setError("username", {
          type: "custom",
          message: "*Username not found!",
        });
      }
    }
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div
          className="glass-container w-25 h-25"
          style={{ minWidth: "450px", minHeight: "450px" }}
        >
          <h1 className="text-black text-center pt-3 mb-5">LOGIN</h1>
          <form onSubmit={handleSubmit(handleLogin)} className="px-3">
            <label htmlFor="" className="text-black fs-4">
              Username
            </label>
            <br />
            <input
              type="text"
              {...register("username")}
              className="w-100 rounded fs-4 border-0 px-2"
              autoComplete="off"
            />
            <br />
            <span className="w-100 fs-4" style={{ color: "red" }}>
              {errors?.username?.message}
            </span>
            <br />
            <label htmlFor="" className="text-black fs-4">
              Password
            </label>
            <br />
            <input
              type="password"
              {...register("password")}
              className="w-100 rounded fs-4 border-0 px-2"
            />
            <br />
            <span className="w-100 fs-4" style={{ color: "red" }}>
              {errors?.password?.message}
            </span>
            <br />
            <br />
            <button
              className="w-100 fs-4 py-1 rounded-3 border-0 text-white"
              style={{ backgroundColor: "#7c2023" }}
              type="submit"
            >
              Login
            </button>
            <br />
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
