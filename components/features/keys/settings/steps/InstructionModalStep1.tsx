import { useTranslations } from "next-intl";

export function InstructionModalStep1() {
  const t = useTranslations("layout.dashboard.keys.instructionModal");

  return (
    <>
      <h2 className="text-lg font-semibold">{t("step1Title")}</h2>
      <p className="text-sm text-muted-foreground">{t("step1Description")}</p>
      <ol className="list-inside list-decimal space-y-2 pl-4">
        <li className="text-sm text-muted-foreground">
          <strong>{t("downloadObs")}</strong>
          <br />
          {t("downloadObsDescription")}{" "}
          <a
            href="https://obsproject.com"
            className="text-blue-500 underline hover:text-blue-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("obsLinkText")}
          </a>
        </li>
        <li className="text-sm text-muted-foreground">
          <strong>{t("copyKeys")}</strong>
          <br />
          {t("copyKeysDescription")}
        </li>
      </ol>
    </>
  );
}
