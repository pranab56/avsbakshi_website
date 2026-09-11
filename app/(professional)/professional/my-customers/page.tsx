"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Star } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  avatar: string;
  visits: number;
  totalSpent: string;
  lastVisit: string;
  rating: number;
}

const SAMPLE_CUSTOMERS: Customer[] = [
  {
    id: "1",
    name: "Rachel Thompson",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=150&q=80",
    visits: 9,
    totalSpent: "$1,035",
    lastVisit: "Aug 12",
    rating: 5,
  },
  {
    id: "2",
    name: "Marcus Johnson",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    visits: 6,
    totalSpent: "$720",
    lastVisit: "Aug 8",
    rating: 5,
  },
  {
    id: "3",
    name: "Ashley Morgan",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=150&q=80",
    visits: 12,
    totalSpent: "$1,440",
    lastVisit: "Aug 15",
    rating: 5,
  },
  {
    id: "4",
    name: "James Holloway",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    visits: 4,
    totalSpent: "$480",
    lastVisit: "Jul 30",
    rating: 4,
  },
  {
    id: "5",
    name: "Priya Daniels",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=150&q=80",
    visits: 7,
    totalSpent: "$840",
    lastVisit: "Aug 10",
    rating: 5,
  },
  {
    id: "6",
    name: "Tyler Brooks",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    visits: 3,
    totalSpent: "$285",
    lastVisit: "Aug 1",
    rating: 4,
  },
  {
    id: "7",
    name: "Samantha Reed",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    visits: 11,
    totalSpent: "$1,210",
    lastVisit: "Aug 14",
    rating: 5,
  },
  {
    id: "8",
    name: "Kevin Martinez",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
    visits: 5,
    totalSpent: "$550",
    lastVisit: "Aug 5",
    rating: 5,
  },
  {
    id: "9",
    name: "Olivia Grant",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    visits: 8,
    totalSpent: "$960",
    lastVisit: "Aug 13",
    rating: 5,
  },
];


export default function ProfessionalMyCustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCustomers = SAMPLE_CUSTOMERS.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-16">
      {/* Header Section */}
      <div className="space-y-1">
        <h1 className="font-serif italic font-normal text-3xl sm:text-4xl text-foreground">
          My Customers
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground font-normal tracking-wide">
          6 clients
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="relative max-w-full">
        <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search salons..."
          className="w-full bg-accent border border-border rounded-md pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      {/* Customers Table Card Container */}
      <div className="bg-card border border-border rounded-lg overflow-hidden shadow-xs">
        {/* Table Header (Desktop) */}
        <div className="bg-accent px-6 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border hidden md:grid grid-cols-12 items-center">
          <div className="col-span-4">CLIENT</div>
          <div className="col-span-2">VISITS</div>
          <div className="col-span-3">TOTAL SPENT</div>
          <div className="col-span-3">LAST VISIT</div>
        </div>

        {/* Table Rows List */}
        <div className="divide-y divide-border">
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                className="px-6 py-4 grid grid-cols-1 md:grid-cols-12 items-center gap-3 md:gap-0 text-sm hover:bg-accent/50 transition-colors"
              >
                {/* Client Info */}
                <div className="col-span-4 flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-md overflow-hidden bg-accent shrink-0 border border-border">
                    <Image
                      src={customer.avatar}
                      alt={customer.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <span className="font-semibold text-foreground text-sm">
                    {customer.name}
                  </span>
                </div>

                {/* Visits */}
                <div className="col-span-2 text-foreground font-normal text-xs sm:text-sm">
                  <span className="md:hidden text-xs text-muted-foreground block font-normal">
                    Visits:
                  </span>
                  {customer.visits}
                </div>

                {/* Total Spent */}
                <div className="col-span-3 text-foreground font-normal text-xs sm:text-sm">
                  <span className="md:hidden text-xs text-muted-foreground block font-normal">
                    Total Spent:
                  </span>
                  {customer.totalSpent}
                </div>

                {/* Last Visit & Star Rating */}
                <div className="col-span-3 flex items-center justify-between pr-2">
                  <span className="text-foreground font-normal text-xs sm:text-sm">
                    <span className="md:hidden text-xs text-muted-foreground block font-normal">
                      Last Visit:
                    </span>
                    {customer.lastVisit}
                  </span>

                  <div className="flex items-center gap-0.5 text-primary">
                    {[...Array(customer.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-primary text-primary"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-muted-foreground text-sm italic">
              No clients found matching &quot;{searchQuery}&quot;.
            </div>
          )}
        </div>
      </div>

      {/* Pagination Bar */}
      <div className="pt-4 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm">
        <button
          type="button"
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className="px-3 py-1.5 text-muted-foreground hover:text-foreground font-medium transition-colors cursor-pointer mr-2"
        >
          Prev
        </button>

        {/* Page Circles */}
        {[
          { num: 1, label: "01" },
          { num: 2, label: "02" },
          { num: 3, label: "03" },
          { num: 4, label: "04" },
          { num: 5, label: "05" },
        ].map((p) => (
          <button
            key={p.num}
            type="button"
            onClick={() => setCurrentPage(p.num)}
            className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium transition-all cursor-pointer ${
              currentPage === p.num
                ? "bg-primary text-primary-foreground shadow-2xs"
                : "bg-accent text-muted-foreground hover:bg-accent/80 hover:text-foreground"
            }`}
          >
            {p.label}
          </button>
        ))}

        <span className="w-9 h-9 rounded-full bg-accent text-muted-foreground flex items-center justify-center text-xs font-medium">
          ...
        </span>

        <button
          type="button"
          onClick={() => setCurrentPage(24)}
          className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium transition-all cursor-pointer ${
            currentPage === 24
              ? "bg-primary text-primary-foreground shadow-2xs"
              : "bg-accent text-muted-foreground hover:bg-accent/80 hover:text-foreground"
          }`}
        >
          24
        </button>

        <button
          type="button"
          onClick={() => setCurrentPage((p) => Math.min(p + 1, 24))}
          className="px-3 py-1.5 text-primary hover:underline font-medium transition-colors cursor-pointer ml-2"
        >
          Next
        </button>
      </div>
    </div>
  );
}
