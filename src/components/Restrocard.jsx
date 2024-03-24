/* eslint-disable react/prop-types */

import StarsIcon from "@mui/icons-material/Stars";

const Restrocard = (props) => {
  const { resdetail } = props;
  return (
    <div className="restro-card">
      {/* <div className="img_div"> */}
      <img
        alt="img"
        className="res-img"
        src={resdetail.info.cloudinaryImageId}
      />
      <div
        className="offer"
        style={{
          // width: "230px",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
        }}
      >
        <h5 className="offer1">ORDER NOW</h5>
        {/* </div> */}
      </div>

      <div className="menu">
        <h3 className="heading">{resdetail.info.name}</h3>
        <span className="rating_text">
          <StarsIcon style={{ color: "green", fontSize: "22px" }} />
          {resdetail.info.avgRating}
        </span>
        <div className="text_illpsis">{resdetail.info.cuisines.join(", ")}</div>
        <p className="text">{resdetail.info.costForTwo}</p>
        <p className="text">🕙{resdetail.info.sla.slaString}</p>
      </div>
    </div>
  );
};

export default Restrocard;
