import express from "express";
import { isAdmin, requireSignin } from "../midlewares/authMiddleware.js";
import {
  categoryController,
  createCategoryController,
  deleteCategoryController,
  singleCateoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

//routes
//create category
router.post(
  "/create-category",
  requireSignin,
  isAdmin,
  createCategoryController,
  (req, res) => {
    res.status(200).send({
      ok: true,
    });
  }
);

//update category
router.put(
  "/update-category/:id",
  requireSignin,
  isAdmin,
  updateCategoryController
);

//get all categories
router.get("/get-category", categoryController);

//get single category
router.get("/single-category/:slug", singleCateoryController);

//delete single category
router.delete(
  "/delete-category/:id",
  requireSignin,
  isAdmin,
  deleteCategoryController
);

export default router;
