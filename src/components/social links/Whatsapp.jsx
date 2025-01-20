import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../../api/axios";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Whatsapp = ({ accounts }) => {
  const [expanded, setExpanded] = useState(false);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    if (accounts.length > 0) {
      setProfiles(accounts);
    }
  }, [accounts]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const toggleExpand = () => setExpanded((prev) => !prev);

  const addProfile = async (data) => {
   

    try {
      const formData = new FormData();
      formData.append("link", data.link);
      formData.append("phone_number", data.phone_number);
      formData.append("name", data.name);

      const response = await axios.post("/settings/whatsapp", formData, {
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
      });

      if (response.status === 201) {
       
        setProfiles(response.data.data.social_media.whatsapp);
        reset();
      }
    } catch (error) {
      console.error("Error adding profile:", error);
    
    }
  };

  const deleteProfile = async (index) => {
    try {
      const response = await axios.delete(`/settings/whatsapp/${index}`);
     
     

      setProfiles((prev) => prev.filter((_, i) => i !== index));
      console.log("Profile deleted successfully!");
    } catch (error) {
      console.error("Error deleting profile:", error);
      console.log("Failed to delete profile.");
    }
  };

  return (
    <div className="p-5 bg-transparent border-2 border text-white rounded-lg">
      <div
        onClick={toggleExpand}
        className="flex justify-between items-center cursor-pointer rounded"
      >
        <h2 className="text-md font-bold">WhatsApp Settings</h2>
        {expanded ? (
          <FaChevronUp className="text-white" />
        ) : (
          <FaChevronDown className="text-white" />
        )}
      </div>

      {expanded && (
        <div className="mt-4">
          <h2 className="text-lg font-bold mb-4">Add New WhatsApp Profile</h2>
          <form onSubmit={handleSubmit(addProfile)} className="space-y-4">
            <div>
              <label className="block mb-1">WhatsApp Link</label>
              <input
                type="text"
                {...register("link", { required: "Link is required" })}
                className={`border rounded p-2 text-black w-full bg-red-100 ${
                  errors.link ? "border-red-500" : "border-gray-500"
                }`}
              />
              {errors.link && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.link.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1">Phone Number</label>
              <input
                type="number"
                {...register("phone_number", {
                  required: "Phone number is required",
                  valueAsNumber: true,
                })}
                className={`border rounded p-2 text-black w-full bg-red-100 ${
                  errors.phone_number ? "border-red-500" : "border-gray-500"
                }`}
              />
              {errors.phone_number && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone_number.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1">Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className={`border rounded p-2 text-black w-full bg-red-100 ${
                  errors.name ? "border-red-500" : "border-gray-500"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded"
            >
              Add Profile
            </button>
          </form>

          <div className="mt-6">
            <h3 className="text-lg font-bold mb-3">WhatsApp Profiles</h3>
            {profiles.length === 0 ? (
              <p className="text-gray-400">No profiles added yet.</p>
            ) : (
              <ul className="space-y-2">
                {profiles.map((account, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-black bg-opacity-40 p-3 rounded"
                  >
                    <div>
                      <p className="font-bold">{account.name}</p>
                      <p className="text-sm">{account.link}</p>
                      <p className="text-sm">{account.phone_number}</p>
                    </div>
                    <button
                      onClick={() => deleteProfile(index)}
                      className="bg-red-600 text-white py-1 px-3 rounded"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Whatsapp;
