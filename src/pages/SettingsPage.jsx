import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import hero from "../assets/motion11.jpg";
import Spinner from "../components/Spinner";
import Whatsapp from "../components/social links/Whatsapp";
import HeroImageField from "../components/HeroImageField";
import HeroBulkImageUploadForm from "../components/HeroBulkImageUploadForm";
import BackButton from "../components/BackButton";
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

  const [aboutUs, setAboutUs] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [popupView, setPopupView] = useState(false);

  const [facebookLink, setFacebookLink] = useState("");
  const [telegramLink, setTelegramLink] = useState("");
  const [whatsappChannelLink, setWhatsappChannelLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const storedToken = localStorage.getItem("token");
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/settings");

        if (response.status == "200") {
          setDollarValue(response.data.data[0].dollar_price);
          setAboutUs(response.data.data[0].about_us);
          setFacebookLink(response.data.data[0].social_media.facebook);
          setTelegramLink(response.data.data[0].social_media.telegram);
          setWhatsappChannelLink(
            response.data.data[0].social_media.whatsapp_channel
          );
          setInstagramLink(response.data.data[0].social_media.instagram);
          setWhatsappLink(response.data.data[0].social_media.whatsapp);
          setYoutubeLink(response.data.data[0].social_media.youtube);

          setSettings(response.data.data[0]);
          sessionStorage.setItem(
            "settings",
            JSON.stringify(response.data.data[0])
          );
        } else setSettings(response.status);
      } catch (err) {
        // setError(err.message);
        console.log("error");
      }
    };
    fetchData();
  }, [refresh]);
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
        //
      } else {
        setStatusMessage("Failed to change Dollar price");
        //
      }
    } catch (error) {
      console.error("Change Failed", error.response.data);
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
      console.error("Change Failed", error.response.data);
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
        // setRefresh(!refresh)
      } else {
        setStatusMessage("Failed to change Telegram link ");
      }
    } catch (error) {
      console.error("Change Failed", error.response.data);
    } finally {
      setLoading(false);
    }
  };
  const ChangeWhatsAppChannelLink = async () => {
    setStatusMessage("");

    setLoading(true);

    try {
      const response = await axios.put(
        "/settings/whatsapp_channel",
        { whatsapp_channel: whatsappChannelLink },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 200) {
        setStatusMessage("Whatsapp Channel link changed successfully!");
        // setRefresh(!refresh)
      } else {
        setStatusMessage("Failed to change Whatsapp Channel link ");
      }
    } catch (error) {
      console.error(
        "Failed to change Whatsapp Channel link",
        error.response.data
      );
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
      console.error("Change Failed", error.response.data);
    } finally {
      setLoading(false);
    }
  };
  const ChangeYoutubeLink = async () => {
    setStatusMessage("");

    setLoading(true);

    try {
      const response = await axios.put(
        "/settings/youtube",
        { youtube: youtubeLink },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 200) {
        setStatusMessage("Youtube link changed successfully!");
      } else {
        setStatusMessage("Failed to change Youtube link ");
      }
    } catch (error) {
      console.error("Change Failed", error.response.data);
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
      console.error("Change Failed", error.response.data);
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
      console.error("Change Failed", error.response.data);
    } finally {
      setLoading(false);
    }

    setPopupView(false);
  };

  if (!storedToken) {
    return (
      <div className={"relative min-h-[100vh] h-auto"}>
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

        <div className="relative space-y-4 w-[90vw] mx-auto bg-transparent py-7">
          <BackButton />
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

            <div className="flex items-center  mb-5 ">
              <label className="text-white font-bold w-1/4">About Us</label>
              <textarea
                className="border rounded p-2 w-3/4 bg-red-100 resize-none overflow-hidden"
                rows={1}
                value={aboutUs}
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
                Whatsapp Channel Link
              </label>
              <input
                type="text"
                value={whatsappChannelLink}
                className="border rounded p-2 w-3/4 bg-red-100 "
                onChange={(e) => setWhatsappChannelLink(e.target.value)}
              />

              <button
                className={`text-white ml-2 p-1 rounded ${
                  loading ? "bg-red-400 cursor-not-allowed" : "bg-red-600"
                }`}
                onClick={ChangeWhatsAppChannelLink}
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
            <div className="flex items-center  mb-5 ">
              <label className="text-white font-bold  w-1/4">
                Youtube Link
              </label>
              <input
                type="text"
                value={youtubeLink}
                className="border rounded p-2 w-3/4 bg-red-100 "
                onChange={(e) => setYoutubeLink(e.target.value)}
              />

              <button
                className={`text-white ml-2 p-1 rounded ${
                  loading ? "bg-red-400 cursor-not-allowed" : "bg-red-600"
                }`}
                onClick={ChangeYoutubeLink}
                disabled={loading}
              >
                {loading ? "loading" : "Save"}
              </button>
            </div>

            <div className="relative w-[80vw] mx-auto py-5 space-y-5">
              <Whatsapp accounts={whatsappLink} />
              {!loading && settings?.hero && (
                <HeroBulkImageUploadForm
                  inputDetails={settings}
                  endpoint={"hero"}
                  refresh={refresh}
                  setRefresh={setRefresh}
                />
              )}
              {!loading && settings?.hero && (
                <HeroImageField
                  inputDetails={settings}
                  endpoint={"hero"}
                  name={"Hero"}
                />
              )}
            </div>
          </div>
          <p className="text-lg text-red-700 font-bold"> {statusMessage}</p>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
