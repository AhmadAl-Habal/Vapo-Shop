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

export const getCategoryById = async (id) => {
  try {
    const response = await axiosInstance.get(`/category/${id}`);
    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error("Failed to fetch category");
    }
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error;
  }
};

export const updateCategory = async (id, data, token) => {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.description) formData.append("description", data.description);
    if (data.image?.[0]) formData.append("image", data.image[0]);

    const response = await axiosInstance.put(`/category/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        auth: token,
      },
    });

    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error("Failed to update category.");
    }
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

// SubCategory Requests

export const getSubCategories = async () => {
  try {
    const response = await axiosInstance.get("/sub_category");
    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error("Failed to fetch subcategories.");
    }
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    throw error;
  }
};

export const addCategory = async (data, token) => {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.description) formData.append("description", data.description);
    if (data.image?.[0]) formData.append("image", data.image[0]);

    const response = await axiosInstance.post("/category", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        auth: token,
      },
    });

    if (response.status === 201) {
      return response.data.data;
    } else {
      throw new Error("Failed to create the Category.");
    }
  } catch (error) {
    console.error(
      "Error creating Category:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// General Requests

export const deleteItem = async (endpoint, id, token) => {
  try {
    const response = await axiosInstance.delete(`/${endpoint}/${id}`, {
      headers: {
        auth: token,
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

    return response.data.data.social_media.whatsapp;
  } catch (error) {
    console.error("Error adding profile:", error);
    throw error;
  }
};

// FAQ Requests

export const getFAQs = async () => {
  try {
    const response = await axiosInstance.get("/faq");

    if (response.status === 200) {
      return response.data.data; // Return the FAQ list
    } else {
      throw new Error("Failed to fetch FAQs.");
    }
  } catch (error) {
    console.error("Error fetching FAQs:", error.message);
    throw error;
  }
};

export const getFAQById = async (id) => {
  try {
    const response = await axiosInstance.get(`/faq/${id}`);

    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error("Failed to fetch FAQ.");
    }
  } catch (error) {
    console.error("Error fetching FAQ:", error.message);
    throw error;
  }
};

export const addFAQ = async (data, token) => {
  try {
    const formData = new FormData();
    formData.append("question", data.question);
    formData.append("answer", data.answer);

    if (data.image?.length > 0) {
      Array.from(data.image).forEach((file) => formData.append("image", file));
    }

    const response = await axiosInstance.post("/faq", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        auth: token,
      },
    });

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error("Failed to create the FAQ.");
    }
  } catch (error) {
    console.error("Error creating FAQ:", error.message);
    throw error;
  }
};

export const updateFAQ = async (id, data, token) => {
  try {
    const formData = new FormData();
    formData.append("question", data.question);
    formData.append("answer", data.answer);

    const response = await axiosInstance.put(`/faq/${id}`, formData, {
      headers: {
        auth: token,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to update FAQ.");
    }
  } catch (error) {
    console.error("Error updating FAQ:", error.response?.data || error.message);
    throw error;
  }
};
