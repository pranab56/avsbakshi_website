"use server";

export const envConfig = async () => {
  return {
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || process.env.NEXT_GOOGLE_PUBLIC_MAPS_API_KEY,
  };
}