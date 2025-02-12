import { cn } from "@/lib/shadcn/utils";
import { Toggle } from "../shadcn/ui/toggle";
import { forwardRef } from "react";
import { Root } from "@radix-ui/react-toggle";

interface ToolButtonProps extends React.ComponentPropsWithoutRef<typeof Root> {
  isActive: boolean;
}

const ToolButton = forwardRef<React.ElementRef<typeof Root>, ToolButtonProps>(
  ({ children, className, isActive, ...props }, ref) => {
    return (
      <Toggle
        ref={ref}
        className={cn("h-8 w-8 min-w-8 rounded", className)}
        pressed={isActive}
        {...props}
      >
        {children}
      </Toggle>
    );
  },
);
ToolButton.displayName = "ToolButton";

export default ToolButton;
