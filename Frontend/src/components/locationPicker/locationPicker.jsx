import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "./locationPicker.scss";

function LocationClick({ setLat, setLng, setPosition }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;

      setLat(lat);
      setLng(lng);
      setPosition([lat, lng]);
    },
  });

  return null;
}

function LocationPicker({
  show,
  setShow,
  lat,
  lng,
  setLat,
  setLng,
  position,
  setPosition,
}) {
  if (!show) return null;

  const handleMyLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const la = pos.coords.latitude;
      const lo = pos.coords.longitude;

      setLat(la);
      setLng(lo);
      setPosition([la, lo]);
    });
  };

  return (
    <div className="mapModal">
      <div className="mapBox">

        <h3>Select Flat Location</h3>

        <button onClick={handleMyLocation} className="locBtn">
          Use My Current Location
        </button>

        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "350px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <Marker
            position={position}
            draggable
            eventHandlers={{
              dragend: (e) => {
                const pos = e.target.getLatLng();
                setLat(pos.lat);
                setLng(pos.lng);
                setPosition([pos.lat, pos.lng]);
              },
            }}
          />

          <LocationClick
            setLat={setLat}
            setLng={setLng}
            setPosition={setPosition}
          />
        </MapContainer>

        <div className="actions">
          <button onClick={() => setShow(false)}>Confirm Location</button>
        </div>

      </div>
    </div>
  );
}

export default LocationPicker;
