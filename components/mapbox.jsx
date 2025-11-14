import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";

import "mapbox-gl/dist/mapbox-gl.css";

const Mapbox = ({ coordinates, zoom = 16 }) => {
  const mapContainerRef = useRef();
  const mapRef = useRef();
  const markerRef = useRef();
  const [mapError, setMapError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

    // Default coordinates (France center) if none provided
    const defaultCenter = [2.3522, 48.8566]; // Paris coordinates
    const center = coordinates
      ? [coordinates.lng, coordinates.lat]
      : defaultCenter;

    try {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/satellite-v9",
        center: center,
        zoom: zoom,
        projection: "mercator",
        dragPan: false,
        touchZoomRotate: false,
        scrollZoom: false,
        doubleClickZoom: false,
        interactive: false,
      });

      // Set loading to false when map is loaded
      mapRef.current.on("load", () => {
        setIsLoading(false);
      });
    } catch (error) {
      console.error("Error initializing Mapbox:", error);
      setMapError(error.message);
      setIsLoading(false);
      return;
    }

    // Add marker if coordinates are provided
    if (coordinates) {
      markerRef.current = new mapboxgl.Marker({
        color: "#db4200",
      })
        .setLngLat([coordinates.lng, coordinates.lat])
        .addTo(mapRef.current);
    }

    return () => {
      if (markerRef.current) {
        markerRef.current.remove();
      }
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [coordinates, zoom]);

  if (mapError) {
    return (
      <div
        style={{ height: "100%", width: "100%" }}
        className="flex items-center justify-center bg-gray-100 text-gray-600"
      >
        <div className="text-center">
          <p>Erreur de chargement de la carte</p>
          <p className="text-sm">{mapError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative" style={{ height: "100%", width: "100%" }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-600 z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mx-auto mb-2"></div>
            <p>Chargement de la carte...</p>
          </div>
        </div>
      )}
      <div ref={mapContainerRef} style={{ height: "100%", width: "100%" }} />
    </div>
  );
};

export default Mapbox;
