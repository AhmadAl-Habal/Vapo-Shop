import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import hero from "../assets/bg.webp";
import Spinner from "../components/Spinner";

const SettingsPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [dollarValue, setDollarValue] = useState("");
  const [settings, setSettings] = useState({});
  const [heroImages, setHeroImages] = useState([]);
  const [aboutUs, setAboutUs] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [deletedCategoryId, setDeletedCategoryId] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);

  const [allCategories, setAllCategories] = useState([]);
  const [popupView, setPopupView] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const addHeroImages = async (data) => {
    setLoading(true);
    setStatusMessage("");

    try {
      const formData = new FormData();

      Array.from(heroImages).forEach((file) => {
        formData.append("image", file);
      });
      // formData.append("image", data.image[0]);
      console.log(data);

      const response = await axios.post("/settings/hero", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        // console.log("Product created successfully:", response.data);
        setStatusMessage("Hero images added successfully!");
        // setTimeout(() => {
        //   navigate("/");
        // }, 2000);
      } else {
        setStatusMessage("Failed to add Hero images");
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/settings");
        if (response.status == "200") {
          setDollarValue(response.data.data[0].dollar_price);
          setAboutUs(response.data.data[0].about_us);
          setSettings(response.data.data);
        } else setSettings(response.status);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchData();
  }, []);
  const clearImage = () => {
    setValue("image", null);
    clearErrors("image");
    setImagePreview(null);
  };

  const ChangeDollarValue = async () => {
    setStatusMessage("");

    setLoading(true);

    try {
      const response = await axios.put(
        "/settings/dollar",
        { dollar_price: dollarValue },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 200) {
        setStatusMessage("Dollar price changed successfully!");
      } else {
        setStatusMessage("Failed to change Dollar price");
        //
      }
    } catch (error) {
      console.error("Login failed:", error.response.data);
    } finally {
      setLoading(false);
    }
  };
  const changeAboutUs = async () => {
    setStatusMessage("");

    setLoading(true);

    try {
      const response = await axios.put(
        "/settings/about_us",
        { update_about_us: aboutUs },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 200) {
        setStatusMessage("About us changed successfully!");
      } else {
        setStatusMessage("Failed to change About Us");
        //
      }
    } catch (error) {
      console.error("Login failed:", error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
    console.log("changed");
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

        <div className="relative space-y-4 w-[80vw] mx-auto bg-transparent py-10">
          <p className="border border-2 py-1 px-2 rounded-full inline-block text-sm">
            <Link className="mr-5 text-white" to={"/"}>
              Return to Products page
            </Link>
          </p>
          <div>
            <div className="flex items-center  mb-5 ">
              <label className="text-white font-bold  w-1/4">
                Dollar Value
              </label>
              <input
                type="number"
                value={dollarValue}
                className="border rounded p-2 w-3/4 bg-red-100 "
                onChange={(e) => setDollarValue(e.target.value)}
              />

              <button
                className={`text-white ml-2 p-1 rounded ${
                  loading ? "bg-red-400 cursor-not-allowed" : "bg-red-600"
                }`}
                onClick={ChangeDollarValue}
                disabled={loading}
              >
                {loading ? "loading" : "Save"}
              </button>
            </div>
            <div className="flex items-center  mb-5">
              <label className="text-white font-bold w-1/4">Hero Images</label>
              <input
                type="file"
                multiple
                className="border rounded p-2 text-white text-sm inline-block w-3/4"
                onChange={(e) => {
                  const files = e.target.files;
                  setHeroImages(Array.from(files));
                  console.log(files);
                }}
              />
              {/* <button
                type="button"
                className="absolute right-10 bg-red-400 text-black p-1 rounded-full text-xs mx-1"
                onClick={clearImage}
              >
                Clear
              </button> */}
              <button
                className={`text-white ml-2 p-1 rounded ${
                  loading ? "bg-red-400 cursor-not-allowed" : "bg-red-600"
                }`}
                disabled={loading}
                onClick={addHeroImages}
              >
                {loading ? "loading" : "Save"}
              </button>
            </div>
            <div className="flex items-center  mb-5 ">
              <label className="text-white font-bold w-1/4">About Us</label>
              <textarea
                className="border rounded p-2 w-3/4 bg-red-100 resize-none overflow-hidden"
                rows={1}
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                onChange={(e) => {
                  setAboutUs(e.target.value);
                }}
              ></textarea>

              <button
                className={`text-white ml-2 p-1 rounded ${
                  loading ? "bg-red-400 cursor-not-allowed" : "bg-red-600"
                }`}
                onClick={changeAboutUs}
                disabled={loading}
              >
                {loading ? "loading" : "Save"}
              </button>
            </div>
            <div className="flex items-center  mb-5 ">
              <label className="text-white font-bold  w-1/4">
                Facebook Link
              </label>
              <input
                type="text"
                // value={dollarValue}
                className="border rounded p-2 w-3/4 bg-red-100 "
                onChange={(e) => setDollarValue(e.target.value)}
              />

              <button
                className={`text-white ml-2 p-1 rounded ${
                  loading ? "bg-red-400 cursor-not-allowed" : "bg-red-600"
                }`}
                onClick={ChangeDollarValue}
                disabled={loading}
              >
                {loading ? "loading" : "Save"}
              </button>
            </div>
            <div className="flex items-center  mb-5 ">
              <label className="text-white font-bold  w-1/4">
                Telegram Link
              </label>
              <input
                type="text"
                // value={dollarValue}
                className="border rounded p-2 w-3/4 bg-red-100 "
                onChange={(e) => setDollarValue(e.target.value)}
              />

              <button
                className={`text-white ml-2 p-1 rounded ${
                  loading ? "bg-red-400 cursor-not-allowed" : "bg-red-600"
                }`}
                onClick={ChangeDollarValue}
                disabled={loading}
              >
                {loading ? "loading" : "Save"}
              </button>
            </div>
            <div className="flex items-center  mb-5 ">
              <label className="text-white font-bold  w-1/4">
                Instagram Link
              </label>
              <input
                type="text"
                // value={dollarValue\}
                className="border rounded p-2 w-3/4 bg-red-100 "
                onChange={(e) => setDollarValue(e.target.value)}
              />

              <button
                className={`text-white ml-2 p-1 rounded ${
                  loading ? "bg-red-400 cursor-not-allowed" : "bg-red-600"
                }`}
                onClick={ChangeDollarValue}
                disabled={loading}
              >
                {loading ? "loading" : "Save"}
              </button>
            </div>
            <div className="flex items-center  mb-5 ">
              <label className="text-white font-bold  w-1/4">
                Whatsapp numbers
              </label>
              <input
                type="text"
                // value={dollarValue}
                className="border rounded p-2 w-3/4 bg-red-100 "
                onChange={(e) => setDollarValue(e.target.value)}
              />

              <button
                className={`text-white ml-2 p-1 rounded ${
                  loading ? "bg-red-400 cursor-not-allowed" : "bg-red-600"
                }`}
                onClick={ChangeDollarValue}
                disabled={loading}
              >
                {loading ? "loading" : "Save"}
              </button>
            </div>
          </div>
          <p className="text-lg text-red-700 font-bold"> {statusMessage}</p>
        </div>
        {/* <form
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
                {...register("description", {
                  required: "Description is required",
                })}
                className="border rounded p-2 w-3/4 bg-red-100 resize-none overflow-hidden"
                rows={1}
                
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
              ></textarea>
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
                  {...register("image", {
                    required: "At least one image is required",
                  })}
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
                  <p className="text-red-500 font-bold">{statusMessage}</p>
                )}
              </div>
            </div>
          </form> */}
      </div>
      {/* {popupView === "add" && (
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
        )} */}
    </>
  );
};

export default SettingsPage;
