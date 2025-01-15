"use client";

import Spinner from "@/components/Spinner";

const Loading: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4">
      <Spinner size={60} />
    </div>
  );
};

export default Loading;
