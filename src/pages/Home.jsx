import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Restrocard from "../components/Restrocard";
import ImageCrousel from "../components/ImageCrousel";
import { Carousel } from "react-responsive-carousel";
import { Button, CircularProgress } from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export const Home = () => {
  const [filterrestro, setFilterrestro] = useState([]);
  const [imagecard, setImagecard] = useState([]);

  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;

  const handleNextPage = () => {
    if (startIndex + itemsPerPage < imagecard.length) {
      setStartIndex((prevIndex) => prevIndex + itemsPerPage);
    } else {
      setStartIndex(0);
    }
  };

  useEffect(() => {
    fetchDeta();
  }, []);

  const fetchDeta = async () => {
    try {
      const token = localStorage.getItem("userdbtoken");
      if (!token) {
        // Handle case where token is not available
        throw new Error("Token not found");
      }

      const response = await fetch(
        "https://staging.fastor.in/v1/m/restaurant",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        // Handle unauthorized or other errors
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data1 = await response.json();

      console.log(data1, "data1");

      const images = data1.map((item) => item?.images?.[0]?.url);
      setImagecard(images);
      const transformedData = data1.map((item) => ({
        image: item?.images?.[0]?.url,
        rating: item.rating.restaurant_avg_rating,
        cost: item.avg_cost_for_two,
        close: item.closes_at,
        rName: item?.restaurant_name,
        restaurant_uuid: item.restaurant_uuid,
        status: item?.status,
        symbol: item?.currency?.symbol,
      }));
      setFilterrestro(transformedData);
    } catch (error) {
      console.log("Error", error);
    }
  };
  console.log(filterrestro, "filterrestro");

  return (
    <div>
      <div style={{ marginTop: "50px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Your Taste</h2>
          <p onClick={handleNextPage} style={{ cursor: "pointer" }}>
            See All <ChevronRightIcon />
          </p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {imagecard
            .slice(startIndex, startIndex + itemsPerPage)
            .map((imageUrl, index) => (
              <div
                key={index}
                style={{ flex: "0 0 25%", maxWidth: "25%", padding: "8px" }}
              >
                <img
                  src={imageUrl}
                  alt={`Restaurant ${index}`}
                  style={{ width: "100%", borderRadius: "10px" }}
                />
              </div>
            ))}
        </div>
      </div>
      <div className="Imagecrousel">
        <div
          style={{
            borderRadius: "10px",
            overflow: "hidden",
            position: "relative",
            height: "500px",
          }}
        >
          {imagecard.length === 0 ? (
            <CircularProgress />
          ) : (
            <Carousel
              showThumbs={false}
              showStatus={false}
              infiniteLoop={true}
              autoPlay={true}
              interval={5000}
              transitionTime={500}
              emulateTouch={true}
              dynamicHeight={true}
              stopOnHover={true}
              swipeable={true}
            >
              {imagecard.map((imageUrl, index) => (
                <div key={index}>
                  <img
                    src={imageUrl}
                    alt={`Restaurant ${index}`}
                    style={{ borderRadius: "10px" }}
                  />
                </div>
              ))}
            </Carousel>
          )}
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: "1",
            }}
          >
            <CarouselDotIndicator totalSlides={imagecard.length} />
          </div>
        </div>
      </div>
      <div>
        <h3>Popular Ones</h3>
        <div style={styles.gridContainer}>
          {filterrestro.map((item, index) => (
            <div key={index} style={styles.cardWrapper}>
              <Link key={index} to={"/user/" + item?.restaurant_uuid}>
                <Restrocard resdetail={item} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CarouselDotIndicator = ({ totalSlides }) => {
  const dots = [];
  for (let i = 0; i < totalSlides; i++) {
    dots.push(
      <div
        key={i}
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          margin: "0 4px",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          display: "inline-block",
        }}
      />
    );
  }
  return <div>{dots}</div>;
};

const styles = {
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", // Adjust minmax width and padding as needed
    gridGap: "20px",
    padding: "20px",
  },
  cardWrapper: {
    width: "100%",
  },
};
