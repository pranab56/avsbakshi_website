"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Plus, Check, Edit2, Power, ChevronDown, Upload, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Service {
  id: string;
  name: string;
  description: string;
  duration: string; // e.g. "120 min"
  price: string; // e.g. "£145"
  active: boolean;
  image?: string;
}

const INITIAL_SERVICES: Service[] = [
  {
    id: "1",
    name: "Haircut & Style",
    description: "Includes wash, cut, and blow-dry.",
    duration: "120 min",
    price: "£145",
    active: true,
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=400",
  },
  {
    id: "2",
    name: "Full Colour",
    description: "Root-to-tip colour with toning and treatment.",
    duration: "120 min",
    price: "£145",
    active: true,
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=400",
  },
  {
    id: "3",
    name: "Balayage & Toner",
    description: "Hand-painted colour with toner for a lived-in look.",
    duration: "120 min",
    price: "£145",
    active: true,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=400",
  },
  {
    id: "4",
    name: "Highlights",
    description: "Foils, balayage, or ombre techniques.",
    duration: "120 min",
    price: "£145",
    active: true,
  },
  {
    id: "5",
    name: "Blowout",
    description: "Wash and professional blow-dry. No cut.",
    duration: "120 min",
    price: "£145",
    active: true,
  },
  {
    id: "6",
    name: "Keratin Treatment",
    description: "Smoothing treatment lasting 3–5 months.",
    duration: "120 min",
    price: "£145",
    active: true,
  },
];

const DURATION_OPTIONS = [
  "30 min",
  "45 min",
  "60 min",
  "90 min",
  "120 min",
  "150 min",
  "180 min",
];

