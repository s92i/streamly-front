"use client";

import { CustomHeading } from "@/components/ui/elements/CustomHeading";
import { useCurrent } from "@/hooks/useCurrent";
import { useTranslations } from "next-intl";
import { InstructionModal } from "./InstructionModal";
import { CreateIngressForm } from "./forms/CreateIngressForm";
import { ToggleCardSkeleton } from "@/components/ui/elements/ToggleCard";
import { StreamURL } from "./forms/StreamURL";
import { StreamKey } from "./forms/StreamKey";

export function KeysSettings() {
  const t = useTranslations("layout.dashboard.keys.header");

  const { user, isLoadingProfile } = useCurrent();

  return (
    <div className="lg:px-10">
      <div className="block items-center justify-between space-y-3 lg:flex lg:space-y-0">
        <CustomHeading
          title={t("heading")}
          description={t("description")}
          size="lg"
        />
        <div className="flex items-center gap-x-4">
          <InstructionModal />
          <CreateIngressForm />
        </div>
      </div>
      <div className="mt-5 space-y-6">
        {isLoadingProfile ? (
          Array.from({ length: 2 }).map((_, index) => (
            <ToggleCardSkeleton key={index} />
          ))
        ) : (
          <>
            <StreamURL value={user?.stream?.serverUrl!} />
            <StreamKey value={user?.stream?.streamKey!} />
          </>
        )}
      </div>
    </div>
  );
}
