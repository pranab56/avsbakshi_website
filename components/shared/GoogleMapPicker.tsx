"use client";

import { useEffect, useRef, useState } from "react";
import { importLibrary, setOptions } from "@googlemaps/js-api-loader";
import { MapPin, Loader2, Navigation, X } from "lucide-react";
import { envConfig } from "@/envConfig";

export interface GoogleLocationData {
  lat: number;
  lng: number;
  line1: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface GoogleMapPickerProps {
  lat: number;
  lng: number;
  addressLine1?: string;
  onLocationSelect: (data: GoogleLocationData) => void;
}

let googleOptionsInitialized = false;

export default function GoogleMapPicker({
  lat,
  lng,
  addressLine1 = "",
  onLocationSelect,
}: GoogleMapPickerProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  const [apiKey, setApiKey] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>(addressLine1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isGeocoding, setIsGeocoding] = useState<boolean>(false);

  // Sync searchQuery when addressLine1 prop changes externally (e.g. from API response)
  useEffect(() => {
    if (addressLine1) {
      setSearchQuery(addressLine1);
    }
  }, [addressLine1]);

  useEffect(() => {
    const getApiKey = async () => {
      const config = await envConfig();
      setApiKey(config.googleMapsApiKey || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "");
    };
    getApiKey();
  }, []);

  const extractAddressComponents = (place: google.maps.places.PlaceResult | google.maps.GeocoderResult) => {
    const components = place.address_components || [];
    let streetNumber = "";
    let route = "";
    let city = "";
    let state = "";
    let postalCode = "";
    let country = "";

    components.forEach((c) => {
      const types = c.types;
      if (types.includes("street_number")) streetNumber = c.long_name;
      if (types.includes("route")) route = c.long_name;
      if (types.includes("locality") || types.includes("sublocality") || types.includes("postal_town")) city = c.long_name;
      if (types.includes("administrative_area_level_1")) state = c.long_name;
      if (types.includes("postal_code")) postalCode = c.long_name;
      if (types.includes("country")) country = c.long_name;
    });

    const line1 = place.formatted_address || [streetNumber, route].filter(Boolean).join(" ") || searchQuery;
    if (!city) {
      city = components.find(c => c.types.includes("administrative_area_level_2"))?.long_name || "";
    }

    return { line1, city, state, postalCode, country };
  };

  const reverseGeocode = (latitude: number, longitude: number) => {
    if (!window.google?.maps?.Geocoder) return;
    setIsGeocoding(true);
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
      setIsGeocoding(false);
      if (status === "OK" && results && results[0]) {
        const place = results[0];
        const { line1, city, state, postalCode, country } = extractAddressComponents(place);
        setSearchQuery(place.formatted_address || line1);
        onLocationSelect({
          lat: latitude,
          lng: longitude,
          line1,
          city,
          state,
          postalCode,
          country,
        });
      } else {
        onLocationSelect({
          lat: latitude,
          lng: longitude,
          line1: searchQuery || "Selected Location",
          city: "",
          state: "",
          postalCode: "",
          country: "",
        });
      }
    });
  };

  useEffect(() => {
    if (!apiKey || !mapContainerRef.current) return;

    if (!googleOptionsInitialized) {
      setOptions({ key: apiKey, v: "weekly" });
      googleOptionsInitialized = true;
    }

    Promise.all([importLibrary("maps"), importLibrary("places")])
      .then(([{ Map }, { Autocomplete }]) => {
        if (!mapContainerRef.current) return;

        const initialLat = lat || 23.7612; // Default Rampura, Dhaka
        const initialLng = lng || 90.4194;

        const map = new Map(mapContainerRef.current, {
          center: { lat: initialLat, lng: initialLng },
          zoom: 14,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          styles: [
            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
            { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] },
          ],
        });

        const marker = new google.maps.Marker({
          position: { lat: initialLat, lng: initialLng },
          map,
          draggable: true,
          animation: google.maps.Animation.DROP,
        });

        mapRef.current = map;
        markerRef.current = marker;
        setIsLoading(false);

        // If no initial addressLine1 text was provided, reverse geocode to fill location name in search input
        if (!addressLine1 && initialLat && initialLng) {
          reverseGeocode(initialLat, initialLng);
        }

        // Marker dragend event
        marker.addListener("dragend", () => {
          const pos = marker.getPosition();
          if (pos) {
            reverseGeocode(pos.lat(), pos.lng());
          }
        });

        // Map click event
        map.addListener("click", (e: google.maps.MapMouseEvent) => {
          if (e.latLng) {
            marker.setPosition(e.latLng);
            reverseGeocode(e.latLng.lat(), e.latLng.lng());
          }
        });

        // Google Places Autocomplete
        if (inputRef.current) {
          const autocomplete = new Autocomplete(inputRef.current, {
            fields: ["formatted_address", "geometry", "address_components"],
          });

          autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            if (!place.geometry?.location) return;

            const selectedLat = place.geometry.location.lat();
            const selectedLng = place.geometry.location.lng();

            map.setCenter({ lat: selectedLat, lng: selectedLng });
            map.setZoom(16);
            marker.setPosition({ lat: selectedLat, lng: selectedLng });

            const { line1, city, state, postalCode, country } = extractAddressComponents(place);
            setSearchQuery(place.formatted_address || line1);

            onLocationSelect({
              lat: selectedLat,
              lng: selectedLng,
              line1,
              city,
              state,
              postalCode,
              country,
            });
          });
        }
      })
      .catch((err) => {
        console.error("Failed to load Google Maps JS API:", err);
        setIsLoading(false);
      });
  }, [apiKey]);

  // Sync marker when props change externally
  useEffect(() => {
    if (mapRef.current && markerRef.current && lat && lng) {
      const currentPos = markerRef.current.getPosition();
      if (!currentPos || Math.abs(currentPos.lat() - lat) > 0.0001 || Math.abs(currentPos.lng() - lng) > 0.0001) {
        const newPos = { lat, lng };
        markerRef.current.setPosition(newPos);
        mapRef.current.panTo(newPos);
      }
    }
  }, [lat, lng]);

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsGeocoding(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userLat = pos.coords.latitude;
          const userLng = pos.coords.longitude;
          if (mapRef.current && markerRef.current) {
            mapRef.current.setCenter({ lat: userLat, lng: userLng });
            mapRef.current.setZoom(16);
            markerRef.current.setPosition({ lat: userLat, lng: userLng });
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
      {/* Search Input Box */}
      <div className="relative flex flex-col sm:flex-row items-center gap-2">
        <div className="relative flex-1 w-full">
          <MapPin className="w-4 h-4 text-primary absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search address or location"
            className="w-full bg-accent/60 border border-border rounded-xl pl-10 pr-9 py-3 text-xs sm:text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-xs transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer z-10"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* <button
          type="button"
          onClick={handleUseCurrentLocation}
          className="w-full sm:w-auto bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 text-xs font-semibold px-4 py-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors shrink-0 cursor-pointer shadow-xs"
        >
          {isGeocoding ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Navigation className="w-4 h-4" />
          )}
          <span>My Location</span>
        </button> */}
      </div>

      {/* Google Map Canvas */}
      <div className="relative rounded-2xl overflow-hidden border border-border shadow-md h-[300px] sm:h-[360px] w-full bg-accent/30">
        <div ref={mapContainerRef} className="w-full h-full" />
        {(isLoading || isGeocoding) && (
          <div className="absolute inset-0 bg-background/60 backdrop-blur-xs flex items-center justify-center z-20">
            <div className="bg-card border border-border px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 text-xs font-medium text-foreground">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              <span>{isLoading ? "Loading Google Map..." : "Fetching location details..."}</span>
            </div>
          </div>
        )}
      </div>

      <p className="text-[11px] text-muted-foreground italic flex items-center gap-1">
        <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
        Click anywhere on the map or drag the marker to pinpoint your salon location.
      </p>
    </div>
  );
}
