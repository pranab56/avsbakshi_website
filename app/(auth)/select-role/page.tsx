"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Scissors, Building2, CheckCircle2 } from "lucide-react";

export default function SelectRolePage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<"customer" | "professional" | "business">("customer");

  const handleContinue = () => {
    router.push(`/register?role=${selectedRole}`);
  };

  return (
    <div className="max-w-lg mx-auto w-full space-y-6">
      <div className="space-y-2">
        <h1 className="font-title text-3xl font-bold text-[#1A1A1A]">
          Join Cloud Salon
        </h1>
        <p className="text-sm text-zinc-600">
          How would you like to use Cloud Salon?
        </p>
      </div>

      {/* Role Selection Options */}
      <div className="space-y-3.5">
        {/* Option 1: Customer */}
        <button
          type="button"
          onClick={() => setSelectedRole("customer")}
          className={`w-full p-4 rounded-sm border text-left flex cursor-pointer items-start gap-4 transition-all ${selectedRole === "customer"
            ? "border-[#B78735] bg-[#B78735]/5 shadow-sm"
            : "border-[#E5E0D6] bg-white hover:border-[#B78735]/50"
            }`}
        >
          <div className={`p-2.5 rounded-xl ${selectedRole === "customer" ? "bg-[#B78735] text-white" : "bg-[#F5F3EF] text-zinc-700"}`}>
            <User className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-base text-[#1A1A1A]">I&apos;m a Customer</span>
              {selectedRole === "customer" && <CheckCircle2 className="w-5 h-5 text-[#B78735]" />}
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">
              Discover and book beauty services from top professionals near you.
            </p>
          </div>
        </button>

        {/* Option 2: Professional */}
        <button
          type="button"
          onClick={() => setSelectedRole("professional")}
          className={`w-full p-4 rounded-sm border text-left flex cursor-pointer items-start gap-4 transition-all ${selectedRole === "professional"
            ? "border-[#B78735] bg-[#B78735]/5 shadow-sm"
            : "border-[#E5E0D6] bg-white hover:border-[#B78735]/50"
            }`}
        >
          <div className={`p-2.5 rounded-xl ${selectedRole === "professional" ? "bg-[#B78735] text-white" : "bg-[#F5F3EF] text-zinc-700"}`}>
            <Scissors className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-base text-[#1A1A1A]">I&apos;m a Professional</span>
              {selectedRole === "professional" && <CheckCircle2 className="w-5 h-5 text-[#B78735]" />}
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">
              Work independently, manage your client list & calendar effortlessly.
            </p>
          </div>
        </button>

        {/* Option 3: Business */}
        <button
          type="button"
          onClick={() => setSelectedRole("business")}
          className={`w-full p-4 rounded-sm border text-left cursor-pointer flex items-start gap-4 transition-all ${selectedRole === "business"
            ? "border-[#B78735] bg-[#B78735]/5 shadow-sm"
            : "border-[#E5E0D6] bg-white hover:border-[#B78735]/50"
            }`}
        >
          <div className={`p-2.5 rounded-xl ${selectedRole === "business" ? "bg-[#B78735] text-white" : "bg-[#F5F3EF] text-zinc-700"}`}>
            <Building2 className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-base text-[#1A1A1A]">I&apos;m a Business</span>
              {selectedRole === "business" && <CheckCircle2 className="w-5 h-5 text-[#B78735]" />}
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">
              Manage your salon, team schedules & multi-service business.
            </p>
          </div>
        </button>
      </div>

      <button
        onClick={handleContinue}
        className="w-full py-3 bg-[#B78735] hover:bg-[#A37428] text-white font-medium rounded-sm shadow transition-all text-sm cursor-pointer"
      >
        Continue
      </button>

      <p className="text-xs text-center text-zinc-500">
        Already have an account?{" "}
        <Link href="/login" className="text-[#B78735] font-semibold hover:underline">
          Log In
        </Link>
      </p>
    </div>
  );
}
