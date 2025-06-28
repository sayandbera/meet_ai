"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";

export const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return (
    <div>
      AgentsView
      {JSON.stringify(data, null, 2)}
    </div>
  );
};

export const AgentsViewLoading = () => (
  <LoadingState title="Loading Agents" description="This may take a while" />
);

export const AgentsViewError = () => (
  <ErrorState
    title="Error Loading Agents"
    description="Couldn't load agents. Please try again later."
  />
);
