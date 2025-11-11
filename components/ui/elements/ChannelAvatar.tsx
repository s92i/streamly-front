import { cva, type VariantProps } from "class-variance-authority";
import { FindProfileQuery } from "@/graphql/generated/output";
import { Avatar, AvatarFallback, AvatarImage } from "../common/Avatar";
import { cn } from "@/utils/tw-merge";
import { useConstructUrl } from "@/utils/use-construct-urls";

const avatarSizes = cva("", {
  variants: {
    size: {
      sm: "size-7",
      default: "size-9",
      lg: "size-14",
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
  const imageSrc = useConstructUrl(channel.avatar);

  return (
    <div className="relative">
      <Avatar
        className={cn(avatarSizes({ size }), isLive && "ring-2 ring-rose-500")}
      >
        <AvatarImage src={imageSrc} className="object-cover" />
        <AvatarFallback>
          {channel.username?.[0]?.toUpperCase() ?? "?"}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
