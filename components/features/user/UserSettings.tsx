import { useTranslations } from "next-intl";
import { CustomHeading } from "@/components/ui/elements/CustomHeading";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/common/Tabs";
import { ChangeAvatarForm } from "./profile/ChangeAvatarForm";

export function UserSettings() {
  const t = useTranslations("layout.dashboard.settings");

  return (
    <div className="lg:px-10">
      <CustomHeading
        title={t("header.heading")}
        description={t("header.description")}
        size="lg"
      />
      <Tabs defaultValue="profile" className="mt-3 w-full">
        <TabsList className="grid max-w-2xl grid-cols-5">
          <TabsTrigger value="profile">{t("header.profile")}</TabsTrigger>
          <TabsTrigger value="account">{t("header.account")}</TabsTrigger>
          <TabsTrigger value="appearance">{t("header.appearance")}</TabsTrigger>
          <TabsTrigger value="notifications">
            {t("header.notifications")}
          </TabsTrigger>
          <TabsTrigger value="sessions">{t("header.sessions")}</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <div className="mt-5 space-y-6">
            <CustomHeading
              title={t("profile.header.heading")}
              description={t("profile.header.description")}
            />
            <ChangeAvatarForm />
          </div>
        </TabsContent>
        <TabsContent value="account"></TabsContent>
        <TabsContent value="appearance"></TabsContent>
        <TabsContent value="notifications"></TabsContent>
        <TabsContent value="sessions"></TabsContent>
      </Tabs>
    </div>
  );
}
