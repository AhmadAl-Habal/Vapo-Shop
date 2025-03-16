import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import hero from "../../assets/motion11.jpg";
import BackButton from "../../components/BackButton";
const LoginPage = () => {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    setLoginStatus("");
    try {
      const response = await axios.post("/user/login/", {
        user_name: data.username,
        password: data.password,
      });
      console.log("Response received:", response.message);
      if (response.status == 200) {
        setAuthToken(response.data.data.token);
        setLoginStatus("Login successful, redirecting...");
      } else {
        setLoginStatus(response.message);
      }
    } catch (error) {
      console.error("Login failed:", error.response.data);
      setLoginStatus(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (authToken) {
      localStorage.setItem("token", authToken);
      const timeout = setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 2000);
    }
  }, [authToken, navigate]);
  return (
    <div className="relative min-h-[100vh]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative space-y-4 w-[80vw] mx-auto bg-transparent pt-10"
      >
        <BackButton />

        <div>
          <label className="mr-5 text-white w-1/4">Username</label>
          <input
            type="text"
            placeholder="UserName "
            {...register("username", { required: "Username is required" })}
            className="border rounded p-1 bg-red-100 outline-none w-full mt-3"
          />
          {errors.username && (
            <p className="font-bold text-red-500">{errors.username.message}</p>
          )}
        </div>
        <div>
          <label className="mr-6 text-white w-1/4">Password</label>
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="border rounded p-1 bg-red-100 outline-none w-full mt-3"
          />
          {errors.password && (
            <p className="font-bold text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div className="flex">
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-1 rounded mr-5"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
          <p className="text-red-500 font-bold">{loginStatus}</p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
