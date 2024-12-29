import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

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
        console.log("Login successful:", response);
        console.log("token", response.data.data.token);
        setAuthToken(response.data.data.token);
        setLoginStatus("Login successful, redirecting...");
      } else {
        setLoginStatus(response.message);
        console.log("tiz");
        //
      }
    } catch (error) {
      console.error("Login failed:", error.response.data);
      setLoginStatus(error.response.data.message);

      //   alert("Login failed! Check your credentials.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (authToken) {
      localStorage.setItem("token", authToken);
      //   localStorage.setItem("userData", JSON.stringify(userInfo));
      //   console.log(userInfo);
      const timeout = setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 2000);
    }
  }, [authToken, navigate]);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Username</label>
        <input
          type="text"
            value="asss"
          {...register("username", { required: "Username is required" })}
          className="border rounded p-2"
        />
        {errors.username && (
          <p className="text-red-500">{errors.username.message}</p>
        )}
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value="ghassan232303"
          {...register("password", { required: "Password is required" })}
          className="border rounded p-2"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Loading..." : "Login"}
      </button>

      {loginStatus}
    </form>
  );
};

export default LoginPage;
