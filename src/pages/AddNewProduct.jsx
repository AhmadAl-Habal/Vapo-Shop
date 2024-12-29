import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const AddNewProduct = () => {
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
        setStatusMessage("Product created successfully!");
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Name</label>
        <input
          type="text"
          {...register("name", { required: "Name is required" })}
          className="border rounded p-2"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      <div>
        <label>Price</label>
        <input
          type="number"
          step="0.01"
          {...register("price", { required: "Price is required" })}
          className="border rounded p-2"
        />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
      </div>
      <div>
        <label>Image</label>
        <input
          type="file"
          {...register("image", { required: "Image is required" })}
          className="border rounded p-2"
        />
        {errors.image && <p className="text-red-500">{errors.image.message}</p>}
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Loading..." : "Create"}
      </button>

      {statusMessage && <p className="mt-4">{statusMessage}</p>}
    </form>
  );
};

export default AddNewProduct;
