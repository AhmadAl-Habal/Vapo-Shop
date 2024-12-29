import React, { useEffect, useState } from "react";
import Product from "./Product";
import Spinner from "./Spinner";
import prodcutImg from "../assets/product image.jpeg";
import axios from "../api/axios";
const ProductsListing = ({ isHome = false }) => {
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
  // const recentJobs = isHome ? jobs.slice(0, 3) : jobs;

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [getItemsStatus, setGetItemsStatus] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/item");
        if (response.status == "200") {
          console.log("win", response);
          setGetItemsStatus(response.status);
          setItems(response.data.data);
        } else setGetItemsStatus(response.status);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    console.log("Items updated:", items);
  }, [items]);
  useEffect(() => {
    console.log("Items status:", getItemsStatus);
  }, [getItemsStatus]);
  // const recentJobs = isHome ? serverJobs.slice(0, 3) : serverJobs;

  return (
    <section className=" px-4 py-5">
      <div className="container-xl lg:container m-auto">
        <select className="p-2 rounded-full outline-none mb-5" name="" id="">
          <option className="px-5 outline-none" value="test">
            Category
          </option>
        </select>
        <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">
          Browse Products
        </h2>

        {/* <Job /> */}
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {items.length == 0 ? (
              <p>There are no items to show</p>
            ) : (
              items.map((product, index) => (
                <Product key={index} product={product} />
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsListing;
