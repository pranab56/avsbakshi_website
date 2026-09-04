"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfessionalNewServicePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/professional/services");
  }, [router]);

  return null;
}
