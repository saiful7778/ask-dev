import { Button } from "@/components/shadcn/ui/button";
import Link from "next/link";

const NotFound: React.FC = async () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4">
      <h2 className="text-9xl font-bold">
        404<span className="text-accent">!</span>
      </h2>
      <p>Not found</p>
      <Button asChild>
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
