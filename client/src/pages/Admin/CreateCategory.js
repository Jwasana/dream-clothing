import React, { useEffect, useState } from "react";
import Layout from "../../components/Layouts/Layout";
import AdminMenu from "../../components/Layouts/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Forms/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCtaegories] = useState([]);
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  //handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategories();
        setName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  //get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      console.log(111, data);
      if (data?.success) {
        setCtaegories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  //handle update category
  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        {
          name: updatedName,
        }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setIsModalOpen(false);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in update category");
    }
  };

  //handle delete category
  const handleDeleteCategory = async (id) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${id}`
      );

      if (data?.success) {
        toast.success("Successfully is deleted!");
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in delete category");
    }
  };

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((category) => (
                    <>
                      <tr>
                        <td key={category._id}>{category.name}</td>
                        <td>
                          <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              setIsModalOpen(true);
                              setSelected(category);
                              setUpdatedName(category.name);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDeleteCategory(category._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setIsModalOpen(false)}
              footer={null}
              visible={isModalOpen}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdateCategory}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
