import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "../api/axios";

const FAQ = ({ question, answer, images, id }) => {
  const [mainImage, setMainImage] = useState(images[0]);
  const [visible, setVisible] = useState(false);
  const [token, setToken] = useState("");
  const [exist, setExist] = useState(true);
  const deleteItem = async () => {
    try {
      const response = await axios.delete(`/faq/${id}`);
      setExist(false);
    } catch (error) {}
  };
  const setExpand = () => {
    setVisible(!visible);
  };
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || "");
  }, []);
  return (
    <div
      dir="rtl"
      className={
        exist
          ? "w-100 my-5 bg-black bg-opacity-40 border border-2 rounded-lg p-5"
          : "hidden w-100 my-5 bg-black bg-opacity-40 border border-2 rounded-lg p-5"
      }
    >
      <div
        className={`flex items-center justify-between cursor-pointer ${visible && "mb-10"}`}
        onClick={setExpand}
      >
        <p className="w-100 text-2xl text-red-400 font-bold">{question}</p>
        <div className="flex flex-row-reverse">
          {visible ? (
            <FaChevronUp className="text-gray-500 " />
          ) : (
            <FaChevronDown className="text-gray-500" />
          )}
          {token && (
            <div className="flex justify-around items-center mx-2">
              <MdDelete
                className="cursor-pointer ml-1"
                color="red"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteItem();
                }}
                size={15}
              />

              <Link to={`/edit-faq/${id}`}>
                <FaEdit size={15} color="#d0bf4c" className="cursor-pointer" />
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className={`${visible ? "block" : "hidden"}`}>
        <p className="w-full whitespace-pre-wrap text-white text-md font-bold">
          {answer}
        </p>

        {images?.length > 0 && (
          <div className="w-full">
            <div className="w-full flex justify-center items-center mb-5">
              <img
                src={mainImage}
                alt="Main Product"
                className="rounded w-[350px] h-[350px] object-contain"
              />
            </div>

            {images?.length > 1 && (
              <div className="flex w-full justify-center items-center mb-5">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Product Image ${index + 1}`}
                    className="rounded-full w-10 h-10 mx-1 cursor-pointer object-cover"
                    onClick={() => setMainImage(image)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQ;
