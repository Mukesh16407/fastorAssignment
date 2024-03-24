import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
export const SingleProduct = () => {
  const [singleProductData, setSingleProductData] = useState({});
  const params = useParams();
  const starColor = singleProductData?.rating >= 4 ? "red" : "green";

  useEffect(() => {
    fetchProductData();
  }, [params.id]);

  const fetchProductData = async () => {
    try {
      const token = localStorage.getItem("userdbtoken");
      if (!token) {
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
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data1 = await response.json();

      // Find the product with matching ID
      const foundProduct = data1.find(
        (item) => item.restaurant_uuid === params.id
      );

      if (!foundProduct) {
        throw new Error("Product not found");
      }

      const transformedData = {
        image: foundProduct?.images?.[0]?.url,
        rating: foundProduct.rating.restaurant_avg_rating,
        cost: foundProduct.avg_cost_for_two,
        close: foundProduct.closes_at,
        rName: foundProduct?.restaurant_name,
        restaurant_uuid: foundProduct.restaurant_uuid,
        status: foundProduct?.status,
        symbol: foundProduct?.currency?.symbol,
        activePlan: foundProduct.active_plan,
      };

      setSingleProductData(transformedData);
    } catch (error) {
      console.log("Error", error);
    }
  };

  console.log(params, "Params");
  console.log(singleProductData, "singleProductData");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        padding: "20px",
      }}
    >
      <div style={{ width: "50%" }}>
        <div
          style={{
            display: "flex",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          }}
        >
          <div style={{ flex: 1 }}>
            <img
              src={singleProductData.image}
              alt="Product"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px 0 0 8px",
              }}
            />
          </div>
          <div style={{ flex: 1, padding: "20px" }}>
            {/* Display other product details here */}
            <h2>{singleProductData.rName}</h2>
            <p>
              Rating: <StarIcon fontSize="10px" style={{ color: starColor }} />{" "}
              {singleProductData.rating}
            </p>
            <p>
              Cost:{singleProductData.symbol} {singleProductData.cost}
            </p>
            <p>Closes At: {singleProductData.close}</p>
            <p>Status: {singleProductData.status}</p>
            <p>Active Plan: {singleProductData.activePlan}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
