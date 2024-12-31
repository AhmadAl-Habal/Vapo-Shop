import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductsListing from "../components/ProductsListing";
import { CiCirclePlus } from "react-icons/ci";
import hero from "../assets/bg.webp";
const ProductsSection = () => {
  const [token, setToken] = useState("");
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || "");
  }, []);
  return (
    <section
      className="bg-cover bg-black bg-opacity-50 pt-4"
      //   style={{ backgroundImage: `url(${hero})`, opacity: 0.9 }}
    >
      <h2 className="text-xl font-bold text-red-500 mb-2 text-center">
        Browse Products
      </h2>
      <div className="flex flex-row-reverse justify-between items-center mb-5 px-2 text-xs">
        <select
          className="p-2 rounded-full outline-none cursor-pointer bg-gray-200"
          name=""
          id=""
          dir="rtl"
        >
          <option className="px-5 outline-none" value="test">
            الكل
          </option>
        </select>
        {token ? (
          <Link className="" to={"/add-product"}>
            <CiCirclePlus size={30} color="white" className="g-gray-200" />
          </Link>
        ) : (
          ""
        )}
      </div>

      <ProductsListing />
    </section>
  );
};

export default ProductsSection;
