"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useLinkStatus } from "next/link";

// This component must be a descendant of Link to use useLinkStatus
const LoadingIndicator = () => {
  const { pending } = useLinkStatus();
  return pending ? (
   <Loader2 className="w-4 h-4 animate-spin" />
  ) : null;
};

const LinkWithStatus = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link href={href}>
      <span className="flex items-center">
        {children}
        <LoadingIndicator />
      </span>
    </Link>
  );
};

export default LinkWithStatus;
