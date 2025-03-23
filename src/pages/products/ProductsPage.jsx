import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link, useParams } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import Product from "../../components/products/Product";
import Spinner from "../../components/Spinner";
import BackButton from "../../components/BackButton";

const ProductsPage = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token") || ""; // Removed unnecessary state
  const [filteredSubCategory, setFilteredSubCategory] = useState("");
  const [allSubCategories, setAllSubCategories] = useState([]);
  const [items, setItems] = useState([]); // Original items from API
  const [discountedItems, setDiscountedItems] = useState([]); // Discounted items
  const [filteredItems, setFilteredItems] = useState([]); // Items after filtering
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryDetails, setCategoryDetails] = useState({});
  const [offersCategory, setOffersCategory] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [categoryRes, subCategoryRes, itemsRes] = await Promise.all([
          axios.get(`/category/${id}`),
          axios.get("/sub_category"),
          axios.get("/item", {
            params: { main_category_id: id, include_hidden: true },
          }),
        ]);

        const categoryData = categoryRes.data.data;
        setCategoryDetails(categoryData);
        setOffersCategory(categoryData.name.includes("عروض"));

        setAllSubCategories(
          subCategoryRes.data.data.filter(
            (subCategory) => subCategory.main_category_id?._id === id
          )
        );

        setItems(itemsRes.data.data.items);
        setFilteredItems(itemsRes.data.data.items);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (!offersCategory) return;

    setLoading(true);
    axios
      .get("/item", { params: { discount: 1 } })
      .then((response) => setDiscountedItems(response.data.data.items))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [offersCategory]);

  const handleFilterChange = (e) => {
    const selectedSubCategory = e.target.value;
    setFilteredSubCategory(selectedSubCategory);
    setFilteredItems(
      selectedSubCategory
        ? items.filter(
            (item) => item.sub_category_id?._id === selectedSubCategory
          )
        : items
    );
  };

  const displayedItems = [
    ...new Map(
      [...filteredItems, ...discountedItems].map((item) => [item._id, item])
    ).values(),
  ];

  return (
    <div className="relative min-h-[100vh]">
      <div className="relative w-[90vw] mx-auto bg-transparent py-7">
        <BackButton />

        {loading ? (
          <Spinner />
        ) : (
          <>
            <div dir="rtl" className="mb-10">
              <p className="text-white text-lg">{categoryDetails?.name}</p>
              <p className="text-gray-500">{categoryDetails?.description}</p>
            </div>

            <div className="flex flex-row-reverse justify-between items-center mb-5 px-2 text-xs">
              {!offersCategory && (
                <select
                  onChange={handleFilterChange}
                  className="border rounded p-2 bg-red-100 text-right"
                  dir="rtl"
                >
                  <option value="">الكل</option>
                  {allSubCategories.map((subCategory) => (
                    <option key={subCategory._id} value={subCategory._id}>
                      {subCategory.name}
                    </option>
                  ))}
                </select>
              )}
              {token && (
                <Link to="/add-product">
                  <CiCirclePlus
                    size={30}
                    color="white"
                    className="g-gray-200"
                  />
                </Link>
              )}
            </div>

            <section className="py-5 font-bold">
              {displayedItems.length > 0 ? (
                <div
                  dir="rtl"
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2"
                >
                  {displayedItems.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <p className="text-lg text-white">لا يوجد عناصر للعرض</p>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
