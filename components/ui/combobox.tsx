'use client';

import { cn } from '@/lib/utils';
import { Check, ChevronDown, Search } from 'lucide-react';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

export interface ComboboxOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
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
  triggerClassName?: string;
  contentClassName?: string;
  prefix?: React.ReactNode;
  align?: 'start' | 'center' | 'end';
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
  triggerClassName,
  contentClassName,
  prefix,
  align = 'end',
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const selected = options.find((o) => o.value === value);
  const filtered = searchable
    ? options.filter(
        (o) =>
          o.label.toLowerCase().includes(search.toLowerCase()) ||
          (o.description && o.description.toLowerCase().includes(search.toLowerCase()))
      )
    : options;

  const SelectedIcon = selected?.icon;

  return (
    <Popover open={disabled ? false : open} onOpenChange={disabled ? undefined : setOpen}>
      <PopoverTrigger
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-between gap-2.5 outline-none transition-all cursor-pointer border select-none',
          triggerClassName ||
            cn(
              'h-11 w-full rounded-lg px-3.5 text-sm font-medium',
              disabled
                ? 'bg-muted text-muted-foreground/50 cursor-not-allowed border-transparent opacity-60'
                : error
                  ? 'bg-destructive/10 border-destructive text-foreground'
                  : 'bg-card border-border hover:bg-accent text-foreground'
            ),
          className
        )}
      >
        <div className="flex items-center gap-2 truncate">
          {prefix}
          {SelectedIcon && <SelectedIcon className="w-4 h-4 text-primary shrink-0" />}
          <span className="truncate">{selected ? selected.label : placeholder}</span>
        </div>
        <ChevronDown
          className={cn(
            'w-3.5 h-3.5 shrink-0 transition-transform duration-200 opacity-70',
            open && 'rotate-180'
          )}
        />
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align={align}
        sideOffset={6}
        className={cn(
          'w-auto min-w-[180px] max-w-[320px] p-0 rounded-xl border border-border bg-popover text-popover-foreground shadow-xl overflow-hidden z-50',
          contentClassName
        )}
      >
        {searchable && (
          <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-accent/30">
            <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <input
              ref={(el) => {
                if (el) el.focus({ preventScroll: true });
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className="flex-1 text-xs outline-none bg-transparent text-foreground font-medium placeholder:text-muted-foreground"
            />
          </div>
        )}
        <ul className="max-h-60 overflow-y-auto py-1">
          {filtered.map((option) => {
            const Icon = option.icon;
            const isSelected = option.value === value;
            return (
              <li
                key={option.value}
                onMouseDown={(e) => {
                  e.preventDefault();
                  onChange(option.value);
                  setSearch('');
                  setOpen(false);
                }}
                className={cn(
                  'flex items-center justify-between px-3.5 py-2.5 text-xs font-medium cursor-pointer transition-colors select-none gap-3',
                  isSelected
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-popover-foreground hover:bg-accent'
                )}
              >
                <div className="flex items-center gap-2.5 truncate">
                  {Icon && (
                    <Icon
                      className={cn(
                        'w-4 h-4 shrink-0',
                        isSelected ? 'text-primary' : 'text-muted-foreground'
                      )}
                    />
                  )}
                  <div className="flex flex-col text-left truncate">
                    <span className="truncate">{option.label}</span>
                    {option.description && (
                      <span className="text-[10px] text-muted-foreground font-normal truncate">
                        {option.description}
                      </span>
                    )}
                  </div>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-primary shrink-0 ml-auto" />}
              </li>
            );
          })}
          {filtered.length === 0 && (
            <li className="px-4 py-3 text-xs text-muted-foreground text-center">No results found</li>
          )}
        </ul>
      </PopoverContent>
    </Popover>
  );
}

