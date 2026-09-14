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
  align = 'start',
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
    <Popover modal={false} open={disabled ? false : open} onOpenChange={disabled ? undefined : setOpen}>
      <PopoverTrigger
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-between gap-3 outline-none transition-all duration-200 cursor-pointer border select-none',
          triggerClassName ||
          cn(
            'h-14 w-full rounded-lg px-3.5 py-2.5 text-sm font-medium',
            disabled
              ? 'bg-muted text-muted-foreground/50 cursor-not-allowed border-transparent opacity-60'
              : error
                ? 'bg-destructive/10 border-destructive text-foreground'
                : 'bg-card border-border hover:border-primary/50 hover:bg-accent/40 text-foreground shadow-2xs'
          ),
          className
        )}
      >
        <div className="flex items-center gap-3 truncate text-left">
          {prefix}
          {SelectedIcon && (
            <div className="w-8 h-8 rounded-lg bg-primary/15 text-primary flex items-center justify-center shrink-0 shadow-2xs">
              <SelectedIcon className="w-4 h-4" />
            </div>
          )}
          <div className="flex flex-col text-left truncate">
            <span className="font-bold text-xs sm:text-sm truncate leading-tight">
              {selected ? selected.label : placeholder}
            </span>
            {selected?.description && (
              <span className="text-[11px] opacity-80 font-medium truncate mt-0.5">
                {selected.description}
              </span>
            )}
          </div>
        </div>
        <ChevronDown
          className={cn(
            'w-4 h-4 shrink-0 transition-transform duration-300 ease-out opacity-70',
            open && 'rotate-180 text-primary opacity-100'
          )}
        />
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align={align}
        sideOffset={6}
        className={cn(
          'w-[var(--anchor-width)] min-w-[200px] p-1.5 rounded-lg border border-border/80 bg-card/95 backdrop-blur-xl text-popover-foreground shadow-2xl overflow-hidden z-50 animate-in fade-in-0 slide-in-from-top-2 duration-200',
          contentClassName
        )}
      >
        {searchable && (
          <div className="flex items-center gap-2 px-3 py-2 border-b border-border/60 bg-accent/40 rounded-lg mb-1">
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
        <ul className="max-h-64 overflow-y-auto space-y-1 py-0.5">
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
                  'flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-150 select-none gap-3 group',
                  isSelected
                    ? 'bg-primary/15 text-primary border border-primary/30 shadow-2xs font-bold'
                    : 'text-foreground hover:bg-accent/70'
                )}
              >
                <div className="flex items-center gap-3 truncate">
                  {Icon && (
                    <div
                      className={cn(
                        'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors',
                        isSelected
                          ? 'bg-primary text-primary-foreground shadow-2xs'
                          : 'bg-accent text-muted-foreground group-hover:bg-primary/15 group-hover:text-primary'
                      )}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  )}
                  <div className="flex flex-col text-left truncate">
                    <span className={cn('truncate font-bold text-xs', isSelected ? 'text-primary' : 'text-foreground')}>
                      {option.label}
                    </span>
                    {option.description && (
                      <span className="text-[11px] text-muted-foreground font-medium truncate mt-0.5">
                        {option.description}
                      </span>
                    )}
                  </div>
                </div>
                {isSelected && <Check className="w-4 h-4 text-primary shrink-0 ml-auto" />}
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

