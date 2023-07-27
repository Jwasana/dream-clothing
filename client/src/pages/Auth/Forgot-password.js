import React, { useState } from "react";
import Layout from "../../components/Layouts/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  // const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  // const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        newPassword,
        answer,
      });
      //   if (res && res.data.success) {
      //     toast.success(res.data && res.data.message);
      //     navigate("/login");
      //   } else {
      //     toast.error(res.data.error);
      //   }
      // } catch (error) {
      //   console.log(error);
      //   toast.error("Something went wrong!");
      // }
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };
  return (
    <Layout title={"Forgot Password - Dream Clothing"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">RESET PASSWORD</h4>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail"
              placeholder="Enter Your Email"
              required
            />
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="examleInputAnswer"
              placeholder="Enter Your Favourite Sport"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your New Password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Reset Password
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
