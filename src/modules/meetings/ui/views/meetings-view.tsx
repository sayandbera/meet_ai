"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";

export const MeetingsView = () => {
  const trpc = useTRPC();
  const { data: meetings } = useSuspenseQuery(
    trpc.meetings.getMany.queryOptions({})
  );

  return <div>MeetingsView</div>;
};

export const MeetingsViewLoading = () => (
  <LoadingState title="Loading Meetings" description="This may take a while" />
);

export const MeetingsViewError = () => (
  <ErrorState
    title="Error Loading Meetings"
    description="Something went wrong while loading meetings"
  />
);
