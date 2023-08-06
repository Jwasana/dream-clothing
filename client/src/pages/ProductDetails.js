import React, { useState, useEffect } from "react";
import Layout from "../components/Layouts/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  useEffect(() => {
    if (params?.slug) getProduct();
    // eslint-disable-next-line
  }, [params?.slug]);
  //get product
  const getProduct = async () => {
    try {
      const { data: productData } = await axios.get(
        `/api/v1/product/single-product/${params.slug}`
      );
      setProduct(productData?.singleProduct);
      getSimilarProducts(
        productData?.singleProduct?._id,
        productData?.singleProduct?.category?._id
      );
    } catch (error) {
      console.log(error);
    }
  };

  //get similar products
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setSimilarProducts(data?.products);
      console.log(222, similarProducts);
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
            width="200"
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
      <hr />
      <div className="row container">
        {similarProducts?.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}

        <h3>Similar Products</h3>
        {/* {JSON.stringify(similarProducts, null, 4)} */}
        <div className="d-flex flex-wrap">
          {similarProducts?.map((product) => (
            <div className="card m-2" style={{ width: "18rem" }}>
              <img
                src={`/api/v1/product/product-photo/${product._id}`}
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">
                  {product.description.substring(0, 20)}...
                </p>
                <p className="card-text"> ${product.price}</p>

                <button className="btn btn-secondary ms-1">ADD TO CART</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
