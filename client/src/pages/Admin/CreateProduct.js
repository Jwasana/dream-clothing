import React, { useState, useEffect } from "react";
import Layout from "../../components/Layouts/Layout";
import AdminMenu from "../../components/Layouts/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [desciption, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");

  //get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");

      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <Layout title={"Dashboard - Create Prouct"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
