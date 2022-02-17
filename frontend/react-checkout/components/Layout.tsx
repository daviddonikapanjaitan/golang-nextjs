/* eslint-disable @next/next/no-sync-scripts */
import Head from "next/head";
import React from "react";

const Layout = (props) => {
  return (
    <>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        />
        <script src="https://js.stripe.com/v3/"></script>
      </Head>
      <div className="container">{props.children}</div>
    </>
  );
};

export default Layout;
