"use client";

import { Card } from "@/components/ui/common/Card";
import { ChannelAvatar } from "@/components/ui/elements/ChannelAvatar";
import { LiveBadge } from "@/components/ui/elements/LiveBadge";
import type { FindProfileQuery } from "@/graphql/generated/output";
import { getRandomColor } from "@/utils/color";
import { constructUrl } from "@/utils/construct-urls";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

interface StreamThumbnailProps {
  url: string | null | undefined;
  user: Pick<
    FindProfileQuery["findProfile"],
    "username" | "avatar" | "isVerified"
  >;
  isLive?: boolean;
}

export function StreamThumbnail({ url, user, isLive }: StreamThumbnailProps) {
  const [randomColor, setRandomColor] = useState("");

  useEffect(() => {
    setRandomColor(getRandomColor());
  }, []);

  const normalizedUrl = useMemo(() => {
    if (!url) return undefined;

    if (url.startsWith("/streams/") || url.startsWith("streams/")) {
      return constructUrl(url);
    }

    return constructUrl(`streams/${url}`);
  }, [url]);

  return (
    <div className="group relative aspect-video cursor-pointer rounded-lg">
      <div
        className="absolute inset-0 flex items-center justify-center rounded-xl opacity-0 transition-opacity group-hover:opacity-100"
        style={{ backgroundColor: randomColor }}
      />

      {normalizedUrl ? (
        <Image
          src={normalizedUrl}
          alt={user.username}
          fill
          className="rounded-xl object-cover transition-transform group-hover:-translate-y-2 group-hover:translate-x-2"
        />
      ) : (
        <Card className="flex h-full w-full flex-col items-center justify-center gap-y-4 rounded-xl transition-transform group-hover:-translate-y-2 group-hover:translate-x-2">
          <ChannelAvatar channel={user} isLive={isLive} />
        </Card>
      )}

      {isLive && (
        <div className="absolute right-2 top-2 transition-transform group-hover:-translate-y-2 group-hover:translate-x-2">
          <LiveBadge />
        </div>
      )}
    </div>
  );
}
