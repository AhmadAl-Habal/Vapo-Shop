import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://abomariambackend.vercel.app/",
  timeout: 300000,
  headers: {
    "Content-Type": "application/json",
  },
});
// dev env https://abomariamvapestorebackend.onrender.com
// prod env https://abomariambackend.vercel.app/

export default axiosInstance;

// Category Requests

export const getCategories = async () => {
  try {
    const response = await axiosInstance.get("/category");
    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error("Failed to fetch categories");
    }
  } catch (error) {
    throw error;
  }
};

// General Requests

export const deleteItem = async (endpoint, id, storedToken) => {
  try {
    const response = await axiosInstance.delete(`/${endpoint}/${id}`, {
      headers: {
        auth: storedToken,
      },
    });
    if (response.status === 204) {
      return response.data;
    } else {
      throw new Error("Failed to delete item");
    }
  } catch (error) {
    throw error;
  }
};

// Products Requests

export const getProducts = async () => {
  try {
    const response = await axiosInstance.get(`/item`);

    if (response.status === 200) {
      return response.data.data.items;
    } else {
      throw new Error("Failed to get item");
    }
  } catch (error) {
    throw error;
  }
};

// Social Media Requests

export const addWhatsappProfile = async (data) => {
  try {
    const formData = new FormData();
    formData.append("link", data.link);
    formData.append("phone_number", data.phone_number);
    formData.append("name", data.name);

    const response = await axiosInstance.post(
      "/settings/whatsapp",
      formData
      //    {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // }
    );

    return response.data.data.social_media.whatsapp; // Return only necessary data
  } catch (error) {
    console.error("Error adding profile:", error);
    throw error; // Throw error to handle it in the component
  }
};
