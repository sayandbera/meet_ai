import { getQueryClient, trpc } from "@/trpc/server";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import {
  AgentIdView,
  AgentIdViewError,
  AgentIdViewLoading,
} from "@/modules/agents/ui/view/agent-id-view";

interface props {
  params: Promise<{ agentId: string }>;
}

export const Page = async ({ params }: props) => {
  const { agentId } = await params;
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.agents.getOne.queryOptions({
      id: agentId,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgentIdViewLoading />}>
        <ErrorBoundary fallback={<AgentIdViewError />}>
          <AgentIdView agentId={agentId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};
