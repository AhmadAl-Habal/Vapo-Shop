import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../api/axios";
import Spinner from "../components/Spinner";
const ProductPage = () => {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(`/item/${id}`);
        console.log(response);
        if (response.status == "200") {
          setProductDetails(response.data.data);
          console.log(productDetails.images);
        } else setProductDetails(response.status);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <p className="border border-2 py-1 px-2 rounded-full inline-block text-sm">
        <Link className="mr-5 text-black" to={"/"}>
          Return to Products page
        </Link>
      </p>
      {loading ? (
        <Spinner></Spinner>
      ) : productDetails && productDetails.images ? (
        productDetails.images.map((image, index) => (
          <img key={index} src={image} alt={`Product Image ${index + 1}`} />
        ))
      ) : (
        <p>No images available.</p>
      )}
      {loading ? (
        <Spinner></Spinner>
      ) : (
        productDetails && (
          <div>
            <p> {productDetails.name}</p>
            <p> {productDetails.description}</p>
            <p> {productDetails.price}</p>
            <p>
              {productDetails.main_category_id &&
                productDetails.main_category_id.name}
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default ProductPage;
