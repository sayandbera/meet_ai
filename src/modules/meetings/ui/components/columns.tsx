"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MeetingGetMany } from "../../types";
import { GenerateAvatar } from "@/components/generated-avatar";
import {
  CircleCheckIcon,
  CircleXIcon,
  ClockArrowUpIcon,
  ClockFadingIcon,
  CornerDownRightIcon,
  LoaderIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import humanizeDuration from "humanize-duration";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

function formatDuration(seconds: number) {
  return humanizeDuration(seconds * 1000, {
    largest: 1,
    round: true,
    units: ["h", "m", "s"],
  });
}

const statusIconMap = {
  upcoming: ClockArrowUpIcon,
  active: LoaderIcon,
  completed: CircleCheckIcon,
  processing: LoaderIcon,
  cancelled: CircleXIcon,
};

const statusColorMap = {
  upcoming: "bg-yellow-500/20 text-yellow-800 border-yellow-800/5",
  active: "bg-blue-500/20 text-blue-800 border-blue-800/5",
  completed: "bg-emerald-500/20 text-emerald-800 border-emerald-800/5",
  processing: "bg-grey-300/20 text-grey-800 border-grey-800/5",
  cancelled: "bg-rose-500/20 text-rose-800 border-rose-800/5",
};

export const columns: ColumnDef<MeetingGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: "Meeting Name",
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-1">
        <span className="font-semibold capitalize">{row.original.name}</span>

        <div className="flex items-center gap-x-2">
          <div className="flex items-center gap-x-1">
            <CornerDownRightIcon className="size-3 text-muted-foreground" />
            <span className="text-sm text-muted-foreground mx-w-[200px] truncate capitalize">
              {row.original.name}
            </span>
          </div>

          <GenerateAvatar
            seed={row.original.agent.name}
            variant="botttsNeutral"
            className="size-6"
          />

          <span className="text-sm text-muted-foreground">
            {row.original.startedAt
              ? format(row.original.startedAt, "MMM d")
              : ""}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const Icon =
        statusIconMap[row.original.status as keyof typeof statusIconMap];

      return (
        <Badge
          variant="outline"
          className={cn(
            "capitalize text-muted-foreground [&>svg]:size-4",
            statusColorMap[row.original.status as keyof typeof statusColorMap]
          )}
        >
          <Icon
            className={cn(
              row.original.status === "processing" && "animate-spin"
            )}
          />
          {row.original.status}{" "}
        </Badge>
      );
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className={cn(
          "capitalize gap-x-2 items-center flex [&>svg]:size-4",
          statusColorMap[row.original.status as keyof typeof statusColorMap]
        )}
      >
        <ClockFadingIcon className="text-blue-700" />
        {row.original.duration
          ? formatDuration(row.original.duration)
          : "No duration"}
      </Badge>
    ),
  },
];
