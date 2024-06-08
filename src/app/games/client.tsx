"use client";

import React from "react";
import dynamic from "next/dynamic";

const Games = dynamic(() => import("../../domains/Game/Games"), { ssr: false });

export function ClientOnly() {
  return <Games />;
}
