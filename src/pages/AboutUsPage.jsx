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
                <h1 className="text-2xl font-bold mb-5">لمحة عن Vapo كسم بشار</h1>
                <p className="w-full whitespace-pre-wrap text-white text-md font-bold">
                  {aboutUs || "No content available"}
                </p>
              </div>
            )}
          </div>
          {/* {loading ? (
            <Spinner />
          ) : productDetails ? (
            <>
              <div className="w-full">
                <div className="w-full flex justify-center items-center mb-5">
                  <img
                    src={mainImage}
                    alt="Main Product"
                    className="rounded w-[350px] h-[350px] object-contain"
                  />
                </div>

                {productDetails.images?.length > 1 && (
                  <div
                    dir="rtl"
                    className="flex w-full justify-center items-center mb-5"
                  >
                    {productDetails.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Product Image ${index + 1}`}
                        className="rounded-full w-10 h-10 mx-1 cursor-pointer object-cover"
                        onClick={() => setMainImage(image)}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div dir="rtl">
                <p className="mb-2">الاسم: {productDetails.name}</p>
                <p className="mb-2">الوصف: {productDetails.description}</p>
                <p className="mb-2">السعر: {productDetails.price}$</p>
                <p className="mb-2">
                  الصنف:
                  <span className="inline-block border border-1 rounded-full text-xs p-1 bg-red-600 bg-opacity-60 text-gray-300 mx-1">
                    {" "}
                    {productDetails.main_category_id &&
                      productDetails.main_category_id.name}
                  </span>
                </p>
                <a
                  href="https://wa.link/z0mvhm"
                  className="p-1 bg-red-500 text-xs font-bold rounded-lg"
                >
                  أطلب الآن
                </a>
              </div>
            </>
          ) : (
            <p>No product details available.</p>
          )} */}
        </div>
      </div>
    </>
  );
};

export default AboutUsPage;