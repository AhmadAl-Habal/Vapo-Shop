import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductsListing from "./ProductsListing";
import { CiCirclePlus } from "react-icons/ci";
import hero from "../../assets/motion11.jpg";
import axios from "../../api/axios";

const AllProductsSection = () => {
  const [token, setToken] = useState("");
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || "");
  }, []);

  return (
    <section>
      <h2 className="text-xl font-bold bg-red-600 mb-2 text-center py-2 rounded-full">
        جميع المنتجات
      </h2>
      <div className="flex flex-row-reverse justify-end items-center mb-5 px-2 text-xs">
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

export default AllProductsSection;
