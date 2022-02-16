import React, { Dispatch, useEffect, useState } from "react";
import Menu from "./Menu";
import Nav from "./Nav";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { User } from "../models/user";
import { connect } from "react-redux";
import { setUser } from "../redux/actions/setUserAction";

const Layout = (props: any) => {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("user");

        setUser(data);
        props.setUser(data);
      } catch (e) {
        setRedirect(true);
      }
    })();
  }, []);

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      <Nav />

      <div className="container-fluid"></div>
      <div className="row">
        <Menu />

        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <h2>Section title</h2>
          <div className="table-responsive">{props.children}</div>
        </main>
      </div>
    </div>
  );
};

const mapStateToProps = (state: { user: User }) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setUser: (user: User) => dispatch(setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
