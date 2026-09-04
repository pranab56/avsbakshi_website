'use client';

import { cn } from '@/lib/utils';
import { Check, ChevronDown, Search } from 'lucide-react';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

export interface ComboboxOption {
  value: string;
  label: string;
}

interface ComboboxProps {
  options: ComboboxOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  error?: boolean;
  disabled?: boolean;
  className?: string;
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  searchable = false,
  searchPlaceholder = 'Search...',
  error,
  disabled,
  className,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const selected = options.find((o) => o.value === value);
  const filtered = searchable
    ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()))
    : options;

  return (
    <Popover open={disabled ? false : open} onOpenChange={disabled ? undefined : setOpen}>
      <PopoverTrigger
        disabled={disabled}
        className={cn(
          'h-12 w-full rounded-sm px-4 text-sm font-medium flex items-center justify-between gap-2 outline-none transition-all border',
          disabled
            ? 'bg-gray-100 border-transparent text-neutral-2/40 cursor-not-allowed opacity-60'
            : error
              ? 'bg-red-50/30 border-red-400 cursor-pointer'
              : 'bg-[#F6F6F6] border-transparent hover:border-gray-200 cursor-pointer',
          !disabled && (selected ? 'text-neutral-1' : 'text-neutral-2/60'),
          className
        )}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <ChevronDown
          size={15}
          className={cn('shrink-0 text-neutral-2/60 transition-transform duration-200', open && 'rotate-180')}
        />
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="start"
        sideOffset={4}
        className="w-(--anchor-width) min-w-0 p-0 rounded-sm border border-gray-100 shadow-md overflow-hidden"
      >
        {searchable && (
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-100 bg-gray-50/50">
            <Search size={13} className="text-neutral-2/60 shrink-0" />
            <input
              ref={(el) => { if (el) el.focus({ preventScroll: true }); }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className="flex-1 text-sm outline-none bg-transparent text-neutral-1 font-medium placeholder:text-neutral-2/50"
            />
          </div>
        )}
        <ul className="max-h-52 overflow-y-auto py-1">
          {filtered.map((option) => (
            <li
              key={option.value}
              onMouseDown={() => {
                onChange(option.value);
                setSearch('');
                setOpen(false);
              }}
              className={cn(
                'flex items-center justify-between px-4 py-2.5 text-sm font-medium cursor-pointer transition-colors select-none',
                option.value === value
                  ? 'bg-primary/5 text-primary'
                  : 'text-neutral-1 hover:bg-gray-50'
              )}
            >
              <span>{option.label}</span>
              {option.value === value && <Check size={13} className="text-primary shrink-0" />}
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="px-4 py-3 text-sm text-neutral-2/60 text-center">No results found</li>
          )}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
