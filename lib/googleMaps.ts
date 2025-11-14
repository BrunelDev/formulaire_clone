// Utilitaire pour charger l'API Google Maps
export const loadGoogleMapsAPI = (apiKey: string): Promise<void> => {
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
      resolve();
    };

    script.onerror = () => {
      reject(new Error("Erreur lors du chargement de l'API Google Maps"));
    };

    document.head.appendChild(script);
  });
};

// Hook pour charger l'API Google Maps
import { useEffect, useState } from "react";

export const useGoogleMaps = (apiKey?: string) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!apiKey) {
      setError("Clé API Google Maps manquante");
      return;
    }

    loadGoogleMapsAPI(apiKey)
      .then(() => {
        setIsLoaded(true);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [apiKey]);

  return { isLoaded, error };
};

// Types pour TypeScript
declare global {
  interface Window {
    google: typeof google;
  }
}
