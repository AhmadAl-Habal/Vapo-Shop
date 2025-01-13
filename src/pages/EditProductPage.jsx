import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../api/axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import hero from "../assets/bg.webp";
const EditProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [item, setItem] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [popupView, setPopupView] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [deletedCategoryId, setDeletedCategoryId] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    setLoadingCategories(true);
    const fetchData = async () => {
      try {
        const response = await axios.get("/category");
        if (response.status == "200") {
          setAllCategories(response.data.data);
        } else setAllCategories(response.status);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchData();
  }, [, popupView]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/item/${id}`);
        if (response.status === 200) {
          reset({
            name: response.data.data.name || "",
            price: response.data.data.price || "",
            discount: response.data.data.discount || "",
            description: response.data.data.description || "",
            main_category_id: response.data.data.main_category_id._id || "",
          });

          // Adjust the textarea height after setting the initial description
          if (textareaRef.current) {
            const textarea = textareaRef.current;
            textarea.style.height = "auto"; // Reset height to calculate properly
            textarea.style.height = `${textarea.scrollHeight}px`; // Adjust height to content
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  // console.log("test");

  const onSubmit = async (data) => {
    setLoading(true);
    setStatusMessage("");

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("price", data.price);
      if (data.discount) {
        formData.append("discount", data.discount);
      }
      if (data.description) {
        formData.append("description",data.description );
      }
      formData.append("main_category_id", data.main_category_id);
      if (data.image.length >= 1) {
        Array.from(data.image).forEach((file) => {
          formData.append("image", file);
        });
      }
      // formData.append("image", data.image[0]);

      const response = await axios.put(`/item/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log("Product edited successfully:", response.data);
        setStatusMessage("Product edited successfully!, Redirecting ...");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setStatusMessage("Failed to edit the product.");
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

  const clearImage = () => {
    setValue("image", null);
    clearErrors("image");
    setImagePreview(null);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const addCategory = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        "/category",
        { name: categoryName },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response received:", response.message);
      if (response.status == 201) {
        console.log("Login successful:", response);
        setPopupView(false);
      } else {
        console.log("tiz");
      }
    } catch (error) {
      console.error("Login failed:", error.response.data);
    } finally {
      setLoading(false);
    }
  };
  const deleteCategory = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `/category/${deletedCategoryId}`,

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Login failed:", error.response.data);
    } finally {
      setLoading(false);
    }

    setPopupView(false);
  };
  return (
    <>
      <div
        className={
          popupView
            ? "relative h-[100vh] bg-black bg-opacity-50 opacity-50"
            : "relative h-[100vh]"
        }
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${hero})`, opacity: 0.7 }}
        ></div>

        <div className="absolute inset-0 bg-black bg-opacity-80"></div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative space-y-4 w-[80vw] mx-auto bg-transparent py-10"
        >
          <p className="border border-2 py-1 px-2 rounded-full inline-block text-sm">
            <Link className="mr-5 text-white" to={"/"}>
              Return to Products page
            </Link>
          </p>
          <p className="text-center text-white font-bold">
            New Product Details
          </p>
          <div className="flex items-center">
            <label className="text-white font-bold w-1/4">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="border rounded p-2 w-3/4 bg-red-100"
            />
            {errors.name && (
              <p className="text-red-500 ml-1">{errors.name.message}</p>
            )}
          </div>
          <div className="flex items-center">
            <label className="text-white font-bold w-1/4">Discription</label>
            <textarea
              {...register("description")}
              className="border rounded p-2 w-3/4 bg-red-100 resize-none overflow-hidden"
              rows={1}
              
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
            ></textarea>
            {errors.name && (
              <p className="text-red-500 ml-1">{errors.name.message}</p>
            )}
          </div>
          <div className="flex">
            <label className="text-white font-bold w-1/4">Price</label>
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
          <div className="flex">
              <label className="text-white font-bold w-1/4">Discount</label>
              <input
                type="number"
                step="0.01"
                {...register(
                  "discount"
                  // , { required: "discount is required" }
                )}
                className="border rounded p-2 w-3/4 bg-red-100"
              />
              {errors.discount && (
                <p className="ml-1 text-red-500">{errors.discount.message}</p>
              )}
            </div>
          <div className="flex">
            {loadingCategories ? (
              <p>Loading...</p>
            ) : (
              <>
                <label className="text-white font-bold w-1/4">Cagtegory</label>
                <div className="flex items-center">
                  <select
                    {...register("main_category_id")}
                    className="border rounded p-2 w-full bg-red-100 text-right w-3/4"
                  >
                    <option className="text-left" value="">
                      Select a category
                    </option>
                    {allCategories.map((category) => (
                      <option
                        className="inline-block flex justify-between"
                        key={category._id}
                        value={category._id}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <div className="flex items-center justify-end w-1/4 ml-5 space-x-2">
                    <button
                      type="button"
                      className=" bg-green-500 text-white p-1 rounded-full text-xs"
                      onClick={() => setPopupView("add")}
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      className=" bg-red-500 text-white p-1 rounded-full text-xs"
                      onClick={() => setPopupView("delete")}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          <div>
            <div className="flex items-center">
              <label className="text-white font-bold w-1/4">Image</label>
              <input
                type="file"
                {...register("image")}
                multiple
                className="border rounded p-2 text-white text-sm inline-block w-3/4"
                onChange={handleFileChange}
              />
              <button
                type="button"
                className="absolute right-1 bg-red-400 text-black p-1 rounded-full text-xs"
                onClick={clearImage}
              >
                Clear
              </button>
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
                <p className="text-red-500 font-bold">{statusMessage}</p>
              )}
            </div>
          </div>
        </form>
      </div>
      {popupView === "add" && (
        <div className="bg-black z-10 inset-0 absolute bg-opacity-30">
          <button
            className="right-0 bg-red-600 p-2 absolute top-20 rounded-full w-[40px]"
            onClick={() => {
              setPopupView(false);
            }}
          >
            X
          </button>
          <div className="flex items-center justify-center h-100vh">
            <div className="flex items-center absolute inset-50 bg-black p-2  top-[40vh] w-[80vw] rounded-lg ">
              <label className="text-white font-bold w-1/4">
                Category Name
              </label>
              <input
                type="text"
                required
                className="border rounded p-2 w-3/4 bg-red-100 "
                onChange={(e) => setCategoryName(e.target.value)}
              />

              <button
                className="text-white ml-2 p-1 bg-red-600 rounded"
                onClick={addCategory}
              >
                {loading ? "loading" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
      {popupView === "delete" && (
        <div className="bg-black z-10 inset-0 absolute bg-opacity-30">
          <button
            className="right-0 bg-red-600 p-2 absolute top-20 rounded-full w-[40px]"
            onClick={() => {
              setPopupView(false);
            }}
          >
            X
          </button>
          <div className="flex items-center justify-center h-100vh">
            <div className="flex items-center absolute inset-50 bg-black p-2  top-[40vh] w-[80vw] rounded-lg ">
              <select
                onChange={(e) => setDeletedCategoryId(e.target.value)}
                className="border rounded p-2 w-full bg-red-100 text-right w-3/4"
              >
                <option className="text-left" value="">
                  Select a category
                </option>
                {allCategories.map((category) => (
                  <option
                    className="inline-block flex justify-between"
                    key={category._id}
                    value={category._id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>

              <button
                className="text-white ml-2 p-1 bg-red-600 rounded"
                onClick={() => {
                  console.log(deletedCategoryId);
                  deleteCategory();
                }}
              >
                {loading ? "loading" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProductPage;
