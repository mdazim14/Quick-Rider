import React from "react";
import { Link } from "react-router-dom";
import "./HomeItem.css";
const HomeItem = ({cart}) => {
  const { name, image} = cart;

  return (

      <div className="rideBox">
        <Link to={`/destination/${name}`}>
        <div className="rider">
          <img style={{ width: "100%", padding: "20px" }}  src={image} alt="" />
          <button className=" btnStyle btn pl-5 pr-5  mt-4 btn-outline-warning ">
               {name}
          </button>
        </div>
        </Link>
      </div>

  );
};

export default HomeItem;
