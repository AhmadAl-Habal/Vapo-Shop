import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link, useLocation, useParams } from "react-router-dom";
import hero from "../../assets/bg.webp";
import { CiCirclePlus } from "react-icons/ci";
import Product from "../../components/products/Product";
import Spinner from "../../components/Spinner";
import BackButton from "../../components/BackButton";

const ProductsPage = () => {
  const { id } = useParams();
  const [token, setToken] = useState("");
  const [filteredSubCategory, setFilteredSubCategory] = useState("");
  const [allSubCategories, setAllSubCategories] = useState([]);
  const [items, setItems] = useState([]); // Original items from API
  const [discountedItems, setDiscountedItems] = useState([]); // Original items from API
  const [filteredItems, setFilteredItems] = useState([]); // Items after filtering
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const { categoryDetails } = location.state || {};
  const [offersCategory, setOffersCategory] = useState(
    categoryDetails.name.includes("عروض") ? true : false
  );
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || "");
    setLoading(true);

    const fetchData = async () => {
      try {
        // Fetch Subcategories
        const response = await axios.get("/sub_category");
        const filteredSubCategories = response.data.data.filter(
          (subCategory) =>
            subCategory.main_category_id &&
            subCategory.main_category_id._id === id
        );
        setAllSubCategories(filteredSubCategories);

        // Fetch Items
        const response2 = await axios.get("/item", {
          params: { main_category_id: id },
        });

        setItems(response2.data.data.items);
        setFilteredItems(response2.data.data.items);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryDetails]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || "");

    if (offersCategory) {
      setLoading(true);

      const fetchData = async () => {
        try {
          // Fetch Items
          const response = await axios.get("/item", {
            params: { discount: 1 },
          });

          setDiscountedItems(response.data.data.items);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
          console.log(discountedItems);
        }
      };

      fetchData();
      console.log("test");
    }
  }, [categoryDetails]);

  // Function to handle filtering
  const handleFilterChange = (e) => {
    const selectedSubCategory = e.target.value;
    setFilteredSubCategory(selectedSubCategory);

    if (selectedSubCategory) {
      setFilteredItems(
        items.filter(
          (item) =>
            item.sub_category_id &&
            item.sub_category_id._id === selectedSubCategory
        )
      );
    } else {
      setFilteredItems(items); // Reset to all items if no subcategory is selected
    }
  };

  return (
    <div className={"relative min-h-[100vh]"}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${hero})`, opacity: 0.7 }}
      ></div>

      <div className="absolute inset-0 bg-black bg-opacity-80"></div>
      <div className="relative w-[80vw] mx-auto bg-transparent py-10">
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
                <Link to={"/add-product"}>
                  <CiCirclePlus
                    size={30}
                    color="white"
                    className="g-gray-200"
                  />
                </Link>
              )}
            </div>
            <section className=" py-5 font-bold">
              {loading ? (
                <Spinner />
              ) : (
                <div
                  dir="rtl"
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2"
                >
                  {filteredItems.length > 0 || discountedItems.length > 0 ? (
                    <>
                      {filteredItems.map((product, index) => (
                        <Product key={`filtered-${index}`} product={product} />
                      ))}
                      {discountedItems.map((product, index) => (
                        <Product
                          key={`discounted-${index}`}
                          product={product}
                        />
                      ))}
                    </>
                  ) : (
                    <p className="text-lg text-white">
                      There are no items to show
                    </p>
                  )}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
