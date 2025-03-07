import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import axios from "../../api/axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import ImageField from "../../components/ImageField";
import BulkImageUploadForm from "../../components/BulkImageUploadForm";
import hero from "../../assets/motion11.jpg";
import BackButton from "../../components/BackButton";

const EditFAQPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const storedToken = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [faqDetails, setFaqDetails] = useState({});

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(`/faq/${id}`);

        if (response.status === 200) {
          setFaqDetails(response.data.data);
          reset({
            question: response.data.data.question || "",
            answer: response.data.data.answer || "",
          });
        }
        // setRefresh(false)
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
      formData.append("question", data.question);
      formData.append("answer", data.answer);

      const response = await axios.put(`/faq/${id}`, formData, {});

      if (response.status === 200) {
        setStatusMessage("FAQ edited successfully!");
        // setTimeout(() => {
        //   navigate("/faq");
        // }, 2000);
      } else {
        setStatusMessage("Failed to edit the FAQ.");
      }
    } catch (error) {
      console.error("Error edit FAQ:", error.response?.data || error.message);
      setStatusMessage("Error edit FAQ. Please try again.");
    } finally {
      setLoading(false);
    }
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
          className="relative space-y-4 w-[80vw] mx-auto bg-transparent py-7"
        >
          <BackButton />
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
                rows={1}
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
        <div className="relative w-[80vw] mx-auto py-5">
          {!loading && faqDetails?.images && (
            <BulkImageUploadForm
              inputDetails={faqDetails}
              endpoint={"faq"}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          )}
        </div>
        <div className="relative w-[80vw] mx-auto py-5">
          {!loading && faqDetails?.images && (
            <ImageField
              inputDetails={faqDetails}
              endpoint={"faq"}
              name={"FAQ"}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default EditFAQPage;
