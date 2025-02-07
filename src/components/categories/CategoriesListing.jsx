import React, { useEffect, useState } from "react";
import Spinner from "../Spinner";
import axios from "../../api/axios";
import Category from "./Category";

const CategoriesListing = ({}) => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/category");
        if (response.status == "200") {
          setCategories(response.data.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      
      }
    };
    fetchData();
  }, []);

  return (
    <section className="px-4 py-5 font-bold">
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {categories.length === 0 ? (
            <p>There are no Categories to show</p>
          ) : (
            categories.map((category, index) => (
              <Category key={index} category={category} />
            ))
          )}
        </div>
      )}
    </section>
  );
};

export default CategoriesListing;
