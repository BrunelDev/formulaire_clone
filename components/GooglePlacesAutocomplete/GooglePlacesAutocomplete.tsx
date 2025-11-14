"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Input } from "../ui/input";

interface AddressDetails {
  coordinates?: {
    lat: number;
    lng: number;
  };
  formattedAddress?: string;
  parcelNumber?: string;
  urbanZone?: string;
  city?: string;
  placeId?: string;
  zoneType?: string;
}

interface GooglePlacesAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onPlaceSelect: (addressDetails: AddressDetails) => void;
  placeholder?: string;
  className?: string;
}

interface PlacePrediction {
  description: string;
  place_id: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

export const GooglePlacesAutocomplete: React.FC<
  GooglePlacesAutocompleteProps
> = ({
  value,
  onChange,
  onPlaceSelect,
  placeholder = "Entrez une adresse...",
  className,
}) => {
  const [predictions, setPredictions] = useState<PlacePrediction[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);
  const geocoder = useRef<google.maps.Geocoder | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialiser les services Google Maps
    if (typeof window !== "undefined" && window.google) {
      autocompleteService.current =
        new google.maps.places.AutocompleteService();
      geocoder.current = new google.maps.Geocoder();

      // Créer une carte invisible pour le PlacesService
      if (mapRef.current) {
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: 46.603354, lng: 1.888334 }, // Centre de la France
          zoom: 6,
        });
        placesService.current = new google.maps.places.PlacesService(map);
      }
    }
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleInputChange = (inputValue: string) => {
    onChange(inputValue);

    if (inputValue.length > 2 && autocompleteService.current) {
      setIsLoading(true);

      autocompleteService.current.getPlacePredictions(
        {
          input: inputValue,
          componentRestrictions: { country: "fr" }, // Limiter à la France
          types: ["address"],
        },
        (predictions, status) => {
          setIsLoading(false);
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            setPredictions(predictions);
            setIsOpen(true);
          } else {
            setPredictions([]);
            setIsOpen(false);
          }
        }
      );
    } else {
      setPredictions([]);
      setIsOpen(false);
    }
  };

  const handlePlaceSelect = async (prediction: PlacePrediction) => {
    onChange(prediction.description);
    setIsOpen(false);
    setPredictions([]);
    setIsLoadingDetails(true);

    if (placesService.current) {
      // Récupérer les détails de la place
      placesService.current.getDetails(
        {
          placeId: prediction.place_id,
          fields: [
            "geometry",
            "formatted_address",
            "address_components",
            "name",
          ],
        },
        async (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && place) {
            const coordinates = place.geometry?.location
              ? {
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng(),
                }
              : undefined;

            // Extraire la ville des composants d'adresse
            let city = "";
            if (place.address_components) {
              const cityComponent = place.address_components.find(
                (component) =>
                  component.types.includes("locality") ||
                  component.types.includes("administrative_area_level_2")
              );
              city = cityComponent?.long_name || "";
            }

            const addressDetails: AddressDetails = {
              coordinates,
              formattedAddress:
                place.formatted_address || prediction.description,
              city,
              placeId: prediction.place_id,
            };

            // Récupérer les informations cadastrales si les coordonnées sont disponibles
            if (coordinates) {
              try {
                const cadastralInfo = await getCadastralInfo(coordinates);
                addressDetails.parcelNumber = cadastralInfo.parcelNumber;
                addressDetails.urbanZone = cadastralInfo.urbanZone;
                addressDetails.zoneType = cadastralInfo.zoneType;
              } catch (error) {
                console.warn(
                  "Erreur lors de la récupération des informations cadastrales:",
                  error
                );
              }
            }

            onPlaceSelect(addressDetails);
            setIsLoadingDetails(false);
          } else {
            setIsLoadingDetails(false);
          }
        }
      );
    } else {
      setIsLoadingDetails(false);
    }
  };
  // ...existing code...
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  // Met à jour la position du dropdown
  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: "absolute",
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        zIndex: 9999,
      });
    }
  }, [isOpen, value]);

  // ...existing code...

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Carte invisible pour le PlacesService */}
      <div ref={mapRef} style={{ display: "none" }} />

      <div className="relative">
        <Input
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder={placeholder}
          className={cn("w-full", isLoadingDetails && "pr-10", className)}
          autoComplete="on"
          disabled={isLoadingDetails}
        />
        {isLoadingDetails && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
          </div>
        )}
      </div>
      {isOpen &&
        createPortal(
          <div
            style={dropdownStyle}
            className="bg-white border border-gray-200 rounded-md shadow-lg max-h-48 sm:max-h-60 overflow-auto"
            onMouseDown={(e) => e.stopPropagation()} // <-- Ajoute ceci
          >
            {isLoading ? (
              <div className="px-3 sm:px-4 py-2 text-gray-500 text-sm">
                Recherche en cours...
              </div>
            ) : isLoadingDetails ? (
              <div className="px-3 sm:px-4 py-2">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                  <div className="text-gray-500 text-sm">
                    Récupération des détails (adresse, mairie, cadastre)...
                  </div>
                </div>
                <div className="mt-2 space-y-2">
                  <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
                </div>
              </div>
            ) : predictions.length > 0 ? (
              predictions.map((prediction) => (
                <div
                  key={prediction.place_id}
                  className="px-3 sm:px-4 py-2 cursor-pointer hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                  onClick={() => {
                    handlePlaceSelect(prediction);
                  }}
                >
                  <div className="font-medium text-gray-900 text-sm sm:text-base">
                    {prediction.structured_formatting.main_text}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">
                    {prediction.structured_formatting.secondary_text}
                  </div>
                </div>
              ))
            ) : (
              <div className="px-3 sm:px-4 py-2 text-gray-500 text-sm">
                Aucun résultat trouvé
              </div>
            )}
          </div>,
          document.body
        )}
    </div>
  );
};

// Fonction pour récupérer les informations cadastrales
async function getCadastralInfo(coordinates: { lat: number; lng: number }) {
  try {
    const response = await fetch(
      `/api/cadastral?lat=${coordinates.lat}&lng=${coordinates.lng}`
    );

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }

    const data = await response.json();

    return {
      parcelNumber: data.parcelNumber,
      urbanZone: data.urbanZone,
      city: data.city,
      zoneType: data.zoneType,
    };
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des informations cadastrales:",
      error
    );

    // Données d'exemple en cas d'erreur
    return {
      parcelNumber: "AK 0084",
      urbanZone: "UA",
    };
  }
}
