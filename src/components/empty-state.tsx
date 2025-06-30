import Image from "next/image";
import React from "react";

interface Props {
  title: string;
  description: string;
}

export const EmptyState = ({ title, description }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image src="/empty.svg" alt="Empty" width={240} height={240} />
      <div className="flex flex-col gap-y-2 text-center">
        <h6 className="text-lg font-medium">{title}</h6>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
