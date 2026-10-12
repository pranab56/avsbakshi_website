"use client";

import { useState, useEffect, use, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import StepperHeader from "@/components/booking/StepperHeader";
import ServiceStep, { ServiceItem } from "@/components/booking/ServiceStep";
import DateStep from "@/components/booking/DateStep";
import TimeStep from "@/components/booking/TimeStep";
import ReviewStep from "@/components/booking/ReviewStep";
import BookingSummarySidebar from "@/components/booking/BookingSummarySidebar";
import { useGetSingleProfessionalQuery, useGetServiceByProfessionalQuery } from "@/features/profesional/profesionalApi";
import { useCreateAppointmentMutation } from "@/features/appointment/appointmentApi";

function BookingFlowContent({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resolvedParams = use(params);

  // Redux auth state
  const token = useSelector((state: { auth?: { token?: string | null; user?: any } }) => state.auth?.token);
  const user = useSelector((state: { auth?: { token?: string | null; user?: any } }) => state.auth?.user);

  // Extract professional ID from query params or route params
  const proIdParam = searchParams.get("proId") || resolvedParams.id || "6ab73621c8ee0d56b2a1b333";
  const serviceIdsParam = searchParams.get("serviceIds") || searchParams.get("serviceId") || "";

  const [step, setStep] = useState<number>(1);
  const [isStepLoading, setIsStepLoading] = useState<boolean>(false);

  // Fetch professional info and services
  const { data: singleProRes, isLoading: isProLoading } = useGetSingleProfessionalQuery({ professionalId: proIdParam }, { skip: !proIdParam });
  const { data: servicesRes, isLoading: isServicesLoading } = useGetServiceByProfessionalQuery({ professionalId: proIdParam }, { skip: !proIdParam });

  const rawItem = Array.isArray(singleProRes?.data) ? singleProRes.data[0] : singleProRes?.data;
  const proObj = rawItem?.professional || {};
  const roleRef = proObj?.roleRef || {};
  const salonObj = rawItem?.salon || {};

  const proData = {
    id: proObj._id || rawItem?._id || proIdParam,
    name: `${proObj.firstName || ""} ${proObj.lastName || ""}`.trim() || "Sophia Martinez",
    title: roleRef.title || proObj.role || "Master Barber & Grooming Specialist",
    avatar: proObj.image || roleRef.photos?.[0] || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    location: salonObj.address?.city ? `${salonObj.address.city}, ${salonObj.address.state || "USA"}` : "SoHo, New York, NY",
  };

  const rawServices = Array.isArray(servicesRes?.data) ? servicesRes.data : [];
  const servicesList: ServiceItem[] = rawServices.map((s: any) => ({
    _id: s._id,
    name: s.name,
    priceInUSD: s.priceInUSD || s.price || 50,
    durationInMinutes: s.durationInMinutes || 30,
    description: s.description || "",
  }));

  // Multi-service selection state
  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("2026-10-08");
  const [selectedTime, setSelectedTime] = useState<string>("10:30 AM");

  // Sync selectedServices, date, time, and step from query params
  useEffect(() => {
    const dateParam = searchParams.get("date");
    const timeParam = searchParams.get("time");
    const stepParam = searchParams.get("step");

    if (dateParam) setSelectedDate(dateParam);
    if (timeParam) setSelectedTime(timeParam);
    if (stepParam) {
      const parsedStep = Number(stepParam);
      if (parsedStep >= 1 && parsedStep <= 4) {
        setStep(parsedStep);
      }
    }

    if (serviceIdsParam && servicesList.length > 0) {
      const ids = serviceIdsParam.split(",");
      const matched = servicesList.filter((s) => ids.includes(s._id));
      if (matched.length > 0) {
        setSelectedServices(matched);
        return;
      }
    }
    if (selectedServices.length === 0 && servicesList.length > 0) {
      setSelectedServices([servicesList[0]]);
    }
  }, [searchParams, serviceIdsParam, servicesList.length]);

  // Pricing calculations
  const subtotal = selectedServices.reduce((acc, item) => acc + (item.priceInUSD || 0), 0);
  const discount = subtotal >= 150 ? 20 : 0;
  const total = Math.max(0, subtotal - discount);

  // RTK Mutation for appointment creation
  const [createAppointment, { isLoading: isSubmitting }] = useCreateAppointmentMutation();

  const handleNextStep = () => {
    if (isStepLoading) return;
    if (step < 4) {
      setIsStepLoading(true);
      setTimeout(() => {
        setStep((prev) => prev + 1);
        setTimeout(() => setIsStepLoading(false), 200);
      }, 300);
    }
  };

  const handlePrevStep = () => {
    if (isStepLoading) return;
    if (step > 1) {
      setIsStepLoading(true);
      setTimeout(() => {
        setStep((prev) => prev - 1);
        setTimeout(() => setIsStepLoading(false), 200);
      }, 300);
    } else {
      router.push(`/professionals/${proData.id}`);
    }
  };

  // Convert selected date and time to ISO 8601 string: startsAt
  const formatStartsAtISO = (): string => {
    try {
      const datePart = selectedDate || "2026-10-08"; // YYYY-MM-DD
      let timePart = selectedTime || "10:30 AM";

      let hours = 10;
      let minutes = 30;

      const timeMatch = timePart.match(/(\d+):(\d+)\s*(AM|PM)?/i);
      if (timeMatch) {
        hours = parseInt(timeMatch[1], 10);
        minutes = parseInt(timeMatch[2], 10);
        const ampm = timeMatch[3]?.toUpperCase();
        if (ampm === "PM" && hours < 12) hours += 12;
        if (ampm === "AM" && hours === 12) hours = 0;
      }

      const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

      const isoStr = new Date(`${datePart}T${formattedHours}:${formattedMinutes}:00.000Z`).toISOString();
      return isoStr;
    } catch (e) {
      return new Date().toISOString();
    }
  };

  const handleConfirmBooking = async () => {
    if (selectedServices.length === 0 || !selectedDate || !selectedTime) {
      toast.error("Please complete all booking steps before confirming.");
      return;
    }

    const currentBookingUrl = `/book/${proData.id}?proId=${proData.id}&serviceIds=${selectedServices.map((s) => s._id).join(",")}&date=${encodeURIComponent(selectedDate)}&time=${encodeURIComponent(selectedTime)}&step=4`;

    // 1. If not logged in -> redirect to Login page with preserved booking URL
    if (!token || !user) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("pendingBookingUrl", currentBookingUrl);
      }
      toast.info("Please log in to confirm your booking.");
      router.push(`/login?redirect=${encodeURIComponent(currentBookingUrl)}`);
      return;
    }

    // 2. If user is logged in, check role
    const role = (user?.role || "customer").toLowerCase();
    if (role !== "customer" && role !== "user") {
      toast.error("Only customer accounts can confirm bookings.");
      return;
    }

    // 3. User is logged in as Customer -> execute API payload
    const payload = {
      professional: proData.id,
      services: selectedServices.map((s) => s._id),
      startsAt: formatStartsAtISO(),
      pricing: {
        subtotal,
        discount,
        total,
      },
    };

    try {
      const res = await createAppointment(payload).unwrap();
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("pendingBookingUrl");
      }
      const checkoutUrl = res?.data?.checkoutUrl || res?.checkoutUrl;
      if (checkoutUrl) {
        toast.success(res?.message || "Redirecting to payment checkout...");
        window.location.href = checkoutUrl;
      } else {
        toast.success(res?.message || "Appointment successfully booked!");
        router.push("/customer/bookings");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create appointment.");
    }
  };

  return (
    <div className="min-h-screen pb-20 select-none">
      <StepperHeader step={step} handlePrevStep={handlePrevStep} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7 space-y-6 relative min-h-[350px]">
            {/* Step Transition Overlay */}
            {isStepLoading && (
              <div className="absolute inset-0 z-30 rounded-2xl bg-background/85 backdrop-blur-md flex flex-col items-center justify-center p-6 border border-[#D99722]/20 shadow-xl animate-in fade-in duration-200">
                <div className="w-10 h-10 rounded-full border-2 border-[#D99722]/20 border-t-[#D99722] animate-spin mb-3" />
                <p className="text-xs font-semibold text-foreground animate-pulse">Loading step...</p>
              </div>
            )}

            {step === 1 && (
              <ServiceStep
                isLoading={isServicesLoading}
                selectedServices={selectedServices}
                setSelectedServices={setSelectedServices}
                servicesList={servicesList}
                professionalName={proData.name}
                handleNextStep={handleNextStep}
              />
            )}
            {step === 2 && (
              <DateStep
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                handleNextStep={handleNextStep}
                startDate={rawItem?.startDate || proObj?.startDate}
                endDate={rawItem?.endDate || proObj?.endDate}
                professionalName={proData.name}
              />
            )}
            {step === 3 && (
              <TimeStep
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                handleNextStep={handleNextStep}
              />
            )}
            {step === 4 && (
              <ReviewStep
                selectedServices={selectedServices}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                proData={proData}
                subtotal={subtotal}
                discount={discount}
                total={total}
                handleConfirmBooking={handleConfirmBooking}
                isSubmitting={isSubmitting}
              />
            )}
          </div>

          <BookingSummarySidebar
            selectedServices={selectedServices}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            proData={proData}
            subtotal={subtotal}
            discount={discount}
            total={total}
          />
        </div>
      </div>
    </div>
  );
}

export default function BookingFlowPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xs text-muted-foreground">Loading booking page...</div>}>
      <BookingFlowContent params={params} />
    </Suspense>
  );
}
