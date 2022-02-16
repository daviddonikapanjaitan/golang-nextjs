import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";

const Rankings = () => {
  const [rangkings, setRangkings] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("rankings");

      setRangkings(data);
    })();
  }, []);

  return (
    <Layout>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(rangkings).map((key: any, index: number) => {
              return (
                <tr key={key}>
                  <td>{index + 1}</td>
                  <td>{key}</td>
                  <td>{rangkings[key]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Rankings;
