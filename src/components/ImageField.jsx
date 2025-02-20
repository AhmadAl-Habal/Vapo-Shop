import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { FaChevronDown, FaChevronUp, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ImageField = ({ inputDetails, endpoint, name }) => {
  const [imagePreviews, setImagePreviews] = useState(
    inputDetails?.images || []
  );
  const [inputKeys, setInputKeys] = useState(
    (inputDetails?.images || []).map(() => Date.now())
  ); // Keys for resetting inputs
  const [visible, setVisible] = useState(false);

  // Sync imagePreviews with inputDetails.images when inputDetails changes
  useEffect(() => {
    if (inputDetails?.images) {
      setImagePreviews([...inputDetails.images]);
      setInputKeys(inputDetails.images.map(() => Date.now())); // Reset keys
    }
  }, [inputDetails]);

  const handleFileChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreviews((prev) => {
        const updated = [...prev];
        updated[index] = file; // Store the file object
        return updated;
      });
    }
  };

  const clearImage = (index) => {
    setImagePreviews((prev) => {
      const updated = [...prev];
      updated[index] = inputDetails?.images?.[index] || null; // Reset to original image or null
      return updated;
    });

    setInputKeys((prev) => {
      const updated = [...prev];
      updated[index] = Date.now(); // Assign a new unique key to force re-render
      return updated;
    });
  };

  const deleteImage = async (index) => {
    try {
      await axios.delete(`/${endpoint}/${inputDetails._id}/${index}`);
      setImagePreviews((prev) => {
        const updated = [...prev];
        updated.splice(index, 1); // Remove the deleted image
        return updated;
      });
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

      await axios.put(`/${endpoint}/${inputDetails._id}/${index}`, formData, {
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

  const setExpand = () => {
    setVisible(!visible);
  };

  if (imagePreviews.length === 0) {
    return (
      <>
        <p className="w-100 text-md text-white font-bold mb-3">
          Current Images
        </p>
        <p className="w-100 text-sm text-gray-400 font-bold">
          This {name} has no Images!
        </p>
      </>
    );
  }

  return (
    <div className="p-5 bg-transparent border-2 border text-white rounded-lg">
      {/* Toggle Button */}
      <div
        onClick={setExpand}
        className="flex justify-between items-center cursor-pointer rounded"
      >
        <h2 className="text-md font-bold">Current Images</h2>
        {visible ? (
          <FaChevronUp className="text-white" />
        ) : (
          <FaChevronDown className="text-white" />
        )}
      </div>

      {/* Expanding Section */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          visible ? "max-h-[100000px] opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        {imagePreviews.map((image, index) => (
          <div key={index} className=" px-3 py-2 mb-5">
            <div className="flex items-center mb-3">
              <label className="text-white w-1/4">Image {index + 1}</label>
              <input
                key={inputKeys[index]}
                type="file"
                className="border rounded p-2 w-3/4 text-white text-sm"
                onChange={(event) => handleFileChange(event, index)}
              />
              <button
                type="button"
                onClick={() => clearImage(index)}
                className="ml-2 bg-red-400 text-black p-1 rounded-full text-xs"
              >
                Clear
              </button>
            </div>

            {image && (
              <div className="flex justify-center items-center my-3">
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
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => deleteImage(index)}
                className="flex bg-red-400 text-black p-1 rounded text-xs items-center"
              >
                Delete
                <MdDelete className="ml-1" size={20} />
              </button>
              <button
                type="button"
                onClick={() => editImage(index)}
                className="flex bg-green-400 text-black p-1 rounded text-xs items-center"
              >
                Edit
                <FaEdit className="ml-1" size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageField;
