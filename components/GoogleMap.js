// GoogleMap.js
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";

const MapContainer = ({ location, markers }) => {
  const mapStyles = {
    height: "100%",
    width: "100%",
  };

  const defaultCenter = {
    lat: location.lat,
    lng: location.lng,
  };

  const mapOptions = {
    styles: [
      {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [
          {
            visibility: "off",
          },
          {
            lightness: "-100",
          },
          {
            gamma: "7.29",
          },
          {
            weight: "0.01",
          },
        ],
      },
      {
        featureType: "administrative",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#444444",
          },
        ],
      },
      {
        featureType: "administrative.country",
        elementType: "geometry.fill",
        stylers: [
          {
            visibility: "off",
          },
          {
            lightness: "20",
          },
          {
            gamma: "3.86",
          },
          {
            hue: "#ff0000",
          },
          {
            weight: "5.10",
          },
        ],
      },
      {
        featureType: "administrative.country",
        elementType: "geometry.stroke",
        stylers: [
          {
            visibility: "off",
          },
          {
            lightness: "72",
          },
        ],
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "geometry.fill",
        stylers: [
          {
            visibility: "off",
          },
          {
            lightness: "-42",
          },
        ],
      },
      {
        featureType: "landscape",
        elementType: "all",
        stylers: [
          {
            color: "#f2f2f2",
          },
        ],
      },
      {
        featureType: "landscape.man_made",
        elementType: "geometry",
        stylers: [
          {
            visibility: "on",
          },
          {
            lightness: "54",
          },
          {
            saturation: "69",
          },
        ],
      },
      {
        featureType: "landscape.natural",
        elementType: "geometry.fill",
        stylers: [
          {
            visibility: "on",
          },
        ],
      },
      {
        featureType: "landscape.natural",
        elementType: "geometry.stroke",
        stylers: [
          {
            visibility: "on",
          },
        ],
      },
      {
        featureType: "landscape.natural",
        elementType: "labels.text.fill",
        stylers: [
          {
            visibility: "off",
          },
          {
            color: "#ff0000",
          },
          {
            lightness: "-3",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "all",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "all",
        stylers: [
          {
            saturation: -100,
          },
          {
            lightness: 45,
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "all",
        stylers: [
          {
            visibility: "simplified",
          },
        ],
      },
      {
        featureType: "road.arterial",
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "transit",
        elementType: "all",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "all",
        stylers: [
          {
            color: "#e0c8d5",
          },
          {
            visibility: "on",
          },
        ],
      },
    ],
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyAJYdY_z_t5vpwcIzIuLSXE6BaSJLqWzME">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={markers?.length > 0 ? markers[0] : defaultCenter}
        options={mapOptions}
      >
        {
          (markers && markers.length > 0 ) && markers.map((item, key)=> (
            <MarkerF key={key} position={item} icon={{url: '../marker.svg'}} />
          ))
        }
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
