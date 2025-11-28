import { useTranslations } from "next-intl";

export function InstructionModalStep2() {
  const t = useTranslations("layout.dashboard.keys.instructionModal");

  return (
    <>
      <h2 className="mt-4 text-lg font-semibold">{t("step2Title")}</h2>
      <p className="text-sm text-muted-foreground">{t("step2Description")}</p>
      <ol className="list-inside list-decimal space-y-2 pl-4">
        <li className="text-sm text-muted-foreground">
          <strong>{t("openObs")}</strong>
          <br />
          {t("openObsDescription")}
        </li>
        <li className="text-sm text-muted-foreground">
          <strong>{t("openStreamSettings")}</strong>
          <br />
          {t("openStreamSettingsDescription")}
        </li>
        <li className="text-sm text-muted-foreground">
          <strong>{t("enterDetails")}</strong>
          <br />
          {t("enterDetailsDescription")}
        </li>
        <li className="text-sm text-muted-foreground">
          <strong>{t("saveSettings")}</strong>
          <br />
          {t("saveSettingsDescription")}
        </li>
      </ol>
    </>
  );
}
