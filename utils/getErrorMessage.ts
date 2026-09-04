import { ApiError } from '@/types';

/**
 * Backend validation errors come back as `data.errorMessages[].message` (Zod),
 * while `data.message` is just a generic label like "Validation Error".
 * Prefer the specific validation message when present.
 */
export const getErrorMessage = (error: ApiError, fallback = 'Something went wrong') => {
  return error?.data?.errorMessages?.[0]?.message || error?.data?.message || fallback;
};
