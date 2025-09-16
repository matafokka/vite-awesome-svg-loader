import { BASE_URL } from "@/const";
import { prefixUrl } from "@/utils/prefixUrl.mjs";

export function addBasePathIfNeeded(url: string) {
  return prefixUrl(BASE_URL, url);
}
