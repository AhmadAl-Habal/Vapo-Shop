import React, { useEffect, useState } from "react";
import Product from "./Product";
import Spinner from "./Spinner";
import prodcutImg from "../assets/product image.jpeg";
import axios from "../api/axios";
const ProductsListing = ({}) => {
  const dummyProducts = [
    {
      name: "ايكس روس مع حراق خارق",
      price: "44.49$",
      img: prodcutImg,
    },
    {
      name: "IGET BAR BANANA ICE – 3500 PUFFS",
      price: "44.49$",
      img: prodcutImg,
    },
    {
      name: "IGET BAR BANANA ICE – 3500 PUFFS",
      price: "44.49$",
      img: prodcutImg,
    },
    {
      name: "IGET BAR BANANA ICE – 3500 PUFFS",
      price: "44.49$",
      img: prodcutImg,
    },
    {
      name: "IGET BAR BANANA ICE – 3500 PUFFS",
      price: "44.49$",
      img: prodcutImg,
    },
    {
      name: "IGET BAR BANANA ICE – 3500 PUFFS",
      price: "44.49$",
      img: prodcutImg,
    },
    {
      name: "IGET BAR BANANA ICE – 3500 PUFFS",
      price: "44.49$",
      img: prodcutImg,
    },
    {
      name: "IGET BAR BANANA ICE – 3500 PUFFS",
      price: "44.49$",
      img: prodcutImg,
    },
    {
      name: "IGET BAR BANANA ICE – 3500 PUFFS",
      price: "44.49$",
      img: prodcutImg,
    },
    {
      name: "IGET BAR BANANA ICE – 3500 PUFFS",
      price: "44.49$",
      img: prodcutImg,
    },
    {
      name: "IGET BAR BANANA ICE – 3500 PUFFS",
      price: "44.49$",
      img: prodcutImg,
    },
    {
      name: "IGET BAR BANANA ICE – 3500 PUFFS",
      price: "44.49$",
      img: prodcutImg,
    },
    {
      name: "IGET BAR BANANA ICE – 3500 PUFFS",
      price: "44.49$",
      img: prodcutImg,
    },
    {
      name: "IGET BAR BANANA ICE – 3500 PUFFS",
      price: "44.49$",
      img: prodcutImg,
    },
    {
      name: "IGET BAR BANANA ICE – 3500 PUFFS",
      price: "44.49$",
      img: prodcutImg,
    },
    {
      name: "IGET BAR BANANA ICE – 3500 PUFFS",
      price: "44.49$",
      img: prodcutImg,
    },
  ];
  // console.log(filteredCategory);

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
          // console.log("win", response);
          // console.log(response.data);
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
  // useEffect(() => {
  //   console.log("Items updated:", items[0]);
  // }, [items]);
  // useEffect(() => {
  //   console.log("Items status:", getItemsStatus);
  // }, [getItemsStatus]);

  return (
    <section className="px-4 py-5 font-bold">
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {/* <p
            onClick={() => {
              console.log(items.data.items[0].main_category_id._id);
            }}
          >
            test
          </p> */}
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
                <Product
                  key={index}
                  product={product}
                  category={product.main_category_id}
                />
              ))
          )}
          {/* {items.length === 0 ? (
            <p>There are no items to show</p>
          ) : (
            items.data.items
              .filter(
                (product) =>
                  filteredCategory === "" ||
                  product.main_category_id._id === filteredCategory
              )
              .map((product, index) => (
                <Product
                  key={index}
                  product={product}
                  category={product.main_category_id}
                />
              ))
          )} */}
        </div>
      )}
    </section>
  );
};

export default ProductsListing;
