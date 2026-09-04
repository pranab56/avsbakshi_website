"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NewServicePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/business/services");
  }, [router]);

  return null;
}
