import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { FaChevronDown, FaChevronUp, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const HeroImageField = ({ inputDetails, endpoint, name }) => {
  const [imagePreviews, setImagePreviews] = useState(inputDetails?.hero || []);
  const [inputKeys, setInputKeys] = useState(
    (inputDetails?.hero || []).map(() => Date.now())
  );
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (inputDetails?.hero) {
      setImagePreviews([...inputDetails.hero]);
      setInputKeys(inputDetails.hero.map(() => Date.now()));
    }
  }, [inputDetails]);

  const handleFileChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreviews((prev) => {
        const updated = [...prev];
        updated[index] = file;
        return updated;
      });
    }
  };

  const clearImage = (index) => {
    setImagePreviews((prev) => {
      const updated = [...prev];
      updated[index] = inputDetails?.hero?.[index] || null;
      return updated;
    });

    setInputKeys((prev) => {
      const updated = [...prev];
      updated[index] = Date.now();
      return updated;
    });
  };

  const deleteImage = async (index) => {
    try {
      await axios.delete(`/settings/${endpoint}/${index}`);
      setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("Failed to delete image.");
    }
  };

  const editImage = async (index) => {
    const updatedFile = imagePreviews[index];
    if (!(updatedFile instanceof File)) {
      alert("Please select a new file to update.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", updatedFile);

      await axios.put(`/settings/${endpoint}/${index}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(`Image ${index + 1} updated successfully.`);
    } catch (error) {
      console.error("Error updating image:", error);
      alert("Failed to update image.");
    }
  };

  return (
    <div className="border border-2 rounded-lg">
      <div
        className="flex items-center justify-between cursor-pointer p-5"
        onClick={() => setVisible(!visible)}
      >
        <p className="text-md text-white font-bold">Hero Images</p>
        {visible ? (
          <FaChevronUp className="text-white" />
        ) : (
          <FaChevronDown className="text-white" />
        )}
      </div>

      {/* Expand/Collapse Animation */}
      <div
        className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${
          visible ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {imagePreviews.length === 0 ? (
          <p className="text-sm text-gray-400 font-bold p-5">
            {name} has no Images!
          </p>
        ) : (
          imagePreviews.map((image, index) => (
            <div key={index} className="px-5 py-3 border-b border-gray-700">
              <div className="flex flex-col space-y-2">
                <label className="text-white">Image {index + 1}</label>
                <input
                  key={inputKeys[index]}
                  type="file"
                  className="border rounded p-2 w-full text-white text-sm \"
                  onChange={(event) => handleFileChange(event, index)}
                />
                <button
                  type="button"
                  onClick={() => clearImage(index)}
                  className="bg-red-500 text-white p-1 rounded text-xs w-20"
                >
                  Clear
                </button>
              </div>

              {image && (
                <div className="flex justify-center items-center mt-3">
                  <img
                    src={
                      typeof image === "string"
                        ? image
                        : URL.createObjectURL(image)
                    }
                    alt={`Preview ${index}`}
                    className="rounded w-[350px] h-[250px] object-contain"
                  />
                </div>
              )}

              <div className="flex space-x-2 mt-3">
                <button
                  type="button"
                  onClick={() => deleteImage(index)}
                  className="flex items-center bg-red-500 text-white p-2 rounded text-sm"
                >
                  <MdDelete className="mr-1" size={18} /> Delete
                </button>
                <button
                  type="button"
                  onClick={() => editImage(index)}
                  className="flex items-center bg-green-500 text-white p-2 rounded text-sm"
                >
                  <FaEdit className="mr-1" size={18} /> Edit
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HeroImageField;
