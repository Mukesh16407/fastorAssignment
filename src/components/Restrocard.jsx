/* eslint-disable react/prop-types */
import StarIcon from "@mui/icons-material/Star";
const Restrocard = ({ resdetail }) => {
  const starColor = resdetail?.rating >= 4 ? "red" : "green";

  return (
    <div style={styles.card}>
      <img src={resdetail.image} alt="Restaurant" style={styles.image} />
      <div style={styles.details}>
        <div>
          <h3>{resdetail.rName}</h3>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>
            {" "}
            <StarIcon fontSize="10px" style={{ color: starColor }} />
            {resdetail.rating}
          </p>
          <p>
            {resdetail.symbol} {resdetail.cost}
          </p>
          <p> {resdetail.status}</p>
        </div>
      </div>
    </div>
  );
};
const styles = {
  card: {
    width: "250px", // Adjust width as needed
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    marginBottom: "20px",
    cursor: "pointer",
    transition: "transform 0.3s ease",
    backgroundColor: "white",
    color: "black",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  },
  details: {
    padding: "20px",
  },
  name: {
    color: "black",
    marginBottom: "10px",
  },
  info: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "black",
  },
};

export default Restrocard;
