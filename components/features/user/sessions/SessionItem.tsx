import { CardContainer } from "@/components/ui/elements/CardContainer";
import {
  FindSessionsByUserQuery,
  useFindSessionsByUserQuery,
  useRemoveSessionMutation,
} from "@/graphql/generated/output";
import { getBrowserIcons } from "@/utils/get-browser-icons";
import { useTranslations } from "next-intl";
import { SessionModal } from "./SessionModal";
import { Button } from "@/components/ui/common/Button";
import { toast } from "sonner";
import { ConfirmModal } from "@/components/ui/elements/ConfirmModal";

interface SessionItemProps {
  session: FindSessionsByUserQuery["findSessionsByUser"][0];
  isCurrentSession?: boolean;
}

export function SessionItem({ session, isCurrentSession }: SessionItemProps) {
  const t = useTranslations("layout.dashboard.settings.sessions.sessionItem");

  const { refetch } = useFindSessionsByUserQuery();

  const [remove, { loading: isLoadingRemove }] = useRemoveSessionMutation({
    onCompleted() {
      refetch();
      toast.success(t("successMessage"));
    },
    onError() {
      toast.error(t("errorMessage"));
    },
  });

  const Icon = getBrowserIcons(session.metadata.device.browser);

  return (
    <CardContainer
      heading={`${session.metadata.device.browser}, ${session.metadata.device.os}`}
      description={`${session.metadata.location.country}, ${session.metadata.location.city}`}
      Icon={Icon}
      rightContent={
        <div className="flex items-center gap-x-4">
          {!isCurrentSession && (
            <ConfirmModal
              heading={t("confirmModal.heading")}
              message={t("confirmModal.message")}
              onConfirm={() => remove({ variables: { id: session.id } })}
            >
              <Button variant="secondary" disabled={isLoadingRemove}>
                {t("deleteButton")}
              </Button>
            </ConfirmModal>
          )}
          <SessionModal session={session}>
            <Button>{t("detailsButton")}</Button>
          </SessionModal>
        </div>
      }
    />
  );
}
