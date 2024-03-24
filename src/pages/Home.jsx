import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ImageCrousel from "../components/ImageCrousel";
import Restrocard from "../components/Restrocard";

export const Home = () => {
  const [filterrestro, setFilterrestro] = useState([]);
  // const [text, setText] = useState([]);
  const [imagecard, setImagecard] = useState([]);
  const [platecrousel, setPlateCrousel] = useState([]);

  useEffect(() => {
    fetchDeta();
  }, []);

  const fetchDeta = async () => {
    try {
      const response = await fetch(
        "https://staging.fastor.in/v1/m/restaurant?city_id=118"
      );
      const data1 = await response.json();
      console.log(data1);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div>
      <h2 className="h2">Best offer for you</h2>
      <div className="Imagecrousel">
        {imagecard.map((image) => (
          <Link key={image.info.id} to={"/Restorent/" + image.info.id}>
            <ImageCrousel imgdetail={image} />
          </Link>
        ))}
      </div>

      <h2 className="h2" style={{ marginBottom: "20px" }}>
        Restaurants with online food delivery
      </h2>
      <div className="Res-container">
        {filterrestro.map((item) => (
          <Link key={item.info.id} to={"/Restorent/" + item.info.id}>
            <Restrocard resdetail={item} />
          </Link>
        ))}
      </div>
    </div>
  );
};
