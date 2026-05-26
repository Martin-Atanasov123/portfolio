/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Web3Forms public access key — get yours free at https://web3forms.com */
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
