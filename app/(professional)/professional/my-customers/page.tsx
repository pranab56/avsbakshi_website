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
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    visits: 9,
    totalSpent: "£1035",
    lastVisit: "12 Aug",
    rating: 5,
  },
  {
    id: "2",
    name: "Rachel Thompson",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    visits: 9,
    totalSpent: "£1035",
    lastVisit: "12 Aug",
    rating: 5,
  },
  {
    id: "3",
    name: "Rachel Thompson",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    visits: 9,
    totalSpent: "£1035",
    lastVisit: "12 Aug",
    rating: 5,
  },
  {
    id: "4",
    name: "Rachel Thompson",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    visits: 9,
    totalSpent: "£1035",
    lastVisit: "12 Aug",
    rating: 5,
  },
  {
    id: "5",
    name: "Rachel Thompson",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    visits: 9,
    totalSpent: "£1035",
    lastVisit: "12 Aug",
    rating: 5,
  },
  {
    id: "6",
    name: "Rachel Thompson",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    visits: 9,
    totalSpent: "£1035",
    lastVisit: "12 Aug",
    rating: 5,
  },
  {
    id: "7",
    name: "Rachel Thompson",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    visits: 9,
    totalSpent: "£1035",
    lastVisit: "12 Aug",
    rating: 5,
  },
  {
    id: "8",
    name: "Rachel Thompson",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    visits: 9,
    totalSpent: "£1035",
    lastVisit: "12 Aug",
    rating: 5,
  },
  {
    id: "9",
    name: "Rachel Thompson",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    visits: 9,
    totalSpent: "£1035",
    lastVisit: "12 Aug",
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
        <h1 className="font-serif italic font-normal text-3xl sm:text-4xl text-[#2C2E33]">
          My Customers
        </h1>
        <p className="text-xs sm:text-sm text-[#787570] font-normal tracking-wide">
          6 clients
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="relative max-w-full">
        <Search className="w-4 h-4 text-[#787570] absolute left-3.5 top-3 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search salons..."
          className="w-full bg-[#EBE7DF]/70 border border-[#E3DDD3] rounded-md pl-10 pr-4 py-2.5 text-sm text-[#2C2E33] placeholder-[#787570] focus:outline-none focus:border-[#B78735] transition-colors"
        />
      </div>

      {/* Customers Table Card Container */}
      <div className="bg-white border border-[#E3DDD3]/70 rounded-lg overflow-hidden shadow-xs">
        {/* Table Header (Desktop) */}
        <div className="bg-[#E8E4DD]/80 px-6 py-3.5 text-xs font-semibold text-[#787570] uppercase tracking-wider border-b border-[#E3DDD3]/70 hidden md:grid grid-cols-12 items-center">
          <div className="col-span-4">CLIENT</div>
          <div className="col-span-2">VISITS</div>
          <div className="col-span-3">TOTAL SPENT</div>
          <div className="col-span-3">LAST VISIT</div>
        </div>

        {/* Table Rows List */}
        <div className="divide-y divide-[#E3DDD3]/60">
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                className="px-6 py-4 grid grid-cols-1 md:grid-cols-12 items-center gap-3 md:gap-0 text-sm hover:bg-[#FAF8F4] transition-colors"
              >
                {/* Client Info */}
                <div className="col-span-4 flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-md overflow-hidden bg-[#E0D9CE] shrink-0 border border-[#E3DDD3]/70">
                    <Image
                      src={customer.avatar}
                      alt={customer.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <span className="font-semibold text-[#2C2E33] text-sm">
                    {customer.name}
                  </span>
                </div>

                {/* Visits */}
                <div className="col-span-2 text-[#2C2E33] font-normal text-xs sm:text-sm">
                  <span className="md:hidden text-xs text-[#787570] block font-normal">
                    Visits:
                  </span>
                  {customer.visits}
                </div>

                {/* Total Spent */}
                <div className="col-span-3 text-[#2C2E33] font-normal text-xs sm:text-sm">
                  <span className="md:hidden text-xs text-[#787570] block font-normal">
                    Total Spent:
                  </span>
                  {customer.totalSpent}
                </div>

                {/* Last Visit & Star Rating */}
                <div className="col-span-3 flex items-center justify-between pr-2">
                  <span className="text-[#2C2E33] font-normal text-xs sm:text-sm">
                    <span className="md:hidden text-xs text-[#787570] block font-normal">
                      Last Visit:
                    </span>
                    {customer.lastVisit}
                  </span>

                  <div className="flex items-center gap-0.5 text-[#B78735]">
                    {[...Array(customer.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-[#B78735] text-[#B78735]"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-[#787570] text-sm italic">
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
          className="px-3 py-1.5 text-[#5C5954] hover:text-[#2C2E33] font-medium transition-colors cursor-pointer mr-2"
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
                ? "bg-[#B78735] text-white shadow-2xs"
                : "bg-[#E8E4DD] text-[#787570] hover:bg-[#DCD5C9] hover:text-[#2C2E33]"
            }`}
          >
            {p.label}
          </button>
        ))}

        <span className="w-9 h-9 rounded-full bg-[#E8E4DD] text-[#787570] flex items-center justify-center text-xs font-medium">
          ...
        </span>

        <button
          type="button"
          onClick={() => setCurrentPage(24)}
          className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium transition-all cursor-pointer ${
            currentPage === 24
              ? "bg-[#B78735] text-white shadow-2xs"
              : "bg-[#E8E4DD] text-[#787570] hover:bg-[#DCD5C9] hover:text-[#2C2E33]"
          }`}
        >
          24
        </button>

        <button
          type="button"
          onClick={() => setCurrentPage((p) => Math.min(p + 1, 24))}
          className="px-3 py-1.5 text-[#B78735] hover:underline font-medium transition-colors cursor-pointer ml-2"
        >
          Next
        </button>
      </div>
    </div>
  );
}
