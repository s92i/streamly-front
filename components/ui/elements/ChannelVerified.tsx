import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Check } from "lucide-react";

const channelVerifiedSizes = cva("", {
  variants: {
    size: {
      sm: "size-3",
      default: "size-4",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface ChannelVerifiedProps
  extends VariantProps<typeof channelVerifiedSizes> {}

export function ChannelVerified({ size }: ChannelVerifiedProps) {
  return (
    <span
      className={cn(
        "flex items-center justify-center rounded-full bg-secondary",
        channelVerifiedSizes({ size })
      )}
    >
      <Check
        className={cn(
          "stroke-[4px] p-[3px] text-white",
          size === "sm" ? "size-[20px]" : "size-[11px]"
        )}
      />
    </span>
  );
}
