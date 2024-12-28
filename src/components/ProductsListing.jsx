import React, { useEffect, useState } from "react";
import Product from "./Product";
import Spinner from "./Spinner";
import prodcutImg from "../assets/product image.jpeg";
const ProductsListing = ({ isHome = false }) => {
  const dummyProducts = [
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
    {
      name: "IGET BAR BANANA ICE – 3500 PUFFS",
      price: "44.49$",
      img: prodcutImg,
    },
  ];
  // const recentJobs = isHome ? jobs.slice(0, 3) : jobs;
  const [serverJobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchJobs = async () => {
  //     try {
  //       const res = await fetch(
  //         "https://6742c465b7464b1c2a62a611.mockapi.io/Jobs"
  //       );
  //       const data = await res.json();
  //       setJobs(data);
  //     } catch (error) {
  //       console.log("Error fetching data", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchJobs();
  // }, []);
  // const recentJobs = isHome ? serverJobs.slice(0, 3) : serverJobs;

  return (
    <section className=" px-4 py-5">
      <div className="container-xl lg:container m-auto">
        <select className="p-2 rounded-full outline-none mb-5"  name="" id="">
          <option className="px-5 outline-none" value="test">Category</option>
        </select>
        <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">
          Browse Products
        </h2>

        {/* <Job /> */}
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {dummyProducts.map((product, index) => (
              <Product key={index} product={product} />
            ))}
          </div>
          // <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          //   {recentJobs.map((job, index) => (
          //     <Product key={index} job={job} />
          //   ))}
          // </div>
        )}
      </div>
    </section>
  );
};

export default ProductsListing;
