import Layout from "../components/Layouts/Layout";
import { BiLogoGmail, BiSolidPhone } from "react-icons/bi";

import React from "react";

const Contact = () => {
  return (
    <Layout>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="/images/contactus.png"
            alt="conatctus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">Contact Us</h1>
          <p className="text-justify mt-2">
            Any query and info about product feel free to call anytime we 24/7
            availbale
          </p>
          <p className="mt-3">
            <BiLogoGmail /> : nfo@dreamclothing.com
          </p>
          <p className="mt-3">
            <BiSolidPhone /> : 01123456789
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
