import { SearchIcon1 } from "@/assets/icons";
import { cn } from "@/lib/shadcn/utils";
import { forwardRef } from "react";
import { Input } from "../shadcn/ui/input";

interface SearchIconProps extends React.ComponentProps<"input"> {
  containerClassName?: string;
}

const SearchInput = forwardRef<HTMLInputElement, SearchIconProps>(
  ({ className, containerClassName, ...props }, ref) => {
    return (
      <div className={cn("relative [&_svg]:size-4", containerClassName)}>
        <Input
          className={cn("border border-input bg-background", className)}
          ref={ref}
          {...props}
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 select-none">
          <SearchIcon1 />
        </span>
      </div>
    );
  },
);
SearchInput.displayName = "SearchInput";

export { SearchInput };
