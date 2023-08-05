import React, { useState, useEffect } from "react";
import Layout from "../components/Layouts/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //get product
  const getProduct = async () => {
    try {
      const { data: productData } = await axios.get(
        `/api/v1/product/single-product/${params.slug}`
      );
      setProduct(productData?.singleProduct);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product?.name}
            height="300"
            width="250"
          />
        </div>
        <div className="col-md-6 mt-5">
          <h1 className="text-center">Product Details</h1>
          <h4>Name : {product?.name}</h4>
          <h4>Description : {product.description}</h4>
          <h4>Category : {product?.category?.name}</h4>
          <h4>Price : ${product.price}</h4>
          <button className="btn btn-secondary ms-1">ADD TO CART</button>
        </div>
      </div>
      <div className="row">silmilar products</div>
    </Layout>
  );
};

export default ProductDetails;
