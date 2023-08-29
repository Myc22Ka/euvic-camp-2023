import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapViewProps {
  center: [number, number];
  title?: string;
  locations?: { center: [number, number]; title: string }[];
}

const MapView: React.FC<MapViewProps> = ({ center, title, locations = [] }) => {
  const customIcon = () => {
    return L.icon({
      iconUrl: require("../assets/img/location.png"),
      iconSize: [35, 35],
    });
  };

  return (
    <MapContainer
      center={[center[1], center[0]]}
      zoom={locations.length === 0 ? 13 : 4}
      scrollWheelZoom={false}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.length === 0 ? (
        <Marker position={[center[1], center[0]]} icon={customIcon()}>
          <Popup closeButton={false}>{title}</Popup>
        </Marker>
      ) : (
        locations.map((location, key) => {
          return (
            <Marker key={key} position={[location.center[1], location.center[0]]} icon={customIcon()}>
              <Popup closeButton={false}>{location.title}</Popup>
            </Marker>
          );
        })
      )}
    </MapContainer>
  );
};

export default MapView;
