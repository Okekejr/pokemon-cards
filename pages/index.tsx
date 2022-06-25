import { useEffect, useState } from "react";
import Image from "next/image";
import Layout from "../component/layout/Layout";
import { CirclesWithBar } from "react-loader-spinner";

interface Istate {
  empty: {
    id: string;
    description: string;
    imageUrl: string;
    name: string;
  }[];
}

interface myLoaderProps {
  src: string;
}

const myLoader = ({ src }: myLoaderProps) => {
  return `${src}`;
};

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

  if (cards.length === 0) {
    return (
      <div className="spinner">
        <CirclesWithBar color="#77002e" />
      </div>
    );
  }

  const renderList = (): JSX.Element[] => {
    return cards.map(({ id, imageUrl, description, name }) => {
      return (
        <div key={id}>
          <div className="card">
            <Image
              loader={myLoader}
              src={imageUrl}
              alt={name}
              width={340}
              height={450}
              unoptimized={true}
            />
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
      <h2>My card collection</h2>
      <div className="card-container">{renderList()}</div>
    </Layout>
  );
}

export default Homepage;
