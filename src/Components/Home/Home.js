import React, { useState, useEffect } from "react";
import "./Home.css";
import fakeData from "../Data/Data.json";
import HomeItem from "../HomeItem/HomeItem";
const Home = () => {

  const [cart, setCart] = useState([]);
  useEffect(() => {
    setCart(fakeData);
  }, []);

  console.log(cart);
  
  return (
    <div className="backgroundImage">
      <div className="rideBox">
        {
          cart.map((cart) => <HomeItem cart={cart} key={cart.id}></HomeItem> )
        }
      </div>
    </div>
  );
};

export default Home;
