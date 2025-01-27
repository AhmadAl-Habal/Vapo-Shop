import React, { useEffect, useState } from "react";
import Product from "./Product";
import Spinner from "../Spinner";
import axios from "../../api/axios";

const ProductsListing = ({}) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [getItemsStatus, setGetItemsStatus] = useState();
  const filteredCategory = sessionStorage.getItem("selectedCategory");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/item");
        if (response.status == "200") {
          setGetItemsStatus(response.status);
          setItems(response.data);
        } else setGetItemsStatus(response.status);
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
          {items.length === 0 ? (
            <p>There are no items to show</p>
          ) : (
            items.data.items
              .filter(
                (product) =>
                  filteredCategory === "" ||
                  (product.main_category_id &&
                    product.main_category_id._id === filteredCategory)
              )
              .map((product, index) => (
                <Product key={index} product={product} />
              ))
          )}
        </div>
      )}
    </section>
  );
};

export default ProductsListing;
