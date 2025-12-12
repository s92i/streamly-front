import { Button } from "@/components/ui/common/Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/common/Popover";
import type { FindChannelByUsernameQuery } from "@/graphql/generated/output";
import { Share } from "lucide-react";
import { useTranslations } from "next-intl";
import { FaFacebook, FaTelegram, FaWhatsapp } from "react-icons/fa";
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { FaXTwitter } from "react-icons/fa6";

interface ShareActionsProps {
  channel: FindChannelByUsernameQuery["findChannelByUsername"];
}

export function ShareActions({ channel }: ShareActionsProps) {
  const t = useTranslations("layout.stream.actions.share");

  const shareUrl = `${window.location.origin}/${channel.username}`;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="lgIcon">
          <Share className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="top" className="w-[300px]">
        <h2 className="font-medium text-white">{t("heading")}</h2>
        <div className="mt-4 grid grid-cols-4 gap-3">
          <TelegramShareButton url={shareUrl}>
            <div className="flex h-14 items-center justify-center rounded-md bg-sky-500 transition-transform hover:-translate-y-1.5">
              <FaTelegram className="size-7 text-white" />
            </div>
          </TelegramShareButton>
          <TwitterShareButton url={shareUrl}>
            <div className="flex h-14 items-center justify-center rounded-md bg-black transition-transform hover:-translate-y-1.5">
              <FaXTwitter className="size-7 text-white" />
            </div>
          </TwitterShareButton>
          <FacebookShareButton url={shareUrl}>
            <div className="flex h-14 items-center justify-center rounded-md bg-blue-500 transition-transform hover:-translate-y-1.5">
              <FaFacebook className="size-7 text-white" />
            </div>
          </FacebookShareButton>
          <WhatsappShareButton url={shareUrl}>
            <div className="flex h-14 items-center justify-center rounded-md bg-green-500 transition-transform hover:-translate-y-1.5">
              <FaWhatsapp className="size-7 text-white" />
            </div>
          </WhatsappShareButton>
        </div>
      </PopoverContent>
    </Popover>
  );
}
