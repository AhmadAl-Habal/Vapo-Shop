import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { FaChevronDown, FaChevronUp, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const SubcategoriesList = ({ refresh, setRefresh, category }) => {
  const [loadingSubCategories, setLoadingSubCategories] = useState(false);
  const [allSubCategories, setAllSubCategories] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setStatusMessage("");
    setLoadingSubCategories(false); // Ensure the loader doesn't stay on for invalid cases

    // Check if category is valid before executing the fetch request
    if (!category || Object.keys(category).length === 0) {
      setAllSubCategories([]); // Clear any previously loaded subcategories
      return;
    }

    setLoadingSubCategories(true);
    const fetchData = async () => {
      try {
        const response = await axios.get("/sub_category", {
          params: { main_category_id: category._id },
        });

        if (response.status === 200) {
          setAllSubCategories(response.data.data);

          // Handle the case when subcategories list is empty
          if (response.data.data.length === 0) {
            setStatusMessage(
              "There is no Subcategories yet for this category."
            );
          }
        }
      } catch (err) {
        if (err.response?.status === 404) {
          setStatusMessage("There is no Subcategories yet for this category.");
        } else {
          setStatusMessage("Error fetching Subcategories. Please try again.");
        }
      } finally {
        setLoadingSubCategories(false);
      }
    };

    fetchData();
  }, [refresh, category]);

  const onSubmit = async (data) => {
    setLoading(true);
    setStatusMessage("");

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      if (data.description) {
        formData.append("description", data.description);
      }
      formData.append("main_category_id", category._id);
      const response = await axios.post("/sub_category", formData);
      //   setCategory(response.data.data);
      console.log(response);

      if (response.status === 201) {
        setStatusMessage("Catgegory created successfully!");
        // setTimeout(() => {
        //   navigate("/");
        // }, 2000);
        setRefresh((prev) => !prev);
      } else {
        setStatusMessage("Failed to create the Catgegory.");
      }
    } catch (error) {
      console.error(
        "Error creating Category:",
        error.response?.data || error.message
      );
      console.log("Error response:", error.response);
      setStatusMessage("Error creating Category. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  if (!category || Object.keys(category).length === 0) {
    return <></>;
  }

  const deleteProfile = async (subId) => {
    try {
      const response = await axios.delete(`/sub_category/${subId}`);
      console.log(response);

      setAllSubCategories((prev) =>
        prev.filter((subCategory) => subCategory._id !== subId)
      );
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  return (
    <div className="relative space-y-4 w-[90vw] mx-auto bg-transparent py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative space-y-2 w-[80vw] mx-auto bg-transparent py-10 text-sm"
      >
        <p className="text-center text-white font-bold text-lg mb-5">
          New SubCategory Details
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
      {/* <p className="text-white bg-black ">{statusMessage && statusMessage}</p> */}
      <ul className="space-y-2 text-sm  w-[70vw] mx-auto">
        {allSubCategories.length > 0 &&
          allSubCategories.map((subCategory, subId) => (
            <li
              key={subId}
              className="flex items-center justify-between bg-black bg-opacity-40 p-3 rounded"
            >
              <div className="text-white rounded-lg">
                <p className="font-bold">{subCategory.name}</p>
                <p className="text-sm">{subCategory.description}</p>
              </div>
              <button
                onClick={() => deleteProfile(subCategory._id)}
                className="bg-red-600 text-white py-1 px-3 rounded"
              >
                Delete
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SubcategoriesList;
