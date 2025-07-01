"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useAgentsFilter } from "../../hooks/use-agents-filter";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/data-table";
import { DataPagination } from "@/components/data-pagination";

export const AgentsView = () => {
  const router = useRouter();
  const [filters, setFilters] = useAgentsFilter();
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({
      ...filters,
    })
  );

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y4">
      <DataTable
        data={data.items}
        columns={columns}
        onRowClick={(id) => router.push(`/agents/${id}`)}
      />
      {data.items.length === 0 && (
        <EmptyState
          title="Create your first agent"
          description="Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call"
        />
      )}
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
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
