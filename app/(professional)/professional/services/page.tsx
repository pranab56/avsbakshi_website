"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  Plus,
  Check,
  Edit2,
  Trash2,
  Loader2,
  AlertCircle,
  Scissors,
  Tag,
  Clock,
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  useGetMyServicesQuery,
  useCreateServicesMutation,
  useUpdateServicesMutation,
  useDeleteServicesMutation,
} from "@/features/services/servicesApi";
import { useGetAllCategoryQuery } from "@/features/category/category";
import { ListSkeleton } from "@/components/ui/skeleton";

interface CategoryObj {
  _id?: string;
  name?: string;
  image?: string;
}

interface ServiceItem {
  _id: string;
  name: string;
  category?: CategoryObj | string;
  description: string;
  priceInUSD: number;
  durationInMinutes: number;
  status?: string;
  uid?: string;
}

const DEFAULT_CATEGORY_ID = "6abb2405117b01da294bc736";

export default function ProfessionalServicesPage() {
  const {
    data: servicesRes,
    isLoading: isServicesLoading,
    isError,
    error,
    refetch,
  } = useGetMyServicesQuery({});

  const { data: categoriesRes } = useGetAllCategoryQuery({});

  const [createService, { isLoading: isCreating }] = useCreateServicesMutation();
  const [updateService, { isLoading: isUpdating }] = useUpdateServicesMutation();
  const [deleteService, { isLoading: isDeleting }] = useDeleteServicesMutation();

  const servicesList: ServiceItem[] = Array.isArray(servicesRes?.data)
    ? servicesRes.data
    : Array.isArray(servicesRes)
    ? servicesRes
    : [];

  const categoriesList: CategoryObj[] = Array.isArray(categoriesRes?.data)
    ? categoriesRes.data
    : Array.isArray(categoriesRes)
    ? categoriesRes
    : [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);

  // Form state according to exact API requirements
  const [form, setForm] = useState({
    name: "",
    category: DEFAULT_CATEGORY_ID,
    description: "",
    priceInUSD: "75",
    durationInMinutes: "90",
  });

  const handleOpenAdd = () => {
    const firstCatId = categoriesList[0]?._id || DEFAULT_CATEGORY_ID;
    setForm({
      name: "",
      category: firstCatId,
      description: "",
      priceInUSD: "75",
      durationInMinutes: "90",
    });
    setEditingServiceId(null);
    setModalMode("add");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (service: ServiceItem) => {
    const catId =
      typeof service.category === "object"
        ? service.category?._id || DEFAULT_CATEGORY_ID
        : service.category || DEFAULT_CATEGORY_ID;

    setForm({
      name: service.name || "",
      category: catId,
      description: service.description || "",
      priceInUSD: String(service.priceInUSD ?? 75),
      durationInMinutes: String(service.durationInMinutes ?? 90),
    });
    setEditingServiceId(service._id);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleDelete = async (serviceId: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      const res = await deleteService({ id: serviceId }).unwrap();
      toast.success(res?.message || "Service deleted successfully!");
    } catch (err: any) {
      console.error("Failed to delete service:", err);
      toast.error(err?.data?.message || err?.message || "Failed to delete service.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error("Please enter a service name");
      return;
    }
    if (!form.description.trim()) {
      toast.error("Please enter a service description");
      return;
    }

    const payload = {
      name: form.name.trim(),
      category: form.category || DEFAULT_CATEGORY_ID,
      description: form.description.trim(),
      priceInUSD: Number(form.priceInUSD) || 0,
      durationInMinutes: Number(form.durationInMinutes) || 30,
    };

    try {
      if (modalMode === "add") {
        const res = await createService(payload).unwrap();
        toast.success(res?.message || "Service created successfully!");
      } else if (modalMode === "edit" && editingServiceId) {
        const res = await updateService({
          id: editingServiceId,
          data: payload,
        }).unwrap();
        toast.success(res?.message || "Service updated successfully!");
      }
      setIsModalOpen(false);
    } catch (err: any) {
      console.error("Failed to save service:", err);
      toast.error(err?.data?.message || err?.message || "Failed to save service.");
    }
  };

  const activeServicesCount = servicesList.length;

  return (
    <div className="space-y-6 pb-16">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs sm:text-sm text-muted-foreground font-normal tracking-wide">
            {activeServicesCount} active service{activeServicesCount !== 1 ? "s" : ""}
          </p>
          <h1 className="font-serif italic font-normal text-3xl sm:text-4xl text-foreground">
            Services
          </h1>
        </div>

        <div>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-4 py-2.5 rounded-sm bg-[#D99722] hover:bg-[#8F6929] text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer flex items-center gap-2 shadow-xs active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Add Service</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      {isServicesLoading ? (
        <div className="bg-card border border-border rounded-lg p-2">
          <ListSkeleton count={4} />
        </div>
      ) : isError ? (
        <div className="p-8 text-center bg-destructive/10 border border-destructive/20 rounded-lg flex flex-col items-center justify-center space-y-3">
          <AlertCircle className="w-8 h-8 text-destructive" />
          <p className="text-sm font-medium text-destructive">
            {(error as any)?.data?.message || "Failed to load services."}
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="px-4 py-2 bg-secondary text-foreground text-xs font-medium rounded-md hover:bg-secondary/80 transition-colors cursor-pointer"
          >
            Retry
          </button>
        </div>
      ) : servicesList.length === 0 ? (
        <div className="p-16 text-center bg-card border border-border rounded-lg flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
            <Scissors className="w-6 h-6 text-[#D99722]" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-lg font-semibold text-foreground">
              No services added yet
            </h3>
            <p className="text-xs text-muted-foreground max-w-sm">
              Click &quot;Add Service&quot; above to create your first salon service.
            </p>
          </div>
        </div>
      ) : (
        /* Services List */
        <div className="space-y-4 pt-2">
          {servicesList.map((service) => {
            const catObj = typeof service.category === "object" ? service.category : null;
            const categoryName = catObj?.name || "General";
            const categoryImage = catObj?.image;

            return (
              <div
                key={service._id}
                className="bg-card border border-border rounded-lg p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs hover:border-[#D99722]/40 transition-colors"
              >
                {/* Left Info */}
                <div className="flex items-start gap-4 max-w-xl">
                  {categoryImage && (
                    <div className="relative w-16 h-16 rounded-md overflow-hidden bg-secondary border border-border shrink-0">
                      <Image
                        src={categoryImage}
                        alt={categoryName}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-serif font-bold text-lg sm:text-xl text-foreground">
                        {service.name}
                      </h3>
                      {service.uid && (
                        <span className="px-2 py-0.5 bg-muted text-muted-foreground text-[10px] font-mono rounded">
                          {service.uid}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-3 pt-1 flex-wrap">
                      <span className="inline-flex items-center gap-1 px-3 py-0.5 bg-secondary border border-border text-muted-foreground text-xs font-medium rounded-full">
                        <Clock className="w-3 h-3 text-[#D99722]" />
                        {service.durationInMinutes} mins
                      </span>
                      {categoryName && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-muted text-muted-foreground text-[11px] rounded-md">
                          <Tag className="w-3 h-3 text-muted-foreground" />
                          {categoryName}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Price & Actions */}
                <div className="flex items-center gap-4 sm:gap-6 justify-between sm:justify-end shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border">
                  <div className="font-serif italic font-normal text-2xl sm:text-3xl text-foreground pr-2">
                    ${service.priceInUSD}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOpenEdit(service)}
                    className="px-3.5 py-2 rounded bg-secondary hover:bg-secondary/80 text-foreground text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 border border-border"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-foreground" />
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    disabled={isDeleting}
                    onClick={() => handleDelete(service._id)}
                    className="px-3.5 py-2 rounded bg-destructive/10 hover:bg-destructive/20 text-destructive text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* SHADCN DIALOG MODAL FOR ADD / EDIT SERVICE */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-xl bg-card border border-border p-6 sm:p-8 rounded-lg shadow-lg text-card-foreground">
          <DialogHeader className="text-left space-y-1 pb-2">
            <DialogTitle className="font-serif font-bold text-xl sm:text-2xl text-foreground">
              {modalMode === "add" ? "Create Service" : "Edit Service Details"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5 pt-2">
            {/* Field 1: Service Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground block">
                Service Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Hydrating Keratin Hair Spa & Blow Dry"
                className="w-full bg-background border border-input rounded-sm px-4 py-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
              />
            </div>

            {/* Field 2: Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground block">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full bg-background border border-input rounded-sm px-4 py-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring"
              >
                {categoriesList.length > 0 ? (
                  categoriesList.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name || cat._id}
                    </option>
                  ))
                ) : (
                  <option value={DEFAULT_CATEGORY_ID}>Hair Care</option>
                )}
              </select>
            </div>

            {/* Field 3: Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground block">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                required
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Deep-conditioning keratin treatment to restore moisture and shine..."
                className="w-full bg-background border border-input rounded-sm px-4 py-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground resize-none"
              />
            </div>

            {/* Field 4 & 5 Grid: Price & Duration */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground block">
                  Price ($) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={form.priceInUSD}
                  onChange={(e) => setForm({ ...form, priceInUSD: e.target.value })}
                  placeholder="75.00"
                  className="w-full bg-background border border-input rounded-sm px-4 py-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground block">
                  Duration (Minutes) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  value={form.durationInMinutes}
                  onChange={(e) => setForm({ ...form, durationInMinutes: e.target.value })}
                  placeholder="90"
                  className="w-full bg-background border border-input rounded-sm px-4 py-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Submit & Cancel Actions */}
            <div className="pt-4 flex items-center gap-3 border-t border-border">
              <button
                type="submit"
                disabled={isCreating || isUpdating}
                className="px-6 py-2.5 rounded-sm bg-[#D99722] hover:bg-[#8F6929] text-white text-sm font-medium transition-colors cursor-pointer shadow-xs active:scale-[0.98] flex items-center gap-2 disabled:opacity-50"
              >
                {isCreating || isUpdating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>{modalMode === "add" ? "Create Service" : "Save Changes"}</span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-sm bg-secondary border border-border text-muted-foreground hover:text-foreground text-sm font-medium transition-colors cursor-pointer"
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
