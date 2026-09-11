import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function ServicesTab() {
  const services = [
    { title: "Haircut & Style", price: "$65", duration: "60 min", desc: "Includes wash, cut, and blow-dry to your desired style." },
    { title: "Full Colour", price: "$145", duration: "120 min", desc: "Root to tip colour transformation with toning and treatment." },
    { title: "Highlights", price: "$175", duration: "150 min", desc: "Partial or full highlights with foils, balayage, or ombre techniques." },
    { title: "Blowout", price: "$45", duration: "45 min", desc: "Wash and professional blow-dry styling. No cut included." },
    { title: "Keratin Treatment", price: "$220", duration: "180 min", desc: "Smoothing treatment for frizz-free, glossy hair lasting 3-5 months." },
  ];

  return (
    <div className="space-y-4 animate-in fade-in duration-150">
      {services.map((item, idx) => (
        <div
          key={idx}
          className="bg-card p-5 sm:p-6 rounded-lg border border-border shadow-xs hover:border-primary/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <h3 className="font-title text-base font-bold text-foreground">{item.title}</h3>
            </div>
            <p className="text-xs text-muted-foreground font-normal pl-6">{item.desc}</p>
            <span className="inline-block bg-accent text-foreground text-[10px] px-2.5 py-0.5 rounded ml-6 mt-1 font-medium border border-border/50">
              {item.duration}
            </span>
          </div>

          <div className="flex items-center gap-4 self-end sm:self-center">
            <span className="font-title text-xl font-bold text-primary">{item.price}</span>
            <Link
              href="/book/1"
              className="px-5 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold rounded-lg shadow-sm transition-colors"
            >
              Select
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

