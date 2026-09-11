"use client";

import { ChevronDown } from "lucide-react";

export interface QuestionItem {
  category: string;
  q: string;
  a: string;
}

interface AccordionListProps {
  filteredQuestions: QuestionItem[];
  openIndex: number | null;
  setOpenIndex: (index: number | null) => void;
  searchQuery: string;
}

export default function AccordionList({
  filteredQuestions,
  openIndex,
  setOpenIndex,
  searchQuery,
}: AccordionListProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 sm:p-6 space-y-3 shadow-xs">
      {filteredQuestions.length > 0 ? (
        filteredQuestions.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="border-b border-border last:border-0 pb-3 last:pb-0 transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between text-left py-3 gap-4 cursor-pointer group"
              >
                <span className="font-semibold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">
                  {item.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-primary" : ""
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100 pb-3"
                    : "grid-rows-[0fr] opacity-0 pb-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-relaxed pr-4">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center text-xs text-muted-foreground py-6">
          No questions found matching &ldquo;{searchQuery}&rdquo;.
        </p>
      )}
    </div>
  );
}