export default function ProfessionalServicesPage() {
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);

  // Form State
  const [form, setForm] = useState({
    name: "",
    description: "",
    duration: "60 min",
    price: "65",
    image: "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const activeServicesCount = services.filter((s) => s.active).length;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setForm((prev) => ({ ...prev, image: url }));
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setForm((prev) => ({ ...prev, image: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleOpenAdd = () => {
    setForm({
      name: "",
      description: "",
      duration: "60 min",
      price: "65",
      image: "",
    });
    setImagePreview(null);
    setEditingServiceId(null);
    setModalMode("add");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (service: Service) => {
    setForm({
      name: service.name,
      description: service.description,
      duration: service.duration,
      price: service.price.replace("£", ""),
      image: service.image || "",
    });
    setImagePreview(service.image || null);
    setEditingServiceId(service.id);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const toggleServiceActive = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    if (modalMode === "add") {
      const newService: Service = {
        id: Date.now().toString(),
        name: form.name,
        description: form.description,
        duration: form.duration,
        price: `£${form.price || "65"}`,
        active: true,
        image: form.image,
      };
      setServices((prev) => [newService, ...prev]);
    } else if (modalMode === "edit" && editingServiceId) {
      setServices((prev) =>
        prev.map((s) =>
          s.id === editingServiceId
            ? {
                ...s,
                name: form.name,
                description: form.description,
                duration: form.duration,
                price: `£${form.price || "65"}`,
                image: form.image,
              }
            : s
        )
      );
    }

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setIsModalOpen(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs sm:text-sm text-[#787570] font-normal tracking-wide">
            {activeServicesCount} active services
          </p>
          <h1 className="font-serif italic font-normal text-3xl sm:text-4xl text-[#2C2E33]">
            Services
          </h1>
        </div>

        <div>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-4 py-2.5 rounded-sm bg-[#B78735] hover:bg-[#8F6929] text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer flex items-center gap-2 shadow-xs active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Add Service</span>
          </button>
        </div>
      </div>

      {/* Services Stacked Card List */}
      <div className="space-y-4 pt-2">
        {services.map((service) => (
          <div
            key={service.id}
            className={`bg-white border border-[#E3DDD3]/70 rounded-lg p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs transition-colors ${
              service.active
                ? "hover:border-[#B78735]/40"
                : "opacity-60 bg-[#FAF8F4]"
            }`}
          >
            {/* Left Service Info + Image Thumbnail */}
            <div className="flex items-start gap-4 max-w-xl">
              {service.image && (
                <div className="relative w-20 h-20 rounded-md overflow-hidden bg-[#FAF8F4] border border-[#E3DDD3]/70 shrink-0">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-lg sm:text-xl text-[#2C2E33]">
                  {service.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#787570] font-normal leading-relaxed">
                  {service.description}
                </p>
                <div className="pt-2">
                  <span className="px-3 py-1 bg-[#FAF8F4] border border-[#E3DDD3]/70 text-[#787570] text-xs font-medium rounded-full">
                    {service.duration}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Price & Actions */}
            <div className="flex items-center gap-4 sm:gap-6 justify-between sm:justify-end shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E3DDD3]/40">
              <div className="font-serif italic font-normal text-2xl sm:text-3xl text-[#2C2E33] pr-2">
                {service.price}
              </div>

              <button
                type="button"
                onClick={() => handleOpenEdit(service)}
                className="px-4 py-2 rounded-sm bg-[#E2DDD3] hover:bg-[#D5CEBF] text-[#2C2E33] text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Edit2 className="w-3.5 h-3.5 text-[#2C2E33]" />
                <span>Edit</span>
              </button>

              <button
                type="button"
                onClick={() => toggleServiceActive(service.id)}
                className={`px-4 py-2 rounded-sm text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  service.active
                    ? "border border-[#E0A8A8] bg-[#FDF2F2] hover:bg-[#FBE4E4] text-[#C54A4A]"
                    : "border border-[#C5E1CA] bg-[#E8F3EA] hover:bg-[#D8EBDC] text-[#2E6B38]"
                }`}
              >
                <Power className="w-3.5 h-3.5" />
                <span>{service.active ? "Deactivate" : "Activate"}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* SHADCN DIALOG MODAL FOR ADD / EDIT SERVICE                        */}
      {/* ----------------------------------------------------------------- */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-xl bg-white border border-[#E3DDD3] p-6 sm:p-8 rounded-lg shadow-lg">
          <DialogHeader className="text-left space-y-1 pb-2">
            <DialogTitle className="font-serif font-bold text-xl sm:text-2xl text-[#2C2E33]">
              {modalMode === "add" ? "Create Service" : "Edit Service Details"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5 pt-2">
            {/* Field 1: Service Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C2E33] block">
                Service Name <span className="text-[#C54A4A]">*</span>
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Balayage & Toner"
                className="w-full bg-[#FAF8F4] border border-[#E3DDD3]/70 rounded-sm px-4 py-3 text-sm text-[#2C2E33] outline-none focus:ring-1 focus:ring-[#B78735] placeholder-[#A09D96]"
              />
            </div>

            {/* Field 2: Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C2E33] block">
                Description <span className="text-[#C54A4A]">*</span>
              </label>
              <textarea
                rows={3}
                required
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Describe what is included..."
                className="w-full bg-[#FAF8F4] border border-[#E3DDD3]/70 rounded-sm px-4 py-3 text-sm text-[#2C2E33] outline-none focus:ring-1 focus:ring-[#B78735] placeholder-[#A09D96] resize-none"
              />
            </div>

            {/* Field 3: Service Image Upload */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C2E33] block">
                Service Image <span className="text-[#787570] font-normal">(Optional)</span>
              </label>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />

              {imagePreview ? (
                <div className="relative w-full h-36 rounded-lg overflow-hidden border border-[#E3DDD3] bg-[#FAF8F4] group">
                  <Image
                    src={imagePreview}
                    alt="Service Preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 bg-white/90 hover:bg-white text-[#2C2E33] text-xs font-medium rounded-md shadow-xs transition-colors cursor-pointer"
                    >
                      Change
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="px-3 py-1.5 bg-red-600/90 hover:bg-red-600 text-white text-xs font-medium rounded-md shadow-xs transition-colors cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-28 border-2 border-dashed border-[#E3DDD3] hover:border-[#B78735] bg-[#FAF8F4] rounded-lg flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-full bg-[#EBE7DF] text-[#787570] group-hover:bg-[#B78735]/15 group-hover:text-[#B78735] flex items-center justify-center transition-colors">
                    <Upload className="w-4 h-4" />
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-semibold text-[#2C2E33] group-hover:text-[#B78735] transition-colors">
                      Click to upload service image
                    </span>
                    <span className="text-[11px] text-[#787570] block">
                      PNG, JPG or WEBP (Max 5MB)
                    </span>
                  </div>
                </button>
              )}
            </div>

            {/* Field 4 & 5 Grid: Duration & Price */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#2C2E33] block">
                  Duration (minutes) <span className="text-[#C54A4A]">*</span>
                </label>
                <div className="relative flex items-center">
                  <select
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    className="w-full bg-[#FAF8F4] border border-[#E3DDD3]/70 rounded-sm px-4 py-3 pr-10 text-sm font-medium text-[#2C2E33] outline-none cursor-pointer appearance-none focus:ring-1 focus:ring-[#B78735] focus:border-[#B78735] hover:border-[#B78735]/60 transition-colors"
                  >
                    {DURATION_OPTIONS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#787570] absolute right-3 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#2C2E33] block">
                  Price (£) <span className="text-[#C54A4A]">*</span>
                </label>
                <input
                  type="number"
                  required
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="65"
                  className="w-full bg-[#FAF8F4] border border-[#E3DDD3]/70 rounded-sm px-4 py-3 text-sm text-[#2C2E33] outline-none focus:ring-1 focus:ring-[#B78735] placeholder-[#A09D96]"
                />
              </div>
            </div>

            {/* Submit & Cancel Actions */}
            <div className="pt-4 flex items-center gap-3 border-t border-[#E3DDD3]/60">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-sm bg-[#B78735] hover:bg-[#8F6929] text-white text-sm font-medium transition-colors cursor-pointer shadow-xs active:scale-[0.98] flex items-center gap-2"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{modalMode === "add" ? "Service Created!" : "Saved!"}</span>
                  </>
                ) : (
                  <span>{modalMode === "add" ? "Create Service" : "Save Changes"}</span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-sm bg-[#FAF8F4] border border-[#E3DDD3]/70 text-[#787570] hover:text-[#2C2E33] text-sm font-medium transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
