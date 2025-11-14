export { GooglePlacesAutocomplete } from './GooglePlacesAutocomplete';
export { GooglePlacesWrapper } from './GooglePlacesWrapper';

export interface AddressDetails {
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
