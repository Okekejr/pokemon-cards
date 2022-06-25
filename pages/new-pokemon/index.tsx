import React, { useState } from "react";
import Layout from "../../component/layout/Layout";
import Card from "../../component/ui/Card";
import classes from "./index.module.css";

const NewPokemon = () => {
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [imageUrl, setimageUrl] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const nameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newname = event.currentTarget.value;
    setname(newname);
  };

  const descriptionHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newdescription = event.currentTarget.value;
    setdescription(newdescription);
  };

  const imageUrlHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newimageUrl = event.currentTarget.value;
    setimageUrl(newimageUrl);
  };

  const saveData = async () => {
    let data = { name, description, imageUrl };

    const postReq = await fetch(
      "https://us-central1-strangelove-challenge.cloudfunctions.net/cards",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    const updatedData = await postReq.json();

    if (postReq.status === 200) {
      setDeleteSuccess(true);
      setname("");
      setdescription("");
      setimageUrl("");

      setTimeout(() => {
        setDeleteSuccess(false);
      }, 1500);
    }
  };
  return (
    <Layout>
      <h2>Add a Card</h2>
      <Card>
        <div className={classes.contents}>
          <div className={classes.control}>
            <label htmlFor="name">Title</label>
            <input type="text" required value={name} onChange={nameHandler} />
          </div>
          <div className={classes.control}>
            <label htmlFor="description">Description</label>
            <textarea
              required
              rows={5}
              value={description}
              onChange={descriptionHandler}
            ></textarea>
          </div>
          <div className={classes.control}>
            <label htmlFor="image">Image URL</label>
            <input
              type="url"
              required
              id="image"
              value={imageUrl}
              onChange={imageUrlHandler}
            />
          </div>
          <div className={classes.actions}>
            <button onClick={saveData}>Add Pokemon</button>
          </div>
          {deleteSuccess && <div>Pokemon added!</div>}
        </div>
      </Card>
    </Layout>
  );
};

export default NewPokemon;
