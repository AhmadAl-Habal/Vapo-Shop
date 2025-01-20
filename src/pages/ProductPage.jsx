import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../api/axios";
import Spinner from "../components/Spinner";
import hero from "../assets/bg.webp";
const ProductPage = () => {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [mainImage, setMainImage] = useState("");
  const storedDollarValue = sessionStorage.getItem("dollar_value");
  const [popupView, setPopupView] = useState(false);

  const [whatsappAccounts, setWhatsappAccounts] = useState([]);
  useEffect(() => {
    const storedSettings = sessionStorage.getItem("settings");

    if (storedSettings) {
      const settingsObject = JSON.parse(storedSettings);
      console.log(settingsObject.social_media.whatsapp);

      setWhatsappAccounts(settingsObject.social_media.whatsapp);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(`/item/${id}`);

        if (response.status == "200") {
          const data = response.data.data;
          setProductDetails(data);
          if (data.images?.length) {
            setMainImage(data.images[0]);
          }
        } else setProductDetails(response.status);
      } catch (err) {
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

          {loading ? (
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
                    className="flex w-full justify-center items-center mb-5  flex-wrap"
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

              <div
                dir="rtl"
                className="bg-transparent text-white p-5 rounded-lg shadow-lg max-w-lg mx-auto"
              >
                <h2 className="text-xl font-bold mb-4">
                  {productDetails.name}
                </h2>

                {productDetails.description && (
                  <p className="mb-4 text-gray-300 whitespace-pre-wrap leading-relaxed">
                    <span className="font-bold text-lg mb-2 block">الوصف:</span>
                    {productDetails.description}
                  </p>
                )}
                <div className="mb-6">
                  <p className="font-bold text-lg mb-2">السعر:</p>
                  {productDetails.discount ? (
                    <div className="flex flex-col items-start gap-2">
                      {/* Original Price */}
                      <span className="flex items-center text-gray-400 text-sm line-through">
                        السعر الأصلي: ${productDetails.price}
                      </span>

                      {/* Discounted Price */}
                      <span className="flex items-center text-green-400 text-xl font-bold">
                        السعر بعد الخصم: $
                        {(
                          productDetails.price *
                          (1 - productDetails.discount / 100)
                        ).toFixed(2)}
                      </span>

                      {/* Price in Local Currency */}
                      <span className="text-sm text-gray-300">
                        ما يعادل:{" "}
                        {(
                          productDetails.price *
                          storedDollarValue *
                          (1 - productDetails.discount / 100)
                        ).toLocaleString("en-US", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 2,
                        })}{" "}
                        ل.س
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-start gap-2">
                      {/* Price without discount */}
                      <span className="text-gray-300 text-xl font-bold">
                        ${productDetails.price}
                      </span>
                      <span className="text-sm text-gray-300">
                        ما يعادل:{" "}
                        {(
                          productDetails.price * storedDollarValue
                        ).toLocaleString("en-US")}{" "}
                        ل.س
                      </span>
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <p className="font-bold text-lg mb-2">الصنف:</p>
                  <span className="inline-block bg-red-600 text-gray-200 text-sm px-3 py-1 rounded-full">
                    {productDetails.main_category_id &&
                      productDetails.main_category_id.name}
                  </span>
                </div>

                <a
                  onClick={() => setPopupView(true)}
                  // href="https://wa.link/z0mvhm"
                  className="block text-center bg-red-500 hover:bg-red-600 transition duration-200 text-white font-bold py-2 rounded-lg cursor-pointer"
                >
                  أطلب الآن
                </a>
              </div>
            </>
          ) : (
            <p>No product details available.</p>
          )}
        </div>
      </div>
      {popupView && (
        <div
          className="bg-black z-10 inset-0 absolute bg-opacity-70"
          onClick={(e) => {
            setPopupView(false);
          }}
        >
          <button
            className="right-0 cursor-pointer p-3 text-white absolute top-20 rounded-full w-[40px]"
            onClick={() => {
              setPopupView(false);
            }}
          >
            X
          </button>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="flex items-center justify-center h-100vh"
          >
            <div
              dir="rtl"
              className="flex flex-col text-white absolute inset-50 bg-black p-4  top-[40vh] w-[80vw] rounded-lg "
            >
              {whatsappAccounts.length != 0 ? (
                <>
                  <p className="font-bold mb-5">أختر الادمن المناسب:</p>
                  <ul className="space-y-2 text-gray-400">
                    {whatsappAccounts.map((account, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between bg-black bg-opacity-40 p-3 rounded"
                      >
                        <div>
                          <p className="font-bold ">{account.name}</p>

                          <p className="text-sm">{account.phone_number}+</p>
                        </div>
                        <button className="bg-red-600 text-white py-1 px-2 rounded">
                          <a href={account.link}>تواصل من هنا</a>
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p>No accounts to show</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;
