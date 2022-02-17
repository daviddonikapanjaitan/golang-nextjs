import React from "react";
import Layout from "../components/Layout";

const Error = () => {
  return (
    <Layout>
      <Layout>
        <div className="py-5 text-center">
          <h2>Error</h2>
          <p className="lead">Couldnt process payment</p>
        </div>
      </Layout>
    </Layout>
  );
};

export default Error;
