"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React from "react";

export const HomeView = () => {
  const router = useRouter();
  return (
    <Button
      type="button"
      variant="destructive"
      onClick={() =>
        authClient.signOut({
          fetchOptions: {
            onSuccess: () => router.push("/"),
          },
        })
      }
    >
      Sign out
    </Button>
  );
};
