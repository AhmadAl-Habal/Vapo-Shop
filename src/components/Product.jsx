import React, { useState } from "react";
import { FaMapMarker } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "../api/axios";
const Product = ({ product }) => {
  const [showAllDesc, setShowAllDesc] = useState(false);
  // let description = product.description;
  // if (!showAllDesc) {
  //   description = description.substring(0, 80) + "...";
  // }
  console.log(product._id);
  const deleteItem = async () => {
    try {
      const response = await axios.delete(`/item/${product._id}`);
    } catch (error) {}
  };
  return (
    // <div className="bg-white rounded-xl shadow-md relative">
    //   <div className="p-4">
    //     <div className="mb-6">
    //       <div className="text-gray-600 my-2">{product.type}</div>
    //       <h3 className="text-xl font-bold">{product.title}</h3>
    //     </div>

    //     <div className="mb-5">{description}</div>
    //     <button
    //       className="text-red-500 mb-5 hover:text-red-600"
    //       onClick={() => setShowAllDesc((prevState) => !prevState)}
    //     >
    //       {showAllDesc ? "Less" : "More"}
    //     </button>
    //     <h3 className="text-red-500 mb-2">{product.salary}</h3>

    //     <div className="border border-gray-100 mb-5"></div>

    //     <div className="flex flex-col lg:flex-row justify-between mb-4">
    //       <div className="text-orange-700 mb-3">
    //         <FaMapMarker className="inline text-lg mb-1 mr-1" />
    //         {product.location}
    //       </div>
    //       <Link
    //         to={`/products/${product.id}`}
    //         className="h-[36px] bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-center text-sm"
    //       >
    //         Read More
    //       </Link>
    //     </div>
    //   </div>
    // </div>
    <div className="m-4">
      {" "}
      <img className="mb-3 rounded-full" src={product.images[0]} alt="" />
      <div className="flex px-1 text-sm">
        <p className="w-3/4 ">{product.name} </p>
        <p className="w-1/4 font-bold text-green-700">{product.price} $</p>
        <p onClick={deleteItem}>delete item</p>
      </div>
    </div>
  );
};

export default Product;
