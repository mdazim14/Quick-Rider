import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Destination.css";
import GoogleMap from "../GoogleMap/GoogleMap";
import fakeData from "../Data/Data.json";

const Destination = () => {
  
  const { name } = useParams();

  const [ride, setRide] = useState(true);

  const [vehicle, setVehicle] = useState([]);

  useEffect(() => {
    setVehicle(fakeData);
  }, []);


  const selectedVehicle = vehicle.find((vh) => vh.name === name);

  return (
    
    <div class="mainBox1">
      {ride ? (
        <form class="formBox1">
          <label>Pick From</label>
          <input name="from" type="text" placeholder="Mirpur-11" required />
          <label style={{ marginTop: "10px" }}>Pick To</label>
          <input name="to" type="text" placeholder="Dhanmondi" required />
          <label>Select A Date</label>

          <input name="date" type="date" required />
          
          <input
            onClick={() => setRide(false)}
            type="submit"
            value="search"
            style={{
              marginTop: "50px",
              fontWeight: "bold"
            }}
          />
        </form>
      ) : (

        <div  class="mainBox2"> 
          <div className="formBox2">
            <label>Pick From</label>
            <input
              name="from"
              type="text"
              placeholder="Mirpur-11"
              required=""
            />
            <label style={{ marginTop: "10px" }}>Pick To</label>
            <input name="to" type="text" placeholder="Dhanmondi" required="" />
            <label>Select A Date</label>
            <input name="date" type="date" required="" />

            <div className="formBox" style={{ marginTop: "20px", display: "flex", justifyContent: "left", alignItems: "center"}}>
            <img style={{ width: "70px" }} src={selectedVehicle.image} alt="" />
            <div className="ml-5">
            {selectedVehicle.name} 
            </div>
            <div className="ml-5">
            ${selectedVehicle.price}
            </div>
          </div>

          </div>
          
        </div>
      )}

      <div className="mapStyle">
        <GoogleMap></GoogleMap>
      </div>
    </div>
  );
};

export default Destination;
