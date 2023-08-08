import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layouts/Layout";

const Categaories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
      <div className="container">
        <div className="row">
          {categories?.map((category) => (
            <div className="col-md-6 mt-3 mb-5 gx-3 gy-3" key={category._id}>
              <Link
                to={`/category/${category.slug}`}
                className="btn btn-primary"
              >
                {category?.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categaories;
