import slugify from "slugify";
import formidable from "express-formidable";
import fs from "fs";
import productModel from "../models/productModel.js";

//create product controller
export const createProductController = async (req, res) => {
  try {
    const { name, description, slug, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is reqired" });

      case !description:
        return res.status(500).send({ error: "Description is required" });

      case !price:
        return res.status(500).send({ error: "Price is required" });

      case !category:
        return res.status(500).send({ error: "Category is required" });

      case !quantity:
        return res.status(500).send({ error: "Quantity is requiered" });

      case photo && photo.size > 1000000:
        return res.status(500).send({
          error: "Photo is required and size should be less than 1MB",
        });
    }
    //const { name, price, description, quantity, category } = req.body;
    const products = new productModel({
      ...req.fields,
      slug: slugify(name),
    });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Successfuly created product",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while creating product",
      error,
    });
  }
};

//update product
export const updateProductController = async (req, res) => {
  try {
    const { name, description, slug, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is reqired" });

      case !description:
        return res.status(500).send({ error: "Description is required" });

      case !price:
        return res.status(500).send({ error: "Price is required" });

      case !category:
        return res.status(500).send({ error: "Category is required" });

      case !quantity:
        return res.status(500).send({ error: "Quantity is requiered" });

      case photo && photo.size > 1000000:
        return res.status(500).send({
          error: "Photo is required and size should be less than 1MB",
        });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.id,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Successfuly updated product",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error while updating product",
      error: error.message,
    });
  }
};

//get all product controller
export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      total: products.length,
      message: "Display all products successfuly",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while displaying all products",
      error: error.message,
    });
  }
};

//get single product controller
export const getSingleProductController = async (req, res) => {
  try {
    const singleProduct = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Display single products",
      singleProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error ehile getting single product",
      error: error.message,
    });
  }
};

//get product photo
export const getProductPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");

    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting product photo",
      error: error.message,
    });
  }
};

//delete product
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.id).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product delete successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting a product",
      error: error.message,
    });
  }
};

//product filter controller
export const filterProductsController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const filteredProducts = await productModel.find(args);

    res.status(200).send({
      success: true,
      message: "Filter product",
      length: filteredProducts.length,
      filteredProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while filtering product",
      error: error.message,
    });
  }
};

//product count controller
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      message: "Total product",
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in product count",
      error: error.message,
    });
  }
};

//Product list base on page
export const productListController = async (req, res) => {
  try {
    const perPage = 2;
    const page = req.params.page ? req.params.page : 1;
    const { sort, order } = req.body;
    //const currentPage = page || 1;

    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "Product list",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in product per page list",
      error: error.message,
    });
  }
};
