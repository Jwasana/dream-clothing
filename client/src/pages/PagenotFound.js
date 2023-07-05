import React from "react";
import Layout from "../components/Layouts/Layout";
import { Link } from "react-router-dom";

const PagenotFound = () => {
  return (
    <Layout>
      <div className="pnf">
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-heading">Ooops! Page Not Found</h2>
        <Link to="/" className="pnf-button">
          Go Back
        </Link>
      </div>
    </Layout>
  );
};

export default PagenotFound;
