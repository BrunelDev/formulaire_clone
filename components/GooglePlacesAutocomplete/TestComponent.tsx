"use client";

import React, { useState } from "react";
import { GooglePlacesWrapper } from "./GooglePlacesWrapper";
import { AddressDetails } from "./index";

/**
 * Composant de test pour GooglePlacesAutocomplete
 * Utilisez ce composant pour tester les fonctionnalités
 */
export const GooglePlacesTestComponent: React.FC = () => {
  const [address, setAddress] = useState("");
  const [selectedDetails, setSelectedDetails] = useState<AddressDetails | null>(null);

  const handlePlaceSelect = (addressDetails: AddressDetails) => {
    
    setSelectedDetails(addressDetails);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Test Google Places Autocomplete
      </h2>

      {/* Composant GooglePlacesWrapper */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rechercher une adresse :
        </label>
        <GooglePlacesWrapper
          value={address}
          onChange={setAddress}
          onPlaceSelect={handlePlaceSelect}
          placeholder="Tapez une adresse (ex: 16 rue latapie la brède)..."
          className="w-full"
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        />
      </div>

      {/* Affichage des résultats */}
      {selectedDetails && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Informations récupérées :
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-700">Adresse formatée :</h4>
              <p className="text-blue-600">
                {selectedDetails.formattedAddress || "Non disponible"}
              </p>
            </div>

            <div>
              <h4 className="font-medium text-gray-700">Ville/Mairie :</h4>
              <p className="text-blue-600">
                {selectedDetails.city || "Non disponible"}
              </p>
            </div>

            <div>
              <h4 className="font-medium text-gray-700">Coordonnées GPS :</h4>
              <p className="text-blue-600">
                {selectedDetails.coordinates
                  ? `${selectedDetails.coordinates.lat.toFixed(6)}, ${selectedDetails.coordinates.lng.toFixed(6)}`
                  : "Non disponible"}
              </p>
            </div>

            <div>
              <h4 className="font-medium text-gray-700">Numéro de parcelle :</h4>
              <p className="text-blue-600">
                {selectedDetails.parcelNumber || "Non disponible"}
              </p>
            </div>

            <div>
              <h4 className="font-medium text-gray-700">Zone d&apos;urbanisme :</h4>
              <p className="text-blue-600">
                {selectedDetails.urbanZone || "Non disponible"}
              </p>
            </div>

            <div>
              <h4 className="font-medium text-gray-700">Place ID :</h4>
              <p className="text-blue-600 text-xs">
                {selectedDetails.placeId || "Non disponible"}
              </p>
            </div>
          </div>

          {/* Lien Google Maps */}
          {selectedDetails.coordinates && (
            <div className="mt-4">
              <a
                href={`https://www.google.com/maps?q=${selectedDetails.coordinates.lat},${selectedDetails.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Voir sur Google Maps
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          )}
        </div>
      )}

      {/* Instructions */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">
          Instructions de test :
        </h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Tapez une adresse française (ex: &quot;16 rue latapie la brède&quot;)</li>
          <li>• Sélectionnez une suggestion dans la liste déroulante</li>
          <li>• Vérifiez que toutes les informations sont récupérées</li>
          <li>• Testez avec différents types d&apos;adresses (rue, avenue, place, etc.)</li>
        </ul>
      </div>

      {/* État de l'API */}
      <div className="mt-4 text-xs text-gray-500">
        <p>
          Clé API Google Maps : {
            process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY 
              ? "✅ Configurée" 
              : "❌ Non configurée"
          }
        </p>
      </div>
    </div>
  );
};

export default GooglePlacesTestComponent;
