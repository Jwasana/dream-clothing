import React from "react";
import Layout from "../components/Layouts/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  //calculate total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => (total = total + item?.price));
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //remove cart item
  const removeCartItem = (itemId) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === itemId);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">{`Hello ${
              auth?.token && auth?.user?.name
            }`}</h1>
            <h3 className="text-center">
              {cart?.length > 0
                ? `You have ${cart.length} items in your cart ${
                    auth?.token ? "" : "Please login to checkout"
                  }`
                : "Your cart is empty"}
            </h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart.map((item) => (
              <div className="row mb-2 p-3 card flex-row">
                <div className="col-md-4">
                  <img
                    src={`/api/v1/product/product-photo/${item._id}`}
                    className="card-img-top"
                    alt={item?.name}
                    width={"100px"}
                    height={"200px"}
                  />
                </div>
                <div className="col-md-8">
                  <p> {item?.name}</p>
                  <p>{item?.description.substring(0, 30)}</p>
                  <p>Price: ${item?.price}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4> Total : {totalPrice()}</h4>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
