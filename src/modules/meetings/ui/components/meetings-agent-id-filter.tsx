import React, { useState } from "react";
import { useMeetingsFilter } from "../../hooks/use-meetings-filter";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { CommandSelect } from "./command-select";
import { GenerateAvatar } from "@/components/generated-avatar";

export const MeetingsAgentIdFilter = () => {
  const [filters, setFilters] = useMeetingsFilter();
  const trpc = useTRPC();
  const [agentSearch, setAgentSearch] = useState("");

  const { data: agents } = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 100,
      search: agentSearch,
    })
  );

  return (
    <CommandSelect
      options={(agents?.items ?? []).map((agent) => ({
        id: agent.id,
        value: agent.id,
        children: (
          <div className="flex items-center gap-x-2">
            <GenerateAvatar
              seed={agent.name}
              variant="botttsNeutral"
              className="border size-6"
            />
            <span>{agent.name}</span>
          </div>
        ),
      }))}
      value={filters.agentId}
      placeholder="Agent"
      onSelect={(value) => setFilters({ agentId: value })}
      className="h-9"
      onSearch={setAgentSearch}
    />
  );
};
