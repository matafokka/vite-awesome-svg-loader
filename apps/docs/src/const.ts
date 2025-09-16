let baseUrl = import.meta.env.BASE_URL || "";

if (!baseUrl.endsWith("/")) {
  baseUrl += "/";
}

/**
 * Normalized base URL. For now, only trailing slash is appended.
 */
export const BASE_URL = baseUrl;
