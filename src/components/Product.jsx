import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "../api/axios";
const Product = ({ product }) => {
  const [showAllDesc, setShowAllDesc] = useState(false);
  const [token, setToken] = useState("");
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || "");
  }, []);
  console.log(product._id);
  const deleteItem = async () => {
    try {
      const response = await axios.delete(`/item/${product._id}`);
    } catch (error) {}
    window.location.reload();
  };
  return (
    <div className="m-4">
      <img className="mb-3 rounded-full" src={product.images[0]} alt="" />
      <div dir="rtl">
        <p className="w-full text-center">{product.name} </p>
        <div className="flex px-1 text-sm justify-around">
          <p className="font-bold text-green-700">{product.price}$</p>

          {token && (
            <MdDelete
              className="cursor-pointer"
              color="red"
              onClick={deleteItem}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
