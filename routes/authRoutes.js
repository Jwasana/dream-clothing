import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersContrller,
  getAllOrdersController,
  orderStatusController,
} from "../controllers/authController.js";
import { isAdmin, requireSignin } from "../midlewares/authMiddleware.js";

//route object
const router = express.Router();

//routing
// Register
router.post("/register", registerController);

//login
router.post("/login", loginController);

//forgot-password || POST
router.post("/forgot-password", forgotPasswordController);

//test routes
router.get("/test", requireSignin, isAdmin, testController);

// protected user route auth
router.get("/user-auth", requireSignin, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});

// protected admin route auth
router.get("/admin-auth", requireSignin, isAdmin, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});

//update user route
router.put("/profile", requireSignin, updateProfileController);

//orders
router.get("/orders", requireSignin, getOrdersContrller);

//get all orders
router.get("/all-orders", requireSignin, isAdmin, getAllOrdersController);

//order status update
router.put(
  "/order-status/:orderId",
  requireSignin,
  isAdmin,
  orderStatusController
);

export default router;
