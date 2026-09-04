"use client";

import { useState } from "react";
import { Plus, Check, Edit2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Chair {
  id: string;
  name: string;
  location: string;
  status: "Available" | "Occupied" | "Maintenance";
  until: string;
  price: string;
  description?: string;
  amenities: string[];
}

const INITIAL_CHAIRS: Chair[] = [
  {
    id: "1",
    name: "Chair A",
    location: "Main Floor",
    status: "Occupied",
    until: "Until 6:00 PM",
    price: "£45/day",
    description: "Spacious main floor styling chair with hydraulic lift.",
    amenities: ["WiFi", "Backwash", "Towels"],
  },
  {
    id: "2",
    name: "Chair B",
    location: "Main Floor",
    status: "Occupied",
    until: "Until 6:00 PM",
    price: "£45/day",
    description: "Premium leather chair adjacent to shampoo stations.",
    amenities: ["WiFi", "Backwash"],
  },
  {
    id: "3",
    name: "Chair C",
    location: "VIP Suite",
    status: "Available",
    until: "Available Now",
    price: "£60/day",
    description: "Private booth chair with direct ring light setup.",
    amenities: ["WiFi", "Storage", "Tea & Coffee", "Reception"],
  },
  {
    id: "4",
    name: "Chair D",
    location: "Main Floor",
    status: "Occupied",
    until: "Until 5:30 PM",
    price: "£45/day",
    description: "Central floor station with wide wall mirror.",
    amenities: ["WiFi", "Backwash"],
  },
  {
    id: "5",
    name: "Chair E",
    location: "Color Station",
    status: "Available",
    until: "Available Now",
    price: "£50/day",
    description: "Specialized coloring desk space with sink access.",
    amenities: ["WiFi", "Storage", "Towels"],
  },
  {
    id: "6",
    name: "Chair F",
    location: "Main Floor",
    status: "Maintenance",
    until: "In Maintenance",
    price: "£45/day",
    description: "Currently under maintenance.",
    amenities: ["WiFi"],
  },
];

const AMENITY_OPTIONS = [
  "WiFi",
  "Backwash",
  "Parking",
  "Reception",
  "Storage",
  "Towels",
  "Tea & Coffee",
];

export default function ChairsSpacePage() {
  const [chairs, setChairs] = useState<Chair[]>(INITIAL_CHAIRS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingChairId, setEditingChairId] = useState<string | null>(null);

  // Form State
  const [form, setForm] = useState({
    name: "",
    location: "",
    price: "45",
    description: "",
    amenities: ["WiFi", "Backwash"],
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Calculate dynamic stats
  const totalChairs = chairs.length;
  const availableChairs = chairs.filter((c) => c.status === "Available").length;
  const occupiedChairs = chairs.filter((c) => c.status === "Occupied").length;
  const maintenanceChairs = chairs.filter((c) => c.status === "Maintenance").length;

  const handleOpenAdd = () => {
    setForm({
      name: "",
      location: "",
      price: "45",
      description: "",
      amenities: ["WiFi", "Backwash"],
    });
    setEditingChairId(null);
    setModalMode("add");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (chair: Chair) => {
    setForm({
      name: chair.name,
      location: chair.location,
      price: chair.price.replace("£", "").replace("/day", ""),
      description: chair.description || "",
      amenities: chair.amenities,
    });
    setEditingChairId(chair.id);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const toggleAmenity = (amenity: string) => {
    setForm((prev) => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((a) => a !== amenity)
          : [...prev.amenities, amenity],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    if (modalMode === "add") {
      const newChair: Chair = {
        id: Date.now().toString(),
        name: form.name,
        location: form.location || "Main Floor",
        status: "Available",
        until: "Available Now",
        price: `£${form.price || "45"}/day`,
        description: form.description,
        amenities: form.amenities,
      };
      setChairs((prev) => [newChair, ...prev]);
    } else if (modalMode === "edit" && editingChairId) {
      setChairs((prev) =>
        prev.map((c) =>
          c.id === editingChairId
            ? {
                ...c,
                name: form.name,
                location: form.location || "Main Floor",
                price: `£${form.price || "45"}/day`,
                description: form.description,
                amenities: form.amenities,
              }
            : c
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
            {totalChairs} chairs total · {availableChairs} available today
          </p>
          <h1 className="font-serif italic font-normal text-3xl sm:text-4xl text-[#2C2E33]">
            Chairs & Space
          </h1>
        </div>

        <div>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-4 py-2.5 rounded-sm bg-[#B78735] hover:bg-[#8F6929] text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer flex items-center gap-2 shadow-xs active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Add Chair</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E3DDD3]/70 rounded-lg p-5 shadow-2xs">
          <div className="font-serif italic text-3xl font-normal text-[#2C2E33] mb-1">
            {totalChairs}
          </div>
          <p className="text-xs text-[#787570] font-normal">Total Chairs</p>
        </div>

        <div className="bg-white border border-[#E3DDD3]/70 rounded-lg p-5 shadow-2xs">
          <div className="font-serif italic text-3xl font-normal text-[#2C2E33] mb-1">
            {availableChairs}
          </div>
          <p className="text-xs text-[#787570] font-normal">Available</p>
        </div>

        <div className="bg-white border border-[#E3DDD3]/70 rounded-lg p-5 shadow-2xs">
          <div className="font-serif italic text-3xl font-normal text-[#2C2E33] mb-1">
            {occupiedChairs}
          </div>
          <p className="text-xs text-[#787570] font-normal">Occupied</p>
        </div>

        <div className="bg-white border border-[#E3DDD3]/70 rounded-lg p-5 shadow-2xs">
          <div className="font-serif italic text-3xl font-normal text-[#B78735] mb-1">
            {maintenanceChairs}
          </div>
          <p className="text-xs text-[#787570] font-normal">Maintenance</p>
        </div>
      </div>

      {/* Chairs Stacked Card List */}
      <div className="space-y-4 pt-2">
        {chairs.map((chair) => (
          <div
            key={chair.id}
            className="bg-white border border-[#E3DDD3]/70 rounded-lg p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs hover:border-[#B78735]/40 transition-colors"
          >
            {/* Left Chair Info */}
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-lg sm:text-xl text-[#2C2E33]">
                {chair.name}
              </h3>
              <p className="text-xs text-[#787570] font-normal">
                {chair.until}
              </p>
              <div className="pt-1.5 flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 bg-[#FAF8F4] border border-[#E3DDD3]/70 text-[#787570] text-xs font-medium rounded-full">
                  {chair.location}
                </span>
                {chair.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="px-2.5 py-0.5 bg-[#FAF8F4] text-[#A09D96] text-[11px] rounded-md"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Price & Actions */}
            <div className="flex items-center gap-5 sm:gap-8 justify-between sm:justify-end shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E3DDD3]/40">
              <div className="font-serif italic font-normal text-xl sm:text-2xl text-[#2C2E33]">
                {chair.price}
              </div>

              <button
                type="button"
                onClick={() => handleOpenEdit(chair)}
                className="px-4 py-2 rounded-sm bg-[#E2DDD3] hover:bg-[#D5CEBF] text-[#2C2E33] text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Edit2 className="w-3.5 h-3.5 text-[#2C2E33]" />
                <span>Edit</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* SHADCN DIALOG MODAL FOR ADD / EDIT CHAIR                          */}
      {/* ----------------------------------------------------------------- */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-xl bg-white border border-[#E3DDD3] p-6 sm:p-8 rounded-lg shadow-lg">
          <DialogHeader className="text-left space-y-1 pb-2">
            <DialogTitle className="font-serif font-bold text-xl sm:text-2xl text-[#2C2E33]">
              {modalMode === "add" ? "Add New Chair" : "Edit Chair Details"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5 pt-2">
            {/* Field 1: Chair Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C2E33] block">
                Chair Name / Number
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Chair F"
                className="w-full bg-[#FAF8F4] border border-[#E3DDD3]/70 rounded-sm px-4 py-3 text-sm text-[#2C2E33] outline-none focus:ring-1 focus:ring-[#B78735] placeholder-[#A09D96]"
              />
            </div>

            {/* Field 2: Location in Salon */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C2E33] block">
                Location in Salon
              </label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="e.g. Main Floor"
                className="w-full bg-[#FAF8F4] border border-[#E3DDD3]/70 rounded-sm px-4 py-3 text-sm text-[#2C2E33] outline-none focus:ring-1 focus:ring-[#B78735] placeholder-[#A09D96]"
              />
            </div>

            {/* Field 3: Daily Rate */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C2E33] block">
                Daily Rate (£/day)
              </label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="e.g. 45"
                className="w-full bg-[#FAF8F4] border border-[#E3DDD3]/70 rounded-sm px-4 py-3 text-sm text-[#2C2E33] outline-none focus:ring-1 focus:ring-[#B78735] placeholder-[#A09D96]"
              />
            </div>

            {/* Field 4: Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2C2E33] block">
                Description
              </label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Describe the space..."
                className="w-full bg-[#FAF8F4] border border-[#E3DDD3]/70 rounded-sm px-4 py-3 text-sm text-[#2C2E33] outline-none focus:ring-1 focus:ring-[#B78735] placeholder-[#A09D96] resize-none"
              />
            </div>

            {/* Field 5: Amenities Selection */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#2C2E33] block">
                Amenities
              </label>
              <div className="flex flex-wrap gap-2 pt-1">
                {AMENITY_OPTIONS.map((amenity) => {
                  const isSelected = form.amenities.includes(amenity);
                  return (
                    <button
                      key={amenity}
                      type="button"
                      onClick={() => toggleAmenity(amenity)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#B78735] text-white border border-[#B78735] shadow-2xs"
                          : "bg-[#FAF8F4] border border-[#E3DDD3]/70 text-[#787570] hover:border-[#B78735]"
                      }`}
                    >
                      {amenity}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit & Cancel Actions */}
            <div className="pt-4 flex items-center gap-3 justify-end border-t border-[#E3DDD3]/60">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-sm bg-[#FAF8F4] border border-[#E3DDD3]/70 text-[#787570] hover:text-[#2C2E33] text-sm font-medium transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-sm bg-[#B78735] hover:bg-[#8F6929] text-white text-sm font-medium transition-colors cursor-pointer shadow-xs active:scale-[0.98] flex items-center gap-2"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{modalMode === "add" ? "Chair Created!" : "Saved!"}</span>
                  </>
                ) : (
                  <span>{modalMode === "add" ? "Create Chair" : "Save Changes"}</span>
                )}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
