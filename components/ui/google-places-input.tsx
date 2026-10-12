'use client';

import { cn } from '@/lib/utils';
import { importLibrary, setOptions } from '@googlemaps/js-api-loader';
import { MapPin, Loader2, Navigation } from 'lucide-react';
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
  variant?: 'light' | 'dark';
}

let optionsInitialized = false;

export function GooglePlacesInput({
  placeholder = 'Search address or location...',
  value = '',
  onPlaceSelectAction,
  onTextChange,
  onKeyDown,
  className,
  country,
  types,
  error,
  variant = 'light',
}: GooglePlacesInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const onPlaceSelectRef = useRef(onPlaceSelectAction);
  const [inputVal, setInputVal] = useState(value);
  const [googleLoaded, setGoogleLoaded] = useState(false);

  // Nominatim Fallback State
  const [suggestions, setSuggestions] = useState<Array<{ display_name: string; lat: string; lon: string; address?: any }>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearchingFallback, setIsSearchingFallback] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const isInternalChangeRef = useRef(false);

  useEffect(() => {
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
      const key = config.googleMapsApiKey || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
      setApiKey(key);
    };
    getApiKey();
  }, []);

  // Setup Google Places Autocomplete
  useEffect(() => {
    if (!apiKey || !inputRef.current) return;

    if (!optionsInitialized) {
      try {
        setOptions({ key: apiKey, v: 'weekly' });
        optionsInitialized = true;
      } catch (err) {
        console.warn('Google Maps options initialization skipped or error:', err);
      }
    }

    let listener: google.maps.MapsEventListener | undefined;

    importLibrary('places')
      .then(({ Autocomplete }) => {
        if (!inputRef.current) return;
        setGoogleLoaded(true);

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

          isInternalChangeRef.current = true;
          setInputVal(address);
          setShowSuggestions(false);
          onPlaceSelectRef.current({ address, lat, lng, city });
        });
      })
      .catch((err) => {
        console.warn('Google Maps Places library not available, falling back to free search:', err);
        setGoogleLoaded(false);
      });

    return () => {
      listener?.remove();
    };
  }, [country, types?.join(','), apiKey]);

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch Nominatim fallback suggestions if Google Places is not loaded
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    isInternalChangeRef.current = true;
    setInputVal(text);
    onTextChange?.(text);

    if (googleLoaded) return; // Google Places autocomplete is active

    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

    if (!text || text.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    debounceTimerRef.current = setTimeout(async () => {
      setIsSearchingFallback(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(text)}&limit=5&addressdetails=1`
        );
        if (response.ok) {
          const data = await response.json();
          setSuggestions(data || []);
          setShowSuggestions((data || []).length > 0);
        }
      } catch (err) {
        console.error('Fallback location search error:', err);
      } finally {
        setIsSearchingFallback(false);
      }
    }, 350);
  };

  const handleSelectFallback = (item: { display_name: string; lat: string; lon: string; address?: any }) => {
    const lat = parseFloat(item.lat);
    const lng = parseFloat(item.lon);
    const address = item.display_name;
    const city = item.address?.city || item.address?.town || item.address?.village || item.address?.state;

    isInternalChangeRef.current = true;
    setInputVal(address);
    setShowSuggestions(false);
    onPlaceSelectRef.current({ address, lat, lng, city });
  };

  const isDark = variant === 'dark';

  return (
    <div className="relative w-full">
      <MapPin
        size={16}
        className={cn(
          'absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10 transition-colors',
          isDark ? 'text-zinc-400' : 'text-muted-foreground'
        )}
      />

      <input
        ref={inputRef}
        value={inputVal}
        onChange={handleInputChange}
        onKeyDown={onKeyDown}
        onFocus={() => {
          if (!googleLoaded && suggestions.length > 0) setShowSuggestions(true);
        }}
        placeholder={placeholder}
        autoComplete="off"
        className={cn(
          'w-full h-11 rounded-xl pl-10 pr-9 font-medium text-xs sm:text-sm outline-none transition-all border',
          isDark
            ? 'bg-white/10 text-white placeholder:text-zinc-400 border-white/15 focus:border-[#D99722] focus:ring-1 focus:ring-[#D99722]/50'
            : 'bg-card text-foreground placeholder:text-muted-foreground border-border focus:border-primary focus:ring-2 focus:ring-primary/20',
          error && 'border-red-500 focus:ring-red-400',
          className
        )}
      />

      {isSearchingFallback && (
        <Loader2 size={14} className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-muted-foreground z-10" />
      )}

      {/* Fallback Autocomplete Suggestions Dropdown */}
      {!googleLoaded && showSuggestions && suggestions.length > 0 && (
        <div
          ref={dropdownRef}
          className={cn(
            'absolute left-0 right-0 top-full mt-1 z-50 rounded-xl shadow-xl border overflow-hidden backdrop-blur-md max-h-60 overflow-y-auto',
            isDark ? 'bg-[#252320]/95 border-white/20 text-white' : 'bg-card/95 border-border text-card-foreground'
          )}
        >
          {suggestions.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelectFallback(item)}
              className={cn(
                'w-full text-left px-3.5 py-2.5 text-xs flex items-start gap-2.5 transition-colors border-b last:border-b-0 cursor-pointer',
                isDark
                  ? 'border-white/10 hover:bg-white/10 text-zinc-200 hover:text-white'
                  : 'border-border/50 hover:bg-accent text-foreground'
              )}
            >
              <Navigation size={13} className="text-[#D99722] shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <p className="font-semibold truncate">{item.display_name.split(',')[0]}</p>
                <p className={cn('text-[10px] truncate', isDark ? 'text-zinc-400' : 'text-muted-foreground')}>
                  {item.display_name}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}