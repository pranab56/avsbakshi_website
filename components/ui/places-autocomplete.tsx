'use client';

import { cn } from '@/lib/utils';
import { MapPin } from 'lucide-react';
import { useRef, useState } from 'react';

export interface PlaceResult {
  address: string;
  lat: number;
  lng: number;
}

interface PhotonFeature {
  geometry: { coordinates: [number, number] };
  properties: {
    name?: string;
    street?: string;
    housenumber?: string;
    city?: string;
    state?: string;
    country?: string;
    postcode?: string;
  };
}

function buildLabel(props: PhotonFeature['properties']): string {
  const parts = [
    props.housenumber && props.street ? `${props.housenumber} ${props.street}` : props.street,
    props.name !== props.street ? props.name : undefined,
    props.city,
    props.state,
    props.country,
  ].filter(Boolean);
  return parts.join(', ');
}

interface PlacesAutocompleteProps {
  placeholder?: string;
  value?: string;
  /** Called when user selects a place from suggestions */
  onPlaceSelectAction: (result: PlaceResult) => void;
  className?: string;
  disabled?: boolean;
  error?: boolean;
}

export function PlacesAutocomplete({
  placeholder = 'Search address...',
  value,
  onPlaceSelectAction,
  className,
  disabled,
  error,
}: PlacesAutocompleteProps) {
  const [inputVal, setInputVal] = useState(() => value ?? '');
  const controlledValue = value ?? inputVal;
  const [suggestions, setSuggestions] = useState<PhotonFeature[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const fetchSuggestions = async (query: string) => {
    if (query.trim().length < 3) {
      setSuggestions([]);
      return;
    }
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();
    setLoading(true);
    try {
      const res = await fetch(
        `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=6&lang=en`,
        { signal: abortRef.current.signal }
      );
      const data = await res.json();
      setSuggestions(data.features ?? []);
      setIsOpen(true);
    } catch {
      // aborted or network error
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputVal(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(val), 350);
  };

  const handleSelect = (feature: PhotonFeature) => {
    const [lng, lat] = feature.geometry.coordinates;
    const address = buildLabel(feature.properties);
    setInputVal(address);
    setSuggestions([]);
    setIsOpen(false);
    onPlaceSelectAction({ address, lat, lng });
  };

  const showDropdown = isOpen && suggestions.length > 0;

  return (
    <div className="relative w-full">
      <div className="relative">
        <MapPin
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-2/60 pointer-events-none z-10"
        />
        <input
          value={controlledValue}
          onChange={handleChange}
          onFocus={() => suggestions.length > 0 && setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 180)}
          disabled={disabled}
          placeholder={placeholder}
          className={cn(
            'w-full h-12 rounded-sm pl-10 pr-10 text-neutral-1 font-medium text-sm outline-none transition-all disabled:opacity-60 border',
            error
              ? 'bg-red-50/30 border-red-400 focus:ring-2 focus:ring-red-200'
              : 'bg-[#F6F6F6] border-transparent focus:ring-2 focus:ring-primary/20',
            className
          )}
          autoComplete="off"
        />
        {loading && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        )}
      </div>

      {showDropdown && (
        <ul className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 rounded-lg shadow-md z-50 max-h-64 overflow-y-auto">
          {suggestions.map((feature, idx) => {
            const label = buildLabel(feature.properties);
            const mainText = feature.properties.name || feature.properties.street || label.split(',')[0];
            const secondaryText = label.replace(`${mainText}, `, '').replace(mainText, '').replace(/^,\s*/, '');
            return (
              <li
                key={idx}
                onMouseDown={() => handleSelect(feature)}
                className="flex items-start gap-3 px-4 py-3 hover:bg-primary/5 cursor-pointer transition-colors border-b border-gray-50 last:border-0"
              >
                <MapPin size={15} className="text-primary mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-neutral-1 truncate">{mainText}</p>
                  {secondaryText && (
                    <p className="text-xs text-neutral-2 opacity-70 truncate">{secondaryText}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
