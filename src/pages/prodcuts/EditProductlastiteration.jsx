import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../../api/axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import hero from "../../assets/bg.webp";
import ImageField from "../../components/ImageField";
import BulkImageUploadForm from "../../components/BulkImageUploadForm";
import BackButton from "../../components/BackButton";
const EditProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const storedToken = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [popupView, setPopupView] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [deletedCategoryId, setDeletedCategoryId] = useState("");
  const [productDetails, setProductDetails] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [allSubCategories, setAllSubCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);

  useEffect(() => {
    console.log("Refresh triggered:", refresh);
  }, [refresh]);
  useEffect(() => {
    setLoadingCategories(true);
    const fetchData = async () => {
      try {
        const response = await axios.get("/category");
        if (response.status == "200") {
          setAllCategories(response.data.data);
        } else setAllCategories(response.status);
        const response2 = await axios.get("/sub_category");

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/item/${id}`);
        if (response.status === 200) {
          const productData = response.data.data;
          setProductDetails(productData);

          reset({
            name: productData.name || "",
            price: productData.price || "",
            discount: productData.discount || "",
            description: productData.description || "",
            main_category_id: productData.main_category_id?._id || "",
            sub_category_id: productData.sub_category_id?._id || "",
          });

          const filtered = allSubCategories.filter(
            (subCategory) =>
              subCategory.main_category_id &&
              subCategory.main_category_id._id ===
                productData.main_category_id?._id
          );

          setFilteredSubCategories(filtered);

          // If product has a subcategory, select it; otherwise, clear the selection
          if (productData.sub_category_id?._id) {
            reset((prevData) => ({
              ...prevData,
              sub_category_id: productData.sub_category_id._id,
            }));
          } else {
            reset((prevData) => ({
              ...prevData,
              sub_category_id: "",
            }));
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refresh, allSubCategories]);

  const onSubmit = async (data) => {
    setLoading(true);
    setStatusMessage("");

    try {
      const formData = new FormData();
      formData.append("name", data.name);

      formData.append("price", data.price);
      if (data.discount) {
        formData.append("discount", data.discount);
      }
      if (data.description) {
        formData.append("description", data.description);
      }
      formData.append("main_category_id", data.main_category_id);
      // if (data.image.length >= 1) {
      //   Array.from(data.image).forEach((file) => {
      //     formData.append("image", file);
      //   });
      // }
      console.log("data", data);

      if (data.sub_category_id) {
        formData.append("sub_category_id", data.sub_category_id);
      }
      const response = await axios.put(`/item/${id}`, formData, {});

      if (response.status === 200) {
        setStatusMessage("Product edited successfully!");
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

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setSelectedCategoryId(selectedCategoryId);

    // Filter the subcategories based on the selected category
    const filtered = allSubCategories.filter(
      (subCategory) =>
        subCategory.main_category_id &&
        subCategory.main_category_id._id === selectedCategoryId
    );

    setFilteredSubCategories(filtered);
    reset({ ...productDetails, sub_category_id: "" }); // Reset subcategory selection
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
  useEffect(() => {
    if (selectedCategoryId) {
      const filtered = allSubCategories.filter(
        (subCategory) =>
          subCategory.main_category_id &&
          subCategory.main_category_id._id === selectedCategoryId
      );
      setFilteredSubCategories(filtered);
    }
  }, [selectedCategoryId, allSubCategories]);

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
      <div
        className={
          popupView
            ? "relative min-h-[100vh] bg-black bg-opacity-50 opacity-50"
            : "relative min-h-[100vh]"
        }
      >
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
              {...register("description")}
              className="border rounded p-2 w-3/4 bg-red-100 resize-none overflow-hidden"
              rows={1}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
            ></textarea>
            {errors.name && (
              <p className="text-red-500 ml-1">{errors.name.description}</p>
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
          <div className="flex flex-col">
            {loadingCategories ? (
              <p className="text-gray-600">Loading...</p>
            ) : (
              <>
                <div className="flex mb-4">
                  <label className="text-white font-bold w-1/4">Category</label>
                  <div className="flex items-center">
                    <select
                      {...register("main_category_id")}
                      className="border rounded p-2 w-full bg-red-100 text-right w-3/4"
                      onChange={handleCategoryChange}
                      value={selectedCategoryId}
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
                  <label className="text-white font-bold w-1/4">
                    SubCategory
                  </label>
                  <div className="flex items-center w-3/4">
                    {filteredSubCategories.length > 0 ? (
                      <select
                        {...register("sub_category_id")}
                        className="border rounded p-2 bg-red-100 text-right w-full"
                      >
                        <option className="text-left" value="">
                          Select a Subcategory
                        </option>
                        {filteredSubCategories.map((subCategory) => (
                          <option key={subCategory._id} value={subCategory._id}>
                            {subCategory.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p className="ml-2 text-red-600 font-bold">
                        {selectedCategoryId
                          ? "No subcategories available for this category."
                          : "Please select a category first."}
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
          {/* <div className="flex">
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
          </div> */}
          <div>
            <div className="flex mt-5">
              <button
                type="submit"
                className="bg-red-600 text-white px-4 py-1 rounded mr-5"
                disabled={loading}
              >
                {loading ? "Loading..." : "ُEdit"}
              </button>
              {statusMessage && (
                <p className="text-red-500 font-bold">{statusMessage}</p>
              )}
            </div>
          </div>
        </form>

        <div className="relative w-[80vw] mx-auto py-5">
          {!loading && productDetails?.images && (
            <BulkImageUploadForm
              inputDetails={productDetails}
              endpoint={"item"}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          )}
        </div>
        <div className="relative w-[80vw] mx-auto py-5">
          {!loading && productDetails?.images && (
            <ImageField
              inputDetails={productDetails}
              endpoint={"item"}
              name={"Product"}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default EditProductPage;
