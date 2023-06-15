import { useState } from "react";

interface LocationInputProps {
  error: string;
  UpdateLocation: any;
  UpdateWeather: (location: string) => void;
}

function LocationInput({ error, UpdateLocation, UpdateWeather }: LocationInputProps) {
  const [location, setLocation] = useState("");

  function Submit() {
    UpdateWeather(location);
    UpdateLocation(location);
    setLocation("");
  }

  function CheckSubmit(e: any){
    if(e.key === "Enter") {
        Submit();
    }
  }

  return (
    <div className="location-input-container">
      <img
        className="location-icon"
        src={"./images/location-point-white.svg"}
        alt="Location Picker Icon"
      ></img>
      <input
        value={location}
        id="location-input"
        className="location-input"
        placeholder="City"
        onChange={(e) => {setLocation(e.target.value)}}
        onKeyDown={(e) => {CheckSubmit(e)}}
      ></input>
      <p className="error">{error}</p>
    </div>
  );
}

export default LocationInput;
