import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../api/axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import hero from "../assets/bg.webp";
const AddNewFAQPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    handleSubmit,setValue,
    clearErrors,
    formState: { errors },
  } = useForm();
  const storedToken = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    setStatusMessage("");

    try {
      const formData = new FormData();


      formData.append("question", data.question);
      formData.append("answer", data.answer);
      if (data.image && data.image.length > 0) {
        Array.from(data.image).forEach((file) => {
          formData.append("image", file);
        });
      }
      const response = await axios.post(`/faq`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        setStatusMessage("FAQ created successfully!, Redirecting ...");
        setTimeout(() => {
          navigate("/faq");
        }, 2000);
      } else {
        setStatusMessage("Failed to create the FAQ.");
      }
    } catch (error) {
      console.error("Error create FAQ:", error.response?.data || error.message);
      setStatusMessage("Error create FAQ. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const clearImage = () => {
    setValue("image", []);
    clearErrors("image");
 
  };
//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };
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
          <Link
            to="/"
            className="text-white font-bold text-sm border border-2 rounded-full py-1 px-2"
          >
            Return to Homepage
          </Link>
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
          className="relative space-y-4 w-[80vw] mx-auto bg-transparent py-10"
        >
          <p className="border border-2 py-1 px-2 rounded-full inline-block text-sm">
            <Link className="mr-5 text-white" to={"/faq"}>
              Return to FAQs page
            </Link>
          </p>
          <p className="text-center text-white font-bold">FAQ details</p>

          <div>
            <div className="flex items-center">
              <label className="text-white font-bold w-1/4">Question</label>
              <textarea
                {...register("question", {
                  required: "This field is required",
                })}
                className="border rounded p-2 w-3/4 bg-red-100 resize-none overflow-hidden"
                rows={1}
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
              ></textarea>
            </div>
            {errors.question && (
              <p className="text-red-500 mt-2 text-center font-bold">
                {errors.question.message}
              </p>
            )}
          </div>
          <div>
            <div className="flex items-center">
              <label className="text-white font-bold w-1/4">Answer</label>
              <textarea
                {...register("answer", { required: "This field is required" })}
                className="border rounded p-2 w-3/4 bg-red-100 resize-none overflow-hidden"
                rows={2}
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
              ></textarea>
            </div>
            {errors.answer && (
              <p className="text-red-500 mt-2 text-center font-bold">
                {errors.answer.message}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center">
              <label className="text-white font-bold w-1/4">Images</label>
              <input
                type="file"
                {...register("image")}
                multiple
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
            </div>
            <div className="flex mt-5">
              <button
                type="submit"
                className="bg-red-600 text-white px-4 py-1 rounded mr-5"
                disabled={loading}
              >
                {loading ? "Loading..." : "Add"}
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

export default AddNewFAQPage;
