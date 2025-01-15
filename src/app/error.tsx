"use client";

import { Button } from "@/components/shadcn/ui/button";
import Link from "next/link";

const GlobalError: React.FC<{
  error: Error & { digest?: string };
  reset: () => void;
}> = ({ error, reset }) => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4">
      <h2 className="text-4xl font-bold">
        Something went wrong
        <span className="text-accent">!</span>
      </h2>
      <pre>
        <code>{error.message}</code>
      </pre>
      <div className="flex items-center gap-4">
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
        <Button variant="destructive" onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </div>
  );
};

export default GlobalError;
