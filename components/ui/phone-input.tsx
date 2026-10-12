'use client';

import React from 'react';
import PhoneInputWithCountry, { Country } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { cn } from '@/lib/utils';

export interface PhoneInputProps {
  value?: string;
  onChange: (value?: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  defaultCountry?: Country;
  name?: string;
}

export function PhoneInput({
  value,
  onChange,
  placeholder = 'Enter phone number',
  disabled = false,
  error = false,
  className,
  defaultCountry = 'GB',
  name,
}: PhoneInputProps) {
  return (
    <div className={cn('relative w-full', className)}>
      <PhoneInputWithCountry
        international
        defaultCountry={defaultCountry}
        name={name}
        value={value || undefined}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={cn(
          'flex items-center gap-2 w-full text-sm font-medium',
          disabled && 'opacity-60 cursor-not-allowed'
        )}
        numberInputProps={{
          className: cn(
            'flex-1 w-full h-12 px-3.5 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 bg-card text-foreground',
            error
              ? 'border-destructive bg-destructive/10 focus:ring-destructive/30 text-destructive'
              : 'border-border focus:border-primary focus:ring-primary/20'
          ),
        }}
        countrySelectProps={{
          className: cn(
            'h-12 px-2.5 rounded-xl border border-border bg-card text-foreground text-xs font-semibold cursor-pointer outline-none hover:bg-accent/40 transition-colors',
            error && 'border-destructive'
          ),
        }}
      />
    </div>
  );
}

export default PhoneInput;
