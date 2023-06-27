/// <reference types="vite/client" />
/// <reference types="redux-persist" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_POKEAPI_URL: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_GITHUB_REPO_URL: string;
  readonly VITE_CIRCLE_CI_URL: string;
  readonly VITE_POKEMON_YELLOW_COLOR: string;
  readonly VITE_POKEMON_BLUE_COLOR: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}