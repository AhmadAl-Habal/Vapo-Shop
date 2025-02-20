import React, { useState, useEffect, useRef } from "react";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import { FaEdit } from "react-icons/fa";

const Category = ({ category }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [token, setToken] = useState("");
  const productRef = useRef(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || "");
  }, []);

  const deleteItem = async () => {
    try {
      await axios.delete(`/category/${category._id}`);
      setIsVisible(false);
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const currentElement = productRef.current;
    if (currentElement) observer.observe(currentElement);

    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, []);

  return (
    <div
      ref={productRef}
      className={`w-full  transform transition-all duration-500 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } flex flex-col justify-center items-center border border-1 border-white rounded-lg bg-white p-3 shadow-lg`}
    >
      <Link
        to={`/products/${category._id}`}
        state={{ categoryDetails: category }}
        className="w-full h-full flex flex-col items-center"
      >
        <img
          className="mb-3 rounded-full w-full h-full max-w-[140px] max-h-[140px]"
          src={category.image}
          alt=""
        />
        <p>{category.name}</p>
      </Link>

      {token && (
        <div className="w-full flex space-x-5 justify-center items-center">
          <MdDelete
            className="cursor-pointer"
            color="red"
            onClick={deleteItem}
            size={30}
          />
          <Link
            to={`/edit-category/${category._id}`}
            onClick={(e) => e.stopPropagation()}
          >
            <FaEdit size={30} color="#d0bf4c" className="cursor-pointer" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Category;
