import { MEDIA_URL } from "@/lib/constants/url.constants";

export function useConstructUrl(key?: string | null): string | undefined {
  if (!key) return undefined;
  const base = MEDIA_URL?.replace(/\/+$/, "") || "";
  const path = key.replace(/^\/+/, "");
  return `${base}/${path}`;
}
