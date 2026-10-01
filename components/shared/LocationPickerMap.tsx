"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Search, MapPin, Navigation, Loader2, X } from "lucide-react";

// Fix Leaflet default marker icon in Next.js
const customMarkerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface LocationPickerMapProps {
  lat: number;
  lng: number;
  onLocationSelect: (data: {
    lat: number;
    lng: number;
    line1?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  }) => void;
}

export default function LocationPickerMap({ lat, lng, onLocationSelect }: LocationPickerMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);

  // Reverse geocode function using OpenStreetMap Nominatim API
  const reverseGeocode = async (latitude: number, longitude: number) => {
    setIsGeocoding(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      const address = data?.address || {};

      const line1 =
        address.road ||
        address.pedestrian ||
        address.suburb ||
        address.neighbourhood ||
        address.building ||
        "";
      const city =
        address.city ||
        address.town ||
        address.village ||
        address.county ||
        address.municipality ||
        "";
      const state = address.state || address.region || address.province || "";
      const postalCode = address.postcode || address.postal_code || "";
      const country = address.country || "";

      onLocationSelect({
        lat: latitude,
        lng: longitude,
        line1,
        city,
        state,
        postalCode,
        country,
      });
    } catch (err) {
      console.error("Reverse geocoding error:", err);
      onLocationSelect({ lat: latitude, lng: longitude });
    } finally {
      setIsGeocoding(false);
    }
  };

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const initialLat = lat || 44.0462;
      const initialLng = lng || -122.9785;

      const map = L.map(mapContainerRef.current).setView([initialLat, initialLng], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      const marker = L.marker([initialLat, initialLng], {
        icon: customMarkerIcon,
        draggable: true,
      }).addTo(map);

      marker.on("dragend", () => {
        const position = marker.getLatLng();
        reverseGeocode(position.lat, position.lng);
      });

      map.on("click", (e: L.LeafletMouseEvent) => {
        const { lat: clickLat, lng: clickLng } = e.latlng;
        marker.setLatLng([clickLat, clickLng]);
        reverseGeocode(clickLat, clickLng);
      });

      mapInstanceRef.current = map;
      markerRef.current = marker;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update map when lat/lng props change
  useEffect(() => {
    if (mapInstanceRef.current && markerRef.current && lat && lng) {
      const currentPos = markerRef.current.getLatLng();
      if (Math.abs(currentPos.lat - lat) > 0.0001 || Math.abs(currentPos.lng - lng) > 0.0001) {
        markerRef.current.setLatLng([lat, lng]);
        mapInstanceRef.current.panTo([lat, lng]);
      }
    }
  }, [lat, lng]);

  // Debounced Search Address Location
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&q=${encodeURIComponent(
            searchQuery
          )}&limit=6`
        );
        const data = await res.json();
        setSearchResults(data || []);
      } catch (err) {
        console.error("Location search error:", err);
      } finally {
        setIsSearching(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSelectSearchResult = (result: any) => {
    const selectedLat = parseFloat(result.lat);
    const selectedLng = parseFloat(result.lon);

    if (mapInstanceRef.current && markerRef.current) {
      mapInstanceRef.current.setView([selectedLat, selectedLng], 15);
      markerRef.current.setLatLng([selectedLat, selectedLng]);
    }

    setSearchResults([]);
    setSearchQuery(result.display_name);

    const address = result.address || {};
    const line1 =
      address.road ||
      address.pedestrian ||
      address.suburb ||
      address.neighbourhood ||
      address.building ||
      result.display_name?.split(",")[0] ||
      "";
    const city =
      address.city ||
      address.town ||
      address.village ||
      address.county ||
      address.municipality ||
      address.state_district ||
      "";
    const state = address.state || address.region || address.province || "";
    const postalCode = address.postcode || address.postal_code || "";
    const country = address.country || "";

    onLocationSelect({
      lat: selectedLat,
      lng: selectedLng,
      line1,
      city,
      state,
      postalCode,
      country,
    });
  };

  // Get Current GPS position
  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsGeocoding(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userLat = pos.coords.latitude;
          const userLng = pos.coords.longitude;

          if (mapInstanceRef.current && markerRef.current) {
            mapInstanceRef.current.setView([userLat, userLng], 15);
            markerRef.current.setLatLng([userLat, userLng]);
          }

          reverseGeocode(userLat, userLng);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setIsGeocoding(false);
        }
      );
    }
  };

  return (
    <div className="space-y-3">
      {/* Search Bar & Current Location Controls */}
      <div className="relative flex flex-col sm:flex-row items-center gap-2">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search location (e.g. Rampura, Dhaka)..."
            className="w-full bg-accent/60 border border-border rounded-xl pl-10 pr-9 py-2.5 text-xs text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSearchResults([]);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Search Suggestions Dropdown */}
          {(searchResults.length > 0 || isSearching) && searchQuery.length >= 2 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-2xl z-[1000] max-h-64 overflow-y-auto divide-y divide-border">
              {isSearching ? (
                <div className="p-3 text-xs text-muted-foreground flex items-center justify-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
                  <span>Searching location suggestions...</span>
                </div>
              ) : (
                searchResults.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectSearchResult(item)}
                    className="w-full text-left p-3 text-xs hover:bg-primary/10 transition-colors flex items-start gap-2.5 cursor-pointer group"
                  >
                    <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <div className="flex flex-col">
                      <span className="font-semibold text-foreground leading-tight">
                        {item.display_name.split(",")[0]}
                      </span>
                      <span className="text-[11px] text-muted-foreground leading-snug line-clamp-1 mt-0.5">
                        {item.display_name}
                      </span>
                    </div>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {/* <button
          type="button"
          onClick={handleUseCurrentLocation}
          className="w-full sm:w-auto bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors shrink-0 cursor-pointer shadow-xs"
        >
          {isGeocoding ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Navigation className="w-4 h-4" />
          )}
          <span>My Location</span>
        </button> */}
      </div>

      {/* Leaflet Map Container */}
      <div className="relative rounded-2xl overflow-hidden border border-border shadow-md h-[260px] sm:h-[300px] w-full z-0">
        <div ref={mapContainerRef} className="w-full h-full" />
        {isGeocoding && (
          <div className="absolute inset-0 bg-background/50 backdrop-blur-xs flex items-center justify-center z-[500]">
            <div className="bg-card border border-border px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-xs font-medium text-foreground">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              <span>Updating address details...</span>
            </div>
          </div>
        )}
      </div>

      <p className="text-[11px] text-muted-foreground italic flex items-center gap-1">
        <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
        Click anywhere on the map or drag the marker to pick a location &amp; auto-fill address fields.
      </p>
    </div>
  );
}
