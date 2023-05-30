import { useState } from "react";

interface LocationInputProps {
  GetWeather: (location: string) => void;
}

function LocationInput({ GetWeather }: LocationInputProps) {
  const [location, setLocation] = useState("");

  const UpdateLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  return (
    <div className="location-input-container">
      <img
        className="location-icon"
        src={"./images/location-point-white.svg"}
      ></img>
      <input
        value={location}
        id="location-input"
        className="location-input"
        placeholder="City"
        onChange={(e) => UpdateLocation(e)}
      ></input>
      <button
        className="location-btn"
        onClick={() => {
          GetWeather(location);
          setLocation("");
        }}
      >
        Go
      </button>
    </div>
  );
}

export default LocationInput;
