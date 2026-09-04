import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCardLocation(address?: {
  city?: string
  state?: string
  country?: string
}) {
  if (!address) return ''
  const locationParts = address.city
    ? [address.city, address.country]
    : address.state
      ? [address.state, address.country]
      : [address.country]
  return locationParts.filter(Boolean).join(', ')
}

export function getFullAddress(address?: {
  street?: string
  city?: string
  state?: string
  postalCode?: string
  country?: string
}) {
  if (!address) return ''
  return [address.street, address.city, address.state, address.postalCode, address.country].filter(Boolean).join(', ')
}
