import {
  CircleCheckIcon,
  CircleXIcon,
  ClockArrowUp,
  LoaderIcon,
  VideoIcon,
} from "lucide-react";
import { MeetingStatus } from "../../types";

const options = [
  {
    id: MeetingStatus.Upcoming,
    value: MeetingStatus.Upcoming,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <ClockArrowUp className="size-4" />
        {MeetingStatus.Upcoming}
      </div>
    ),
  },
  {
    id: MeetingStatus.Completed,
    value: MeetingStatus.Completed,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <CircleCheckIcon className="size-4" />
        {MeetingStatus.Completed}
      </div>
    ),
  },
  {
    id: MeetingStatus.Active,
    value: MeetingStatus.Active,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <VideoIcon className="size-4" />
        {MeetingStatus.Active}
      </div>
    ),
  },
  {
    id: MeetingStatus.Processing,
    value: MeetingStatus.Processing,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <LoaderIcon className="size-4" />
        {MeetingStatus.Processing}
      </div>
    ),
  },
  {
    id: MeetingStatus.Cancelled,
    value: MeetingStatus.Cancelled,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <CircleXIcon className="size-4" />
        {MeetingStatus.Cancelled}
      </div>
    ),
  },
];

import React from "react";
import { useMeetingsFilter } from "../../hooks/use-meetings-filter";
import { CommandSelect } from "./command-select";

export const MeetingsStatusFilter = () => {
  const [filters, setFilters] = useMeetingsFilter();

  return (
    <CommandSelect
      placeholder="Status"
      className="h-9"
      options={options}
      onSelect={(value) => setFilters({ status: value as MeetingStatus })}
      value={filters.status ?? ""}
    />
  );
};
