import React from "react";
import "./homepage.css";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Homepage = () => {
  const defaultProps = {
    center: { lat: 59.95, lng: 30.33 },
    zoom: 11,
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent lat={59.955413} lng={30.337844} text={"India"} />
      </GoogleMapReact>
    </div>
  );
};

export default Homepage;
