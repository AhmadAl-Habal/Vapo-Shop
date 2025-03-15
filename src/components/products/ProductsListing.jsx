import React, { useEffect, useState } from "react";
import Product from "./Product";
import Spinner from "../Spinner";
import axios from "../../api/axios";

const ProductsListing = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [getItemsStatus, setGetItemsStatus] = useState();
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/item");
        if (response.status === 200) {
          setGetItemsStatus(response.status);

          setItems(response.data.data.items);
        } else setGetItemsStatus(response.status);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4); // Load 4 more items
  };

  // Filter items based on search term and category
  const filteredItems = Array.isArray(items)
    ? items.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];
  return (
    <section className="px-4 py-5 font-bold">
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <>
          {/* Search Input */}
          <div className="mb-4">
            <input
              dir="rtl"
              type="text"
              placeholder="ابحث عن منتج..."
              className="w-full p-2 border border-gray-300 rounded-full outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Product Listing */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {filteredItems.length === 0 ? (
              <p className="text-white">لا يوجد عناصر مطابقة للبحث</p>
            ) : (
              filteredItems
                .slice(0, visibleCount) // Show only the limited number of items
                .map((product, index) => (
                  <Product key={index} product={product} />
                ))
            )}
          </div>

          {/* Show "Load More" button if there are more items to display */}
          {visibleCount < filteredItems.length && (
            <div className="text-center mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-black"
                onClick={handleLoadMore}
              >
                عرض المزيد
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default ProductsListing;
