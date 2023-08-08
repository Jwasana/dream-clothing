import React, { useState, useEffect } from "react";
import Layout from "../components/Layouts/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CategoryProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [CategoryProduct, setCategoryproducts] = useState([]);
  const [category, setCategory] = useState([]);

  //get products by category function
  const getCategoryproducts = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setCategoryproducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log("Somthing went wrong!");
    }
  };

  useEffect(() => {
    if (params?.slug) getCategoryproducts();
  }, [params?.slug]);
  return (
    <Layout>
      <div className="container mt-3">
        <div className="text-center">
          <h3>Category - {category?.name}</h3>
          <h5>{CategoryProduct?.length} Result</h5>
        </div>
        <div className="row">
          <div className="d-flex flex-wrap">
            {/* // <h3>Products</h3> */}
            {CategoryProduct?.map((product) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/product/product-photo/${product._id}`}
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{product?.name}</h5>
                  <p className="card-text">
                    {product.description.substring(0, 20)}...
                  </p>
                  <p className="card-text"> ${product.price}</p>
                  <button
                    className="btn btn-primary ms-1"
                    onClick={() => {
                      navigate(`/product/${product.slug}`);
                    }}
                  >
                    More Details
                  </button>
                  <button className="btn btn-secondary ms-1">
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
