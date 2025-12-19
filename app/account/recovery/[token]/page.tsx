import { NewPasswordForm } from "@/components/features/auth/forms/NewPasswordForm";
import { NO_INDEX_PAGE } from "@/lib/constants/seo.constants";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("auth.newPassword");

  return {
    title: t("heading"),
    ...NO_INDEX_PAGE,
  };
}

export default function NewPasswordPage() {
  return <NewPasswordForm />;
}
