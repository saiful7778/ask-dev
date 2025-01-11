import { cn } from "@/lib/shadcn/utils";
import Link from "next/link";

const SiteLogo: React.FC<{ className?: string | undefined }> = ({
  className,
  ...props
}) => {
  return (
    <Link
      href="/"
      className={cn("text-xl font-bold uppercase text-primary", className)}
      {...props}
    >
      ASK DEV
    </Link>
  );
};

export default SiteLogo;
