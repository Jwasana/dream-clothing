import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  //get categories
  const getcategories = async () => {
    try {
      const { data: categoryData } = await axios.get(
        "/api/v1/category/get-category"
      );
      setCategories(categoryData?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getcategories();
  }, []);

  return categories;
}
