import { Search } from "lucide-react";
import Input from "../shared/Input";

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Hero({ searchQuery, setSearchQuery }: HeroProps) {
  return (
    <section className="bg-[#181614] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none opacity-20 bg-gradient-to-l from-[#B78735]/30 to-transparent" />

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-6 h-[2px] bg-zinc-400" />
          <span className="text-xs font-semibold text-zinc-300 uppercase tracking-[0.2em]">
            HELP CENTRE
          </span>
        </div>

        <h1 className="font-title text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
          How can we <br />
          <span className="italic font-serif text-[#C48B36] font-normal">
            help you?
          </span>
        </h1>

        <div className="space-y-1 text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed max-w-lg">
          <p>Answers to the most common questions from customers and professionals.</p>
          <p>Can&apos;t find what you need? Our support team is available seven days a week.</p>
        </div>

        {/* Search Input Box */}
        <div className="max-w-md relative mt-2">
          <Input
            variant="dark"
            inputSize="md"
            leftIcon={<Search className="w-4 h-4 text-zinc-400" />}
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </section>
  );
}
