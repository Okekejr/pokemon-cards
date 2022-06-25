import { useEffect, useState } from "react";
import Layout from "../component/layout/Layout";

interface Istate {
  empty: {
    id: string;
    description: string;
    name: string;
    imageUrl: string;
  }[];
}

function Homepage() {
  const [cards, setCards] = useState<Istate["empty"]>([]);

  useEffect(() => {
    request();
  }, []);

  const request = async () => {
    const response = await fetch(
      "https://us-central1-strangelove-challenge.cloudfunctions.net/cards"
    );
    const data = await response.json();
    setCards(data);
  };

  const deleteHandler = async (id: string) => {
    const delreq = await fetch(
      `https://us-central1-strangelove-challenge.cloudfunctions.net/cards/${id}`,
      {
        method: "DELETE",
      }
    );

    const del = await delreq.json();
    request();
  };

  const renderList = (): JSX.Element[] => {
    return cards.map(({ id, imageUrl, description, name }) => {
      return (
        <div key={id}>
          <div className="card">
            <img className="img" src={imageUrl} alt={name}></img>
            <div className="texts">
              <h1>{name}</h1>
              <span>{description}</span>
            </div>
            <div className="remove-button" onClick={() => deleteHandler(id)}>
              &#128465;
            </div>
          </div>
          <div className="line"></div>
        </div>
      );
    });
  };

  return (
    <Layout>
      <h2>My Card Collection</h2>
      <div className="card-container">{renderList()}</div>
    </Layout>
  );
}

export default Homepage;
