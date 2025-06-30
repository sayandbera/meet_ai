import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import React, { useState } from "react";
import { AgentIdViewHeader } from "../components/agent-id-view-header";
import { GenerateAvatar } from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { UpdateAgentDialog } from "../components/update-agent-dialog";

interface Props {
  agentId: string;
}

export const AgentIdView = ({ agentId }: Props) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [updateAgentDialogOpen, setUpdateAgentDialogOpen] = useState(false);

  const { data: agent } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );

  const [RemoveConfirmationDialog, confirmRemove] = useConfirm(
    "Are you sure?",
    `The following action will remove ${agent.meetingCount} associated ${
      agent.meetingCount === 1 ? "meeting" : "meetings"
    }`
  );

  const removeAgent = useMutation(
    trpc.agents.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions({})
        );
        // TODO: Invalidate free tire usage
        router.push("/agents");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const handleRemoveAgent = async () => {
    const confirmed = await confirmRemove();
    if (!confirmed) return;

    await removeAgent.mutate({ id: agentId });
  };

  return (
    <>
      <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
        <AgentIdViewHeader
          agentId={agentId}
          agentName={agent.name}
          onEdit={() => setUpdateAgentDialogOpen(true)}
          onRemove={handleRemoveAgent}
        />

        <div className="bg-white rounded-lg border">
          <div className="flex flex-col col-span-5 px-4 py-5 gap-y-5">
            <div className="flex items-center gap-x-3">
              <GenerateAvatar
                variant="botttsNeutral"
                seed={agent.name}
                className=""
              />
              <h2 className="text-2xl font-medium">{agent.name}</h2>
            </div>
            <Badge
              variant="outline"
              className="flex items-center gap-x-2 [&svg]:size-4"
            >
              <VideoIcon className="text-blue-700" />
              {agent.meetingCount}{" "}
              {agent.meetingCount === 1 ? "meeting" : "meetings"}
            </Badge>
            <div className="flex flex-col gap-y-4">
              <p className="text-lg font-medium">Instructions</p>
              <p className="text-neutral-800">{agent.instructions}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dialog to update the agent */}
      <UpdateAgentDialog
        open={updateAgentDialogOpen}
        onOpenChange={setUpdateAgentDialogOpen}
        initialValues={agent}
      />

      {/* Dialog to confirm the deletion of the agent */}
      <RemoveConfirmationDialog />
    </>
  );
};

export const AgentIdViewLoading = () => (
  <LoadingState
    title="Loading Agent"
    description="This may take a few seconds"
  />
);

export const AgentIdViewError = () => (
  <ErrorState
    title="Error Loading Agent"
    description="Something went wrong while loading the agent."
  />
);
