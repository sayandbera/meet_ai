import { Button } from "@/components/ui/button";
import React from "react";

export default function Home() {
  return (
    <div className="text-4xl font-bold text-amber-300">
      Hello World!
      <Button variant="destructive">Click Me</Button>
    </div>
  );
}
