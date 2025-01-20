import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductsListing from "../components/ProductsListing";
import { CiCirclePlus } from "react-icons/ci";
import hero from "../assets/bg.webp";
import axios from "../api/axios";
const ProductsSection = () => {
  const filteredCategory = sessionStorage.getItem("selectedCategory");
  const [token, setToken] = useState("");
  const [filterCategory, setFilteredCategory] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [allCategories, setAllCategories] = useState([]);

  const [categoryName, setCategoryName] = useState("");
  sessionStorage.setItem("selectedCategory", filterCategory);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    setToken(storedToken || "");
  }, []);

  useEffect(() => {
    setLoadingCategories(true);
    const fetchData = async () => {
      try {
        const response = await axios.get("/category");
        if (response.status == "200") {
          setAllCategories(response.data.data);
        } else setAllCategories(response.status);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchData();
  }, []);
  return (
    <section
      className="bg-cover bg-black bg-opacity-80 pt-4"
      //   style={{ backgroundImage: `url(${hero})`, opacity: 0.9 }}
    >
      <h2 className="text-xl font-bold text-red-500 mb-2 text-center">
        Browse Products dev 
      </h2>
      <div className="flex flex-row-reverse justify-between items-center mb-5 px-2 text-xs">
        {/* <select
          className="p-2 rounded-full outline-none cursor-pointer bg-gray-200"
          name=""
          id=""
          dir="rtl"
        >
          <option className="px-5 outline-none" value="test">
            الكل
          </option>
        </select> */}
        <select
          onChange={(e) => setFilteredCategory(e.target.value)}
          className="border rounded p-2 bg-red-100 text-right"
          dir="rtl"
        >
          <option className="" value="">
            الكل
          </option>
          {allCategories.map((category) => (
            <option
              className="inline-block flex justify-between"
              key={category._id}
              value={category._id}
            >
              {category.name}
            </option>
          ))}
        </select>
        {token ? (
          <Link className="" to={"/add-product"}>
            <CiCirclePlus size={30} color="white" className="g-gray-200" />
          </Link>
        ) : (
          ""
        )}
      </div>

      <ProductsListing filteredCategory={filterCategory} />
    </section>
  );
};

export default ProductsSection;
