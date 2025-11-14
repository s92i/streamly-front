"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/common/DropdownMenu";
import { ChannelAvatar } from "@/components/ui/elements/ChannelAvatar";
import { useLogoutUserMutation } from "@/graphql/generated/output";
import { useAuth } from "@/hooks/useAuth";
import { useCurrent } from "@/hooks/useCurrent";
import { LayoutDashboard, Loader, LogOut, User } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Notifications } from "./notifications/Notifications";

export function ProfileMenu() {
  const t = useTranslations("layout.header.headerMenu.profileMenu");
  const router = useRouter();

  const { exit } = useAuth();
  const { user, isLoadingProfile } = useCurrent();

  const [logout] = useLogoutUserMutation({
    onCompleted() {
      exit();
      toast.success(t("successMessage"));
      router.push("/account/login");
    },
    onError() {
      toast.error(t("errorMessage"));
    },
  });

  return isLoadingProfile || !user ? (
    <Loader className="size-6 animate-spin text-muted-foreground" />
  ) : (
    <>
      <Notifications />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <ChannelAvatar channel={user} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[230px]">
          <div className="flex items-center gap-x-3 p-2">
            <h2 className="font-medium text-foreground">{user.username}</h2>
          </div>
          <DropdownMenuSeparator />
          <Link href={`/${user.username}`}>
            <DropdownMenuItem className="cursor-pointer">
              <User className="size-2 mr-2" />
              {t("channel")}
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/settings">
            <DropdownMenuItem className="cursor-pointer">
              <LayoutDashboard className="size-2 mr-2" />
              {t("dashboard")}
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="cursor-pointer" onClick={() => logout()}>
            <LogOut className="size-2 mr-2" />
            {t("logout")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
