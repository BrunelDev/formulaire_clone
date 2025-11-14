# GooglePlacesAutocomplete

Ce composant intègre Google Places Autocomplete pour permettre aux utilisateurs de sélectionner une adresse avec récupération automatique des informations détaillées.

## Fonctionnalités

- **Autocomplétion d'adresse** : Utilise l'API Google Places pour suggérer des adresses
- **Récupération des coordonnées GPS** : Latitude et longitude de l'adresse sélectionnée
- **Informations cadastrales** : Numéro de parcelle (ex: AK 0084)
- **Zone d'urbanisme** : Zone PLU/POS (ex: UA)
- **Ville/Mairie** : Nom de la commune
- **Mode dégradé** : Fonctionne avec un input simple si l'API Google Maps n'est pas disponible

## Configuration

### 1. Clé API Google Maps

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet ou sélectionnez un projet existant
3. Activez les APIs suivantes :
   - Maps JavaScript API
   - Places API
   - Geocoding API
4. Créez une clé API et configurez les restrictions appropriées
5. Ajoutez la clé dans votre fichier `.env.local` :

```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

### 2. APIs Cadastrales (Optionnel)

Le composant utilise des APIs publiques françaises pour récupérer les informations cadastrales :
- API Géoportail de l'IGN pour les parcelles
- API Géoportail de l'urbanisme pour les zones PLU/POS

Ces APIs sont gratuites mais peuvent nécessiter une configuration supplémentaire pour un usage en production.

## Utilisation

```tsx
import { GooglePlacesWrapper } from "@/components/GooglePlacesAutocomplete/GooglePlacesWrapper";

interface AddressDetails {
  coordinates?: { lat: number; lng: number };
  formattedAddress?: string;
  parcelNumber?: string;
  urbanZone?: string;
  city?: string;
  placeId?: string;
}

function MyComponent() {
  const [address, setAddress] = useState("");

  const handlePlaceSelect = (addressDetails: AddressDetails) => {
    
    // Utiliser les données récupérées
  };

  return (
    <GooglePlacesWrapper
      value={address}
      onChange={setAddress}
      onPlaceSelect={handlePlaceSelect}
      placeholder="Entrez une adresse..."
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
    />
  );
}
```

## Structure des données

Le composant retourne un objet `AddressDetails` avec les propriétés suivantes :

```typescript
interface AddressDetails {
  coordinates?: {
    lat: number;    // Latitude
    lng: number;    // Longitude
  };
  formattedAddress?: string;  // Adresse formatée (ex: "16 rue latapie 33650 La Brède")
  parcelNumber?: string;      // Numéro de parcelle (ex: "AK 0084")
  urbanZone?: string;         // Zone d'urbanisme (ex: "UA")
  city?: string;              // Ville/Mairie (ex: "La Brède")
  placeId?: string;           // ID Google Places
}
```

## Mode dégradé

Si l'API Google Maps n'est pas disponible ou si la clé API est manquante, le composant fonctionne en mode dégradé avec un input simple. Les informations cadastrales ne seront pas récupérées automatiquement dans ce cas.

## Personnalisation

Le composant utilise les classes Tailwind CSS et peut être personnalisé via la prop `className`. Il s'intègre avec le système de design existant du projet.

## Limitations

- Limité aux adresses françaises (configurable via `componentRestrictions`)
- Les informations cadastrales dépendent de la disponibilité des APIs publiques
- Nécessite une connexion internet pour fonctionner
- La précision des données cadastrales peut varier selon les régions

## Dépendances

- React 18+
- Next.js 13+
- Tailwind CSS
- Google Maps JavaScript API
- Google Places API
