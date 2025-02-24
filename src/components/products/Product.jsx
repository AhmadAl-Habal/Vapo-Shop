import React, { useState, useEffect, useRef } from "react";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import { FaEdit } from "react-icons/fa";

const Product = ({ product }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAppeared, setHasAppeared] = useState(false);

  const [showAllDesc, setShowAllDesc] = useState(false);
  const [token, setToken] = useState("");
  const productRef = useRef(null);
  const storedDollarValue = sessionStorage.getItem("dollar_value");
  const [popupView, setPopupView] = useState(false);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || "");
  }, []);

  const deleteItem = async () => {
    try {
      const response = await axios.delete(`/item/${product._id}`);
      setPopupView(false);
      setIsVisible(false);
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAppeared) {
          setIsVisible(true); // Trigger animation
          setHasAppeared(true); // Lock it, so it never animates again
        }
      },
      { threshold: 0.3 } // Adjust threshold as needed
    );

    const currentElement = productRef.current;
    if (currentElement) observer.observe(currentElement);

    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, [hasAppeared]); // Depend only on `hasAppeared` to avoid re-triggers

  return (
    <>
      {" "}
      <div
        ref={productRef}
        className={`transform transition-all duration-500 ease-in-out ${
          hasAppeared ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        } flex flex-col justify-center items-center border border-1 border-white rounded-lg bg-white p-2 shadow-lg flex-wrap`}
      >
        <Link to={`/product/${product._id}`}>
          <img
            className="mb-3 rounded-full w-full h-full max-w-[140px] max-h-[140px] h-[140px]"
            src={product.images[0]}
            alt=""
          />
        </Link>
        <div dir="rtl" className="w-full">
          <Link to={`/product/${product._id}`}>
            <div className="w-full text-center mb-1">
              {product.name}
              {product.main_category_id && (
                <p className="inline-block border border-1 rounded-full text-xs p-1 bg-red-600 bg-opacity-60 text-gray-300 mx-1">
                  {product.main_category_id.name}
                </p>
              )}
            </div>
          </Link>

          <div className="w-full  px-1 text-sm justify-around items-center">
            <div className="font-bold text-green-700">
              <p className="">
                {product.discount ? (
                  <span>
                    <span className="text-gray-400 line-through mr-2">
                      ${product.price}
                    </span>
                    <span>
                      $
                      {(product.price * (1 - product.discount / 100)).toFixed(
                        2
                      )}
                    </span>
                  </span>
                ) : (
                  `$${product.price}`
                )}
              </p>
              <p className="">
                {product.discount ? (
                  <span>
                    {(
                      product.price *
                      storedDollarValue *
                      (1 - product.discount / 100)
                    ).toLocaleString("en-US", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    })}
                    ل.س
                  </span>
                ) : (
                  `${(product.price * storedDollarValue).toLocaleString(
                    "en-US"
                  )} ل.س `
                )}
              </p>
            </div>

            {token && (
              <div className="flex justify-around items-center">
                <MdDelete
                  className="cursor-pointer ml-1"
                  color="red"
                  onClick={() => setPopupView(true)}
                  size={30}
                />
                <Link to={`/edit-product/${product._id}`}>
                  <FaEdit
                    size={30}
                    color="#d0bf4c"
                    className="cursor-pointer"
                  />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      {popupView && (
        <div
          className="min-h-screen w-full bg-black z-10 fixed top-0 left-0 bg-opacity-70 flex justify-center items-center"
          onClick={() => setPopupView(false)}
        >
          <div
            dir="rtl"
            className="bg-white text-black p-6 rounded-lg shadow-lg w-[80vw] max-w-[400px] text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">تأكيد الحذف</h2>
            <p className="mb-6">
              هل أنت متأكد من حذف المنتج{" "}
              <span className="font-bold">"{product.name}"</span>؟
            </p>

            <div className="flex justify-center gap-4">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={() => deleteItem(product.id)}
              >
                نعم، احذف
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setPopupView(false)}
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
