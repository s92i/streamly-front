import { MEDIA_URL } from "@/lib/constants/url.constants";

export function constructUrl(key?: string | null): string | undefined {
  if (!key) return undefined;

  if (key.startsWith("http://") || key.startsWith("https://")) {
    return key;
  }

  const base = MEDIA_URL.replace(/\/+$/, "");
  const path = key.replace(/^\/+/, "");

  return `${base}/${path}`;
}
