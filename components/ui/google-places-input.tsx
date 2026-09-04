'use client';

import { cn } from '@/lib/utils';
import { importLibrary, setOptions } from '@googlemaps/js-api-loader';
import { MapPin } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { envConfig } from '../../envConfig';

export interface GooglePlaceResult {
  address: string;
  lat: number;
  lng: number;
  city?: string;
}

interface GooglePlacesInputProps {
  placeholder?: string;
  value?: string;
  /** Called when the user picks a suggestion from the Google dropdown */
  onPlaceSelectAction: (result: GooglePlaceResult) => void;
  /** Called on every keystroke — lets the parent fall back to a plain keyword search */
  onTextChange?: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  /** ISO 3166-1 alpha-2 country code to restrict suggestions to, e.g. "et". Omit for worldwide suggestions. */
  country?: string;
  /** Google Places types to restrict suggestions, e.g. ['(cities)']. Omit for all types. */
  types?: string[];
  error?: boolean;
}

let optionsInitialized = false;

export function GooglePlacesInput({
  placeholder = 'Search address...',
  value = '',
  onPlaceSelectAction,
  onTextChange,
  onKeyDown,
  className,
  country,
  types,
  error,
}: GooglePlacesInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const onPlaceSelectRef = useRef(onPlaceSelectAction);
  const [inputVal, setInputVal] = useState(value);
  
  // Sync inputVal with value prop when it changes externally
  // Use a ref to track if the change came from internal or external
  const isInternalChangeRef = useRef(false);

  useEffect(() => {
    // Only update if the change came from external (not from internal setInputVal)
    if (!isInternalChangeRef.current) {
      setInputVal(value);
    }
    isInternalChangeRef.current = false;
  }, [value]);

  useEffect(() => {
    onPlaceSelectRef.current = onPlaceSelectAction;
  }, [onPlaceSelectAction]);

  const [apiKey, setApiKey] = useState<string>('');

  useEffect(() => {
    const getApiKey = async () => {
      const config = await envConfig();
      setApiKey(config.googleMapsApiKey || '');
    };
    getApiKey();
  }, []);

  useEffect(() => {
    if (!apiKey || !inputRef.current) return;

    if (!optionsInitialized) {
      setOptions({ key: apiKey, v: 'weekly' });
      optionsInitialized = true;
    }

    let listener: google.maps.MapsEventListener | undefined;

    importLibrary('places')
      .then(({ Autocomplete }) => {
        if (!inputRef.current) return;
        const autocomplete = new Autocomplete(inputRef.current, {
          fields: ['formatted_address', 'geometry', 'address_components'],
          ...(country && { componentRestrictions: { country } }),
          ...(types && { types }),
        });
        listener = autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          const lat = place.geometry?.location?.lat();
          const lng = place.geometry?.location?.lng();
          if (lat == null || lng == null) return;
          const city = place.address_components?.find(
            (c) => c.types.includes('locality') || c.types.includes('administrative_area_level_2')
          )?.long_name;
          const isCitySearch = types?.includes('(cities)');
          const address = (isCitySearch && city) ? city : (place.formatted_address ?? inputRef.current?.value ?? '');
          
          // Mark as internal change to prevent the value useEffect from resetting it
          isInternalChangeRef.current = true;
          setInputVal(address);
          onPlaceSelectRef.current({ address, lat, lng, city });
        });
      })
      .catch((err) => {
        console.error('Failed to load Google Maps Places library', err);
      });

    return () => {
      listener?.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, types?.join(','), apiKey]);

  return (
    <div className="relative w-full">
      <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-2/60 pointer-events-none z-10" />
      <input
        ref={inputRef}
        value={inputVal}
        onChange={(e) => {
          // Mark as internal change
          isInternalChangeRef.current = true;
          setInputVal(e.target.value);
          onTextChange?.(e.target.value);
        }}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        autoComplete="off"
        className={cn(
          'w-full h-12 rounded-sm pl-10 pr-4 text-neutral-1 font-medium text-sm outline-none transition-all border',
          error
            ? 'bg-red-50/30 border-red-400 focus:ring-2 focus:ring-red-200'
            : 'bg-[#F6F6F6] border-transparent focus:ring-2 focus:ring-primary/20',
          className
        )}
      />
    </div>
  );
}