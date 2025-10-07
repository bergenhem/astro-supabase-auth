interface ImportMetaEnv {
  readonly SUPABASE_URL: string;
  readonly SUPABASE_ANON_KEY: string;
  readonly TURNSTILE_SITE_KEY: string;
  readonly TURNSTILE_SECRET_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  onTurnstileSuccess: (token: string) => void;
}
