import { Button, TextField } from "@mui/material";
import React, { SyntheticEvent, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";

const ProductForm = (props: any) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      (async () => {
        const { data } = await axios.get(`products/${id}`);

        setTitle(data.title);
        setDescription(data.description);
        setImage(data.image);
        setPrice(data.price);
      })();
    }
  }, []);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const data = {
      title,
      description,
      image,
      price: parseFloat(price),
    };

    if (id) {
      await axios.put(`products/${id}`, data);
    } else {
      await axios.post("products", data);
    }

    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to={"/products"} />;
  }

  return (
    <Layout>
      <form onSubmit={submit}>
        <div className="mb-3">
          <TextField
            label="Title"
            value={title}
            onChange={(e: any) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <TextField
            label="Description"
            rows={4}
            multiline
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <TextField
            value={image}
            label="Image"
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <TextField
            value={price}
            label="Price"
            type="number"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Layout>
  );
};

export default ProductForm;
