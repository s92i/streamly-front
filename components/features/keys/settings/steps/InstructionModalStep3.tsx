import { useTranslations } from "next-intl";

export function InstructionModalStep3() {
  const t = useTranslations("layout.dashboard.keys.instructionModal");

  return (
    <>
      <h2 className="mt-4 text-lg font-semibold">{t("step3Title")}</h2>
      <p className="text-sm text-muted-foreground">{t("step3Description")}</p>
      <ol className="list-inside list-decimal space-y-2 pl-4">
        <li className="text-sm text-muted-foreground">
          <strong>{t("startStream")}</strong>
          <br />
          {t("startStreamDescription")}
        </li>
        <li className="text-sm text-muted-foreground">
          <strong>{t("monitorStream")}</strong>
          <br />
          {t("monitorStreamDescription")}
        </li>
      </ol>
    </>
  );
}
