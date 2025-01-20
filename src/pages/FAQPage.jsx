import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../api/axios";
import Spinner from "../components/Spinner";
import hero from "../assets/bg.webp";
import FAQ from "../components/FAQ";
import { CiCirclePlus } from "react-icons/ci";
const FAQPage = () => {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [settings, setSettings] = useState({});
  const [faqs, setFaqs] = useState([]);
  const [dollarValue, setDollarValue] = useState("");
  const [heroImages, setHeroImages] = useState([]);
  const [token, setToken] = useState("");
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || "");

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/faq");
        if (response.status === 200) {
          const settingsData = response.data.data;

          setFaqs(settingsData);
        } else {
          setFaqs(null);
        }
      } catch (err) {
        console.error("Error fetching FAQs:", err.message);
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
          <div>
            {loading ? (
              <Spinner loading={loading} />
            ) : (
              <div>
                <div className="flex justify-between mb-5" dir="rtl">
                  <p className="text-right text-2xl">الأسئلة الشائعة</p>
                  {token && (
                    <Link className="" to={"/add-faq"}>
                      <CiCirclePlus
                        size={30}
                        color="white"
                        className="g-gray-200"
                      />
                    </Link>
                  )}
                </div>

                {faqs.length === 0 ? (
                  <p>There are no FAQ to show</p>
                ) : (
                  faqs.map((faq) => (
                    <FAQ
                      question={faq.question}
                      answer={faq.answer}
                      images={faq.images}
                      id={faq._id}
                    />
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQPage;
