"use client";

import { DataTable } from "@/components/data-table";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useRouter } from "next/navigation";
import { useMeetingsFilter } from "../../hooks/use-meetings-filter";
import { DataPagination } from "@/components/data-pagination";

export const MeetingsView = () => {
  const trpc = useTRPC();
  const router = useRouter();
  const [filters, setFilters] = useMeetingsFilter();

  const { data: meetings } = useSuspenseQuery(
    trpc.meetings.getMany.queryOptions({
      ...filters,
    })
  );

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable
        data={meetings.items}
        columns={columns}
        onRowClick={(id) => router.push(`/meetings/${id}`)}
      />

      {meetings.items.length === 0 && (
        <EmptyState
          title="Create your first meeting"
          description="Schedule a meeting to connect with others. Each meeting lets you collaborate, share ideas, and interact with participants in real time."
        />
      )}

      <DataPagination
        page={filters.page}
        totalPages={meetings.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
    </div>
  );
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
