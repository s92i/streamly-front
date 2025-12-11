import { cva, type VariantProps } from "class-variance-authority";
import { FindProfileQuery } from "@/graphql/generated/output";
import { Avatar, AvatarFallback, AvatarImage } from "../common/Avatar";
import { constructUrl } from "@/utils/construct-urls";
import { cn } from "@/lib/utils";

const avatarSizes = cva("", {
  variants: {
    size: {
      sm: "size-7",
      default: "size-9",
      lg: "size-14",
      xl: "size-32",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface ChannelAvatarProps extends VariantProps<typeof avatarSizes> {
  channel: Pick<FindProfileQuery["findProfile"], "username" | "avatar">;
  isLive?: boolean;
}

export function ChannelAvatar({ size, channel, isLive }: ChannelAvatarProps) {
  return (
    <div className="relative cursor-pointer">
      <Avatar
        className={cn(
          "bg-secondary",
          avatarSizes({ size }),
          isLive && "ring-2 ring-rose-500"
        )}
      >
        <AvatarImage
          src={constructUrl(channel.avatar)}
          className="object-cover"
        />
        <AvatarFallback
          className={cn(
            size === "xl" && "text-4xl",
            size === "lg" && "text-2xl"
          )}
        >
          {channel.username?.[0]?.toUpperCase() ?? "?"}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
