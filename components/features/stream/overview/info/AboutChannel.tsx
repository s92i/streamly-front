import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/common/Card";
import { Skeleton } from "@/components/ui/common/Skeleton";
import type { FindChannelByUsernameQuery } from "@/graphql/generated/output";
import { getSocialIcon } from "@/utils/get-social-icon";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface AboutChannelProps {
  channel: FindChannelByUsernameQuery["findChannelByUsername"];
}

export function AboutChannel({ channel }: AboutChannelProps) {
  const t = useTranslations("layout.stream.aboutChannel");
  const followerCount = channel.followings.length;
  const followerLabel =
    followerCount === 1 ? t("followersCountSingular") : t("followersCount");

  return (
    <Card className="mt-6">
      <CardHeader className="p-4">
        <CardTitle className="text-xl">
          {t("heading")} {channel.displayName}
        </CardTitle>
      </CardHeader>
      <CardContent className="-mt-1 space-y-2 px-4">
        <div className="text-[15px] text-foreground">
          <span className="font-semibold">{followerCount}</span> {followerLabel}
        </div>
        <div className="text-[15px] text-foreground">
          {channel.bio ?? t("noDescription")}
        </div>
        {channel.socialLinks.length ? (
          <div className="grid gap-x-3 md:grid-cols-3 xl:grid-cols-8">
            {channel.socialLinks.map((socialLink, index) => {
              const Icon = getSocialIcon(socialLink.url);
              return (
                <Link
                  key={index}
                  href={socialLink.url}
                  className="flex items-center pr-1 text-[15px] hover:text-primary"
                  target="_blank"
                >
                  <Icon className="size-4 mr-2" />
                  {socialLink.title}
                </Link>
              );
            })}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

export function AboutChannelSkeleton() {
  return <Skeleton className="mt-6 h-36 w-full" />;
}
