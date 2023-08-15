import React, { useState, useEffect } from "react";
import Layout from "../../components/Layouts/Layout";
import UserMenu from "../../components/Layouts/UserMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      //console.log(222, data);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  // setOrders("1");
  console.log(111, orders);
  return (
    <Layout title={"Your Orders"}>
      <div className="container-flui p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders?.map((order, i) => {
              return (
                <div className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <td scope="col">#</td>
                        <td scope="col">Status</td>
                        <td scope="col">Buyer</td>
                        <td scope="col">Date</td>
                        <td scope="col">Payment</td>
                        <td scope="col">Quantity</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>{i + 1}</th>
                        <th>{order?.status}</th>
                        <th>{order?.buyer?.name}</th>
                        <th>{moment(order?.createAt)?.fromNow()}</th>
                        <th>{order?.payment.success ? "Success" : "Failed"}</th>
                        <th>{order?.products?.length}</th>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {order?.products?.map((item) => (
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
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
