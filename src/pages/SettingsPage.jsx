import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import hero from "../assets/bg.webp";
import Spinner from "../components/Spinner";
import Whatsapp from "../components/social links/Whatsapp";
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

  const [facebookLink, setFacebookLink] = useState("");
  const [telegramLink, setTelegramLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");
  const storedToken = localStorage.getItem("token");
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
        // console.log(response.data.data[0].social_media.whatsapp);

        if (response.status == "200") {
          setDollarValue(response.data.data[0].dollar_price);
          setAboutUs(response.data.data[0].about_us);
          setFacebookLink(response.data.data[0].social_media.facebook);
          setTelegramLink(response.data.data[0].social_media.telegram);
          setInstagramLink(response.data.data[0].social_media.instagram);
          setWhatsappLink(response.data.data[0].social_media.whatsapp);

          setSettings(response.data.data[0]);
        } else setSettings(response.status);
      } catch (err) {
        // setError(err.message);
        console.log("error");
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
  const ChangeFacebookLink = async () => {
    setStatusMessage("");

    setLoading(true);

    try {
      const response = await axios.put(
        "/settings/facebook",
        { facebook: facebookLink },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 200) {
        setStatusMessage("Facebook link changed successfully!");
      } else {
        setStatusMessage("Failed to change Facebook link ");
      }
    } catch (error) {
      console.error("Login failed:", error.response.data);
    } finally {
      setLoading(false);
    }
  };
  const ChangeTelegramLink = async () => {
    setStatusMessage("");

    setLoading(true);

    try {
      const response = await axios.put(
        "/settings/telegram",
        { telegram: telegramLink },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 200) {
        setStatusMessage("Telegram link changed successfully!");
      } else {
        setStatusMessage("Failed to change Telegram link ");
      }
    } catch (error) {
      console.error("Login failed:", error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const ChangeInstagramLink = async () => {
    setStatusMessage("");

    setLoading(true);

    try {
      const response = await axios.put(
        "/settings/instagram",
        { instagram: instagramLink },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 200) {
        setStatusMessage("Instagram link changed successfully!");
      } else {
        setStatusMessage("Failed to change Instagram link ");
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
        { about_us: aboutUs },
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
      <div
        className={
          popupView
            ? "relative min-h-[100vh] bg-black bg-opacity-50 opacity-50"
            : "relative min-h-[100vh]"
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
              Return to Homepage
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
                value={facebookLink}
                className="border rounded p-2 w-3/4 bg-red-100 "
                onChange={(e) => setFacebookLink(e.target.value)}
              />

              <button
                className={`text-white ml-2 p-1 rounded ${
                  loading ? "bg-red-400 cursor-not-allowed" : "bg-red-600"
                }`}
                onClick={ChangeFacebookLink}
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
                value={telegramLink}
                className="border rounded p-2 w-3/4 bg-red-100 "
                onChange={(e) => setTelegramLink(e.target.value)}
              />

              <button
                className={`text-white ml-2 p-1 rounded ${
                  loading ? "bg-red-400 cursor-not-allowed" : "bg-red-600"
                }`}
                onClick={ChangeTelegramLink}
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
                value={instagramLink}
                className="border rounded p-2 w-3/4 bg-red-100 "
                onChange={(e) => setInstagramLink(e.target.value)}
              />

              <button
                className={`text-white ml-2 p-1 rounded ${
                  loading ? "bg-red-400 cursor-not-allowed" : "bg-red-600"
                }`}
                onClick={ChangeInstagramLink}
                disabled={loading}
              >
                {loading ? "loading" : "Save"}
              </button>
            </div>
            <Whatsapp accounts={whatsappLink} />
          </div>
          <p className="text-lg text-red-700 font-bold"> {statusMessage}</p>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
