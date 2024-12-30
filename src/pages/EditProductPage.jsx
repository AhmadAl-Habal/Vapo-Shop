import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import hero from "../assets/bg.webp";
const EditProductPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    setStatusMessage("");
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("image", data.image[0]);

      const response = await axios.post("/item", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        console.log("Product created successfully:", response.data);
        setStatusMessage("Product created successfully!, Redirecting ...");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setStatusMessage("Failed to create the product.");
      }
    } catch (error) {
      console.error(
        "Error creating product:",
        error.response?.data || error.message
      );
      setStatusMessage("Error creating product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-[100vh] pt-10 bg-cover "
      style={{ backgroundImage: `url(${hero})`, opacity: 0.9 }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 w-[80vw] mx-auto"
      >
        <p className="border border-2 py-1 px-2 rounded-full inline-block text-sm">
          <Link className="mr-5 text-white" to={"/"}>
            Return to Products page
          </Link>
        </p>
        <p className="text-center text-white font-bold">New Product Details</p>
        <div className="flex items-center">
          <label className=" text-white font-bold w-1/4">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="border rounded p-2 w-3/4 bg-red-100"
          />
          {errors.name && (
            <p className="text-red-500 ml-1">{errors.name.message}</p>
          )}
        </div>
        <div className="flex ">
          <label className=" text-white font-bold w-1/4">Price</label>
          <input
            type="number"
            step="0.01"
            {...register("price", { required: "Price is required" })}
            className="border rounded p-2 w-3/4 bg-red-100"
          />
          {errors.price && (
            <p className="ml-1 text-red-500">{errors.price.message}</p>
          )}
        </div>
        <div>
          <div className="flex items-center">
            <label className="text-white font-bold w-1/4">Image</label>
            <input
              type="file"
              {...register("image", { required: "Image is required" })}
              className="border rounded p-2 text-white text-sm inline-block w-3/4 "
            />
            {errors.image && (
              <p className="ml-1 text-red-500">{errors.image.message}</p>
            )}
          </div>
          <div className="flex mt-5">
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-1 rounded mr-5"
              disabled={loading}
            >
              {loading ? "Loading..." : "Create"}
            </button>
            {statusMessage && (
              <p className=" text-red-500 font-bold">{statusMessage}</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProductPage;
