import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import { FaEdit } from "react-icons/fa";
const Product = ({ product, category }) => {
  const [showAllDesc, setShowAllDesc] = useState(false);
  const [token, setToken] = useState("");
  console.log(product);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || "");
  }, []);

  const deleteItem = async () => {
    try {
      const response = await axios.delete(`/item/${product._id}`);
    } catch (error) {}
    window.location.reload();
  };
  return (
    <div className="m-4 flex flex-col justify-center items-center">
      <img
        className="mb-3 rounded-full w-full h-full max-w-[140px] max-h-[140px]"
        src={product.images[0]}
        alt=""
      />
      <div dir="rtl" className="w-full">
        <p className="w-full text-center">{product.name} </p>
        {product.main_category_id && <p>{product.main_category_id.name}</p>}
        <div className="w-full flex px-1 text-sm justify-around items-center">
          <p className="font-bold text-green-700">{product.price}$</p>

          {token && (
            <div className="flex justify-around items-center">
              <MdDelete
                className="cursor-pointer"
                color="red"
                onClick={deleteItem}
              />
              <Link to={`/edit-product/${product._id}`}>
                <FaEdit color="yellow" className="cursor-pointer" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
