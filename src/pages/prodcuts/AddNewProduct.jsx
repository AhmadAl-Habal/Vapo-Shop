import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";
import hero from "../../assets/motion11.jpg";
import Spinner from "../../components/Spinner";
import BackButton from "../../components/BackButton";

const AddNewProduct = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();
  const storedToken = localStorage.getItem("token");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [allSubCategories, setAllSubCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [popupView, setPopupView] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    setStatusMessage("");
    const selectedCategory = allCategories.find(
      (category) => category._id === data.main_category_id
    );
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      if (data.description) {
        formData.append("description", data.description);
      }
      formData.append("price", data.price);

      if (data.discount) {
        formData.append("discount", data.discount);
      }

      formData.append("main_category_id", data.main_category_id);

      if (data.sub_category_id) {
        formData.append("sub_category_id", data.sub_category_id);
      }
      Array.from(data.image).forEach((file) => {
        formData.append("image", file);
      });

      const response = await axios.post("/item", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        setStatusMessage("Product created successfully!, Redirecting...");
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

  useEffect(() => {
    setLoadingCategories(true);
    const fetchData = async () => {
      try {
        const response = await axios.get("/category");
        if (response.status == "200") {
          setAllCategories(response.data.data);
        } else setAllCategories(response.status);

        const response2 = await axios.get("/sub_category");
        console.log(response2.data.data);

        if (response2.status == "200") {
          setAllSubCategories(response2.data.data);
          setFilteredSubCategories(response2.data.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchData();
  }, [popupView]);

  const clearImage = () => {
    setValue("image", null);
    clearErrors("image");
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setSelectedCategoryId(selectedCategoryId);

    const filtered = allSubCategories.filter(
      (subCategory) =>
        subCategory.main_category_id &&
        subCategory.main_category_id._id === selectedCategoryId
    );
    setFilteredSubCategories(filtered);
  };

  if (!storedToken) {
    return (
      <div className={"relative min-h-[100vh]"}>
        <div
          className="absolute inset-0 bg-fixed bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${hero})`, opacity: 0.7 }}
        ></div>

        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
        <div className="relative  w-[80vw] mx-auto bg-transparent py-7">
          <div dir="rtl">
            <h1 className="text-2xl font-bold text-red-500 mb-5">وصول مرفوض</h1>
            <p className="text-white mb-5">
              يجب تسجيل الدخول للوصول الى هذه الصفحة
            </p>
          </div>
          <BackButton />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={"relative min-h-[100vh]"}>
        <div
          className="absolute inset-0 bg-fixed bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${hero})`, opacity: 0.7 }}
        ></div>

        <div className="absolute inset-0 bg-black bg-opacity-80"></div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative space-y-4 w-[90vw] mx-auto bg-transparent py-7"
        >
          <BackButton />
          <p className="text-center text-white font-bold">
            New Product Details
          </p>

          <div className="flex items-center">
            <label className="text-white font-bold w-1/4">Name</label>
            <textarea
              dir="rtl"
              {...register("name", { required: "Name is required" })}
              className="border rounded p-2 w-3/4 bg-red-100 resize-none overflow-hidden"
              rows={1}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
            ></textarea>
          </div>
          <div className="flex items-center">
            <label className="text-white font-bold w-1/4">Description</label>
            <textarea
              dir="rtl"
              {...register("description")}
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
              dir="rtl"
              type="number"
              step="0.01"
              {...register("price", { required: "Price is required" })}
              className="border rounded p-2 w-3/4 bg-red-100"
            />
            {errors.price && (
              <p className="mt-2 text-red-500 font-bold text-center">
                {errors.price.message}
              </p>
            )}
          </div>
          <div className="flex">
            <label className="text-white font-bold w-1/4 text-sm">
              Discount
            </label>
            <input
              dir="rtl"
              type="number"
              step="0.01"
              {...register("discount")}
              className="border rounded p-2 w-3/4 bg-red-100"
            />
            {/* {errors.discount && (
              <p className="mt-2 text-red-500 font-bold text-center">{errors.discount.message}</p>
            )} */}
          </div>
          <div className="flex flex-col">
            {loadingCategories ? (
              <p className="text-gray-600">Loading...</p>
            ) : (
              <>
                <div className="flex mb-4">
                  <label className="text-white font-bold w-1/4">Category</label>
                  <div className="flex items-center">
                    <select
                      dir="rtl"
                      {...register("main_category_id", {
                        required: "Price is required",
                      })}
                      className="border rounded p-2 w-full bg-red-100 text-right w-3/4"
                      onChange={handleCategoryChange}
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
                      <Link
                        className=" bg-green-500 text-white p-1 rounded-full text-xs"
                        to={"/add-category"}
                      >
                        Add
                      </Link>
                      <button
                        type="button"
                        className=" bg-red-500 text-white p-1 rounded-full text-xs"
                        onClick={() => {
                          navigate(`/edit-category/${selectedCategoryId}`);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <label className="text-white font-bold w-1/4 break-all">
                    SubCategory
                  </label>
                  <div className="flex items-center w-3/4">
                    {selectedCategoryId ? (
                      filteredSubCategories.length > 0 ? (
                        <select
                          dir="rtl"
                          {...register("sub_category_id")}
                          className="border rounded p-2 bg-red-100 text-right w-full"
                        >
                          <option className="text-left" value="">
                            Select a Subcategory
                          </option>
                          {filteredSubCategories.map((subCategory) => (
                            <option
                              className="inline-block flex justify-between"
                              key={subCategory._id}
                              value={subCategory._id}
                            >
                              {subCategory.name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <p className="ml-2 text-red-600 font-bold">
                          There are no subcategories for this category yet.
                        </p>
                      )
                    ) : (
                      <p className="ml-2 text-red-600 font-bold">
                        Please select a main category first.
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
          <div>
            <div className="flex items-center">
              <label className="text-white font-bold w-1/4">Images</label>
              <input
                type="file"
                {...register("image", {
                  required: "At least one image is required",
                })}
                multiple
                className="border rounded p-2 text-white text-sm inline-block w-3/4"
              />
              <button
                type="button"
                className="absolute right-1 bg-red-400 text-black p-1 rounded-full text-xs"
                onClick={clearImage}
              >
                Clear
              </button>
              {errors.image && (
                <p className="mt-2 text-red-500 font-bold text-center">
                  {errors.image.message}
                </p>
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
        </form>
      </div>
    </>
  );
};

export default AddNewProduct;

{
  /* {popupView === "add" && (
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
      )} */
}
