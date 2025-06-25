"use client";

import { Button } from "@/components/ui/button";
import React from "react";

export default function Home() {
  return (
    <div className="text-4xl font-bold text-amber-300">
      Hello World!
      <Button
        variant="destructive"
        onClick={() => console.log("Button has been clicked!")}
      >
        Click Me
      </Button>
    </div>
  );
}
