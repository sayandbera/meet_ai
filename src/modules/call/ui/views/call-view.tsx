"use client";

import { ErrorState } from "@/components/error-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CallProvider } from "../components/call-provider";

interface Props {
  meetingId: string;
}

export const CallView = ({ meetingId }: Props) => {
  const trpc = useTRPC();

  const { data: meeting } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  if (meeting.status === "completed") {
    return (
      <ErrorState
        title="Meeting has ended"
        description="You can no longer join this meeting!"
      />
    );
  }

  return <CallProvider meetingId={meetingId} meetingName={meeting.name} />;
};
