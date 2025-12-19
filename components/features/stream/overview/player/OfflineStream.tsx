"use client";

import { Card } from "@/components/ui/common/Card";
import type { FindChannelByUsernameQuery } from "@/graphql/generated/output";
import { constructUrl } from "@/utils/construct-urls";
import { WifiOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { CSSProperties, useMemo } from "react";

interface OfflineStreamProps {
  channel: FindChannelByUsernameQuery["findChannelByUsername"];
}

export function OfflineStream({ channel }: OfflineStreamProps) {
  const t = useTranslations("layout.stream.video");

  const normalizedThumbnailUrl = useMemo(() => {
    const url = channel.stream?.thumbnailUrl;
    if (!url) return undefined;
    if (url.startsWith("/streams/") || url.startsWith("streams/")) {
      return constructUrl(url);
    }
    return constructUrl(`streams/${url}`);
  }, [channel.stream?.thumbnailUrl]);

  const backgroundStyle: CSSProperties = normalizedThumbnailUrl
    ? {
        backgroundImage: `url(${normalizedThumbnailUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {};

  return (
    <Card
      className="flex h-full flex-col items-center justify-center"
      style={backgroundStyle}
    >
      {normalizedThumbnailUrl && (
        <div className="absolute inset-0 z-0 rounded-lg bg-black opacity-60" />
      )}

      <WifiOff className="z-10 size-12 text-muted-foreground" />
      <p className="z-10 mt-3 text-lg text-black dark:text-white">
        {channel.displayName} {t("offline")}
      </p>
    </Card>
  );
}
