import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductsListing from "../components/ProductsListing";
import { CiCirclePlus } from "react-icons/ci";
const ProductsSection = () => {
  const [token, setToken] = useState("");
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || "");
  }, []);
  return (
    <section>
      <h2 className="text-xl font-bold text-red-400 mb-2 text-center">
        Browse Products
      </h2>
      <div className="flex justify-between items-center mb-5 px-2 text-xs">
        <select
          className="p-2 rounded-full outline-none cursor-pointer bg-gray-200"
          name=""
          id=""
        >
          <option className="px-5 outline-none" value="test">
            Category
          </option>
        </select>
        {token ? (
          <Link className="" to={"/add-product"}>
            <CiCirclePlus size={30} color="red" className="g-gray-200" />
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
