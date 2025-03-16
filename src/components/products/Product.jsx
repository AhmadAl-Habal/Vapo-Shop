import React, { useState, useEffect, useRef } from "react";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { deleteItem } from "../../api/axios";
import { FaEdit } from "react-icons/fa";

const Product = ({ product }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [popupView, setPopupView] = useState(false);
  const productRef = useRef(null);

  const storedDollarValue =
    parseFloat(sessionStorage.getItem("dollar_value")) || 1;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05 }
    );

    if (productRef.current) observer.observe(productRef.current);
    return () => observer.disconnect();
  }, []);

  const deleteProduct = async () => {
    try {
      await deleteItem("item", product._id, token);
      setPopupView(false);
      setIsVisible(false);
    } catch (error) {
      console.error("Failed to delete Product:", error);
    }
  };

  return (
    <>
      <div
        ref={productRef}
        className={`transform transition-all duration-500 ease-in-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        } flex flex-col justify-center items-center border border-white rounded-lg bg-white p-2 shadow-lg`}
      >
        <Link to={`/product/${product._id}`}>
          <img
            className="mb-3 rounded-full max-w-[140px] max-h-[140px]"
            src={product.images?.[0] || "/assets/default-image.jpg"}
            alt={product.name || "Default Product"}
          />
        </Link>
        <div dir="rtl" className="w-full text-center">
          <Link to={`/product/${product._id}`}>
            <div className="mb-1">
              {product.name}
              {product.main_category_id && (
                <p className="inline-block border rounded-full text-xs p-1 bg-red-800 text-gray-300 mx-1">
                  {product.main_category_id.name}
                </p>
              )}
            </div>
          </Link>

          <div className="px-1 text-sm">
            <div className="font-bold text-green-700">
              <p>
                {product.discount ? (
                  <>
                    <span className="text-gray-400 line-through mr-2">
                      ${product.price}
                    </span>
                    <span>
                      $
                      {(product.price * (1 - product.discount / 100)).toFixed(
                        2
                      )}
                    </span>
                  </>
                ) : (
                  `$${product.price}`
                )}
              </p>
              <p>
                {product.discount
                  ? (
                      product.price *
                      storedDollarValue *
                      (1 - product.discount / 100)
                    ).toLocaleString("en-US", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    }) + " ل.س"
                  : (product.price * storedDollarValue).toLocaleString(
                      "en-US"
                    ) + " ل.س"}
              </p>
            </div>

            {token && (
              <div className="flex justify-center items-center gap-5 mt-5">
                <MdDelete
                  className="cursor-pointer"
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
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-10"
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
                onClick={() => deleteProduct()}
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
