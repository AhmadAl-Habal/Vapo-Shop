import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../api/axios";
import Spinner from "../components/Spinner";
import hero from "../assets/bg.webp";
const AboutUsPage = () => {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [mainImage, setMainImage] = useState("");
  const [settings, setSettings] = useState({});
  const [aboutUs, setAboutUs] = useState("");
  const [dollarValue, setDollarValue] = useState("");
  const [heroImages, setHeroImages] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/settings");

        if (response.status === 200) {
          const settingsData = response.data.data[0];

          console.log("About Us from response:", settingsData.about_us);

          setDollarValue(settingsData.dollar_price);
          setHeroImages(settingsData.hero);
          setSettings(settingsData);
          setAboutUs(settingsData.about_us);
          sessionStorage.setItem("dollar_value", settingsData.dollar_price);
        } else {
          setSettings(null);
          setAboutUs(null);
        }
      } catch (err) {
        console.error("Error fetching settings:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="relative min-h-[100vh]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${hero})`, opacity: 0.7 }}
        ></div>
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>

        <div className="relative w-[80vw] mx-auto bg-transparent py-10 text-white">
          <p className="border border-2 py-1 px-2 rounded-full inline-block text-sm mb-5 ">
            <Link className="mr-5 text-white" to={"/"}>
              Return to Homepage
            </Link>
          </p>
          <div dir="rtl">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              <div>
                <h1 className="text-2xl font-bold mb-5">
                  لمحة عن Vapo كسم بشار
                </h1>
                <p className="w-full whitespace-pre-wrap text-white text-md font-bold">
                  {aboutUs || "No content available"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUsPage;
