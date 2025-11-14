"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { GooglePlacesAutocomplete } from "./GooglePlacesAutocomplete";

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
}

interface GooglePlacesWrapperProps {
  value: string;
  onChange: (value: string) => void;
  onPlaceSelect: (addressDetails: AddressDetails) => void;
  placeholder?: string;
  className?: string;
  apiKey?: string;
}

export const GooglePlacesWrapper: React.FC<GooglePlacesWrapperProps> = ({
  value,
  onChange,
  onPlaceSelect,
  placeholder = "Entrez une adresse...",
  className,
  apiKey,
}) => {
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    // Vérifier si l'API Google Maps est déjà chargée
    if (typeof window !== "undefined" && window.google && window.google.maps) {
      setIsGoogleMapsLoaded(true);
      return;
    }

    // Charger l'API Google Maps si une clé API est fournie
    if (apiKey) {
      loadGoogleMapsAPI(apiKey)
        .then(() => {
          setIsGoogleMapsLoaded(true);
        })
        .catch((error) => {
          setLoadError(error.message);
          console.error("Erreur lors du chargement de Google Maps:", error);
        });
    } else {
      setLoadError("Clé API Google Maps manquante");
    }
  }, [apiKey]);

  // Si l'API Google Maps n'est pas disponible, utiliser un input simple
  if (!isGoogleMapsLoaded || loadError) {
    return (
      <div className="relative w-full">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn("w-full", className)}
          autoComplete="off"
        />
        {loadError && (
          <div className="text-xs text-red-500 mt-1">
            Mode dégradé: {loadError}
          </div>
        )}
      </div>
    );
  }

  // Utiliser le composant GooglePlacesAutocomplete complet
  return (
    <GooglePlacesAutocomplete
      value={value}
      onChange={onChange}
      onPlaceSelect={onPlaceSelect}
      placeholder={placeholder}
      className={className}
    />
  );
};

// Fonction pour charger l'API Google Maps
const loadGoogleMapsAPI = (apiKey: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Vérifier si l'API est déjà chargée
    if (typeof window !== "undefined" && window.google && window.google.maps) {
      resolve();
      return;
    }

    // Créer le script pour charger l'API
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      // Attendre que l'API soit complètement initialisée
      const checkGoogleMaps = () => {
        if (window.google && window.google.maps && window.google.maps.places) {
          resolve();
        } else {
          setTimeout(checkGoogleMaps, 100);
        }
      };
      checkGoogleMaps();
    };

    script.onerror = () => {
      reject(new Error("Erreur lors du chargement de l'API Google Maps"));
    };

    document.head.appendChild(script);
  });
};

// Types pour TypeScript
declare global {
  interface Window {
    google: typeof google;
  }
}
