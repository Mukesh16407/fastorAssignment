/* eslint-disable react/prop-types */

const ImageCrousel = ({ imgdetail }) => {
  return (
    <>
      <div className="imgContainer">
        <div>
          <img className="ImageCrousell" src={imgdetail} alt="img" />

          {/* <div className="crouseloffer">
            <h5 className="offer1">
              {imgdetail?.info?.aggregatedDiscountInfoV3?.header}{" "}
              {imgdetail?.info?.aggregatedDiscountInfoV3?.subHeader}
            </h5>
          </div> */}
        </div>

        {/* <h3 className="heading">{imgdetail.info.name}</h3>
        <span className="rating_text">
          <StarsIcon style={{ color: "green", fontSize: "22px" }} />
          {imgdetail.info.avgRating}
        </span>
        <h4 className="text">{imgdetail.info.cuisines.join(", ")}</h4> */}
      </div>
    </>
  );
};

export default ImageCrousel;
