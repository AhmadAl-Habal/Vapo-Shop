import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../../api/axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import hero from "../../assets/bg.webp";
import Spinner from "../../components/Spinner";
import SubCategoriesList from "../../components/SubCategoriesList";
import BackButton from "../../components/BackButton";
const EditCategoryPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm();

  const storedToken = localStorage.getItem("token");
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [popupView, setPopupView] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [loadingSubCategories, setLoadingSubCategories] = useState(false);
  const [allSubCategories, setAllSubCategories] = useState([]);
  const [category, setCategory] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/category/${id}`);
        if (response.status === 200) {
          reset({
            name: response.data.data.name || "",
            description: response.data.data.description || "",
          });
          setImagePreview(response.data.data.image);
          setCategory(response.data.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refresh]);

  const onSubmit = async (data) => {
    setLoading(true);
    setStatusMessage("");

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      if (data.description) {
        formData.append("description", data.description);
      }

      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }
      const response = await axios.put(`/category/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setStatusMessage("Catgegory Edited successfully!");
        setCategory(response.data.data);
        console.log(category);

        // setTimeout(() => {
        //   navigate("/");
        // }, 2000);
        setRefresh((prev) => !prev);
        console.log(refresh);
      } else {
        setStatusMessage("Failed to edit the Catgegory.");
      }
    } catch (error) {
      console.error(
        "Error editing Category:",
        error.response?.data || error.message
      );
      console.log("Error response:", error.response);
      setStatusMessage("Error editing Category. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoadingSubCategories(true);
    const fetchData = async () => {
      try {
        const response = await axios.get("/sub_category");
        if (response.status == "200") {
          setAllSubCategories(response.data.data);
        } else setAllSubCategories(response.status);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingSubCategories(false);
      }
    };
    fetchData();
  }, [, popupView]);

  const clearImage = () => {
    setValue("image", null);
    clearErrors("image");
    setImagePreview(null);
  };

  if (!storedToken) {
    return (
      <div className={"relative min-h-[100vh]"}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${hero})`, opacity: 0.7 }}
        ></div>

        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
        <div className="relative  w-[80vw] mx-auto bg-transparent py-10">
          <h1 className="text-2xl font-bold text-red-500 mb-5">
            Access Denied
          </h1>
          <p className="text-white mb-5">
            You must be logged in to access this page.
          </p>
          <BackButton />
        </div>
      </div>
    );
  }
  return (
    <>
      <div className={"relative min-h-[100vh]"}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${hero})`, opacity: 0.7 }}
        ></div>

        <div className="absolute inset-0 bg-black bg-opacity-80"></div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative space-y-4 w-[90vw] mx-auto bg-transparent py-10"
        >
          <BackButton />

          <p className="text-center text-white font-bold">
            New Category Details
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
          </div>

          <div>
            <div className="flex items-center">
              <label className="text-white font-bold w-1/4">Image</label>
              <input
                type="file"
                {...register(
                  "image"
                  //   , {
                  //   required: "Image is required",
                  // }
                )}
                className="border rounded p-2 text-white text-sm inline-block w-3/4"
                // onChange={handleFileChange}
              />
              <button
                type="button"
                className="absolute right-1 bg-red-400 text-black p-1 rounded-full text-xs"
                onClick={clearImage}
              >
                Clear
              </button>
              {/* {errors.image && (
                <p className="ml-1 text-red-500">{errors.image.message}</p>
              )} */}
            </div>
            {imagePreview && (
              <div className="mt-4 w-full flex justify-center">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex mt-5">
              <button
                type="submit"
                className="bg-red-600 text-white px-4 py-1 rounded mr-5"
                disabled={loading}
              >
                {loading ? "Loading..." : "Edit"}
              </button>
              {statusMessage && (
                <p className="text-red-500 font-bold">{statusMessage}</p>
              )}
            </div>
          </div>
        </form>
        <SubCategoriesList
          category={category}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      </div>
    </>
  );
};

export default EditCategoryPage;
