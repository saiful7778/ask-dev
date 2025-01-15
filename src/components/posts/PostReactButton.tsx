import { HeartIcon1, HeartIcon2 } from "@/assets/icons";
import { cn } from "@/lib/shadcn/utils";
import { forwardRef } from "react";

export interface PostReactButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isReact?: boolean;
}

const PostReactButton = forwardRef<HTMLButtonElement, PostReactButtonProps>(
  ({ className, isReact, ...props }, ref) => {
    return (
      <button
        type="button"
        className={cn(
          "inline-flex size-10 items-center justify-center rounded-full bg-card p-2",
          className,
        )}
        ref={ref}
        {...props}
      >
        {isReact ? (
          <span>
            <HeartIcon2 />
          </span>
        ) : (
          <span>
            <HeartIcon1 />
          </span>
        )}
      </button>
    );
  },
);
PostReactButton.displayName = "PostReactButton";

export default PostReactButton;
