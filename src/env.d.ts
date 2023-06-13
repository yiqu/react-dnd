/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_POKEAPI_URL: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_GITHUB_REPO_URL: string;
  readonly VITTE_CIRCLE_CI_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}