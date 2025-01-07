import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import { FaEdit } from "react-icons/fa";
const Product = ({ product, category }) => {
  const [visible, setVisible] = useState(true);
  const [showAllDesc, setShowAllDesc] = useState(false);
  const [token, setToken] = useState("");
 
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || "");
  }, []);

  const deleteItem = async () => {
    try {
      const response = await axios.delete(`/item/${product._id}`);
      setVisible(false);
    } catch (error) {}
  };
  return (
    <div
      className={
        visible
          ? "flex flex-col justify-center items-center border border-1 border-white rounded-lg bg-white p-2 shadow-lg"
          : "hidden flex-col justify-center items-center border border-1 border-white rounded-lg bg-white p-2 shadow-lg"
      }
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

        <div className="w-full flex px-1 text-sm justify-around items-center">
          <p className="font-bold text-green-700">{product.price}$</p>

          {token && (
            <div className="flex justify-around items-center">
              <MdDelete
                className="cursor-pointer ml-1"
                color="red"
                onClick={deleteItem}
                size={15}
              />
              <Link to={`/edit-product/${product._id}`}>
                <FaEdit size={15} color="#d0bf4c" className="cursor-pointer" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
