"use client";

import React from "react";
import dynamic from "next/dynamic";

const Deals = dynamic(() => import("../../domains/Deal/Deals"), { ssr: false });

export function ClientOnly() {
  return <Deals />;
}
