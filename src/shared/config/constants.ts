// ─── Application Constants ──────────────────────────────────────────
// Centralized magic values. Never hardcode these in components.

export const APP_CONSTANTS = {
  /** Default items per page for paginated lists */
  DEFAULT_PAGE_SIZE: 20,

  /** Maximum file upload size in bytes (5MB) */
  MAX_UPLOAD_SIZE: 5 * 1024 * 1024,

  /** Debounce delay for search inputs (ms) */
  SEARCH_DEBOUNCE_MS: 300,

  /** Toast auto-dismiss duration (ms) */
  TOAST_DURATION_MS: 4000,

  /** LocalStorage keys */
  STORAGE_KEYS: {
    AUTH_TOKEN: "auth_token",
    THEME: "app_theme",
    LOCALE: "app_locale",
  },
} as const;
