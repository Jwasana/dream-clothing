import React, { useState, useEffect } from "react";
import Layout from "../components/Layouts/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { prices } from "../components/Prices";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const HomePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]); //categories
  const [radio, setRadio] = useState([]); //price
  const [total, setTotal] = useState(0); //total products
  const [page, setPage] = useState(1); //page number
  const [loading, setLoading] = useState(false); //loading
  const [cart, setCart] = useCart();

  //get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data: productsData } = await axios.get(
        `/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(productsData.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //get total count of products
  const getTotalProducts = async () => {
    try {
      const { data: totalData } = await axios.get(
        "/api/v1/product/product-count"
      );
      setTotal(totalData?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //load more function
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data: productsData } = await axios.get(
        `/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...productsData?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //filter products by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
    console.log(all);
  };

  //get all categories
  const getAllCategories = async () => {
    try {
      const { data: categoryData } = await axios.get(
        "/api/v1/category/get-category"
      );
      setCategories(categoryData?.category);
    } catch (error) {
      console.log(error);
    }
  };

  //get filtered products
  const filteredProducts = async () => {
    try {
      const { data: productsData } = await axios.post(
        "/api/v1/product/products-filter",
        { checked, radio }
      );
      setProducts(productsData?.filteredProducts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
    getTotalProducts();
  }, []);

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filteredProducts();
  }, [checked, radio]);

  return (
    <Layout title="All Products - Best Offers">
      <div className="row mt-3">
        <div className="col-md-2">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((category) => (
              <Checkbox
                key={category._id}
                onChange={(e) => handleFilter(e.target.checked, category._id)}
              >
                {category.name}
              </Checkbox>
            ))}
          </div>
          {/* //price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {prices.map((price) => (
                <div key={price._id}>
                  <Radio value={price.array}>{price.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          {/* Reset button */}
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger mt-4"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {/* // <h3>Products</h3> */}
            {products?.map((product) => (
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
                  <button
                    className="btn btn-primary ms-1"
                    onClick={() => {
                      navigate(`/product/${product.slug}`);
                    }}
                  >
                    More Details
                  </button>
                  <button
                    className="btn btn-secondary ms-1"
                    onClick={() => {
                      setCart([...cart, product]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, product])
                      );
                      toast.success("Item add to cart successfully!");
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
