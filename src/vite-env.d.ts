/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  interface ImportMetaEnv {
    VITE_API_URL: string;
    VITE_SITE_KEY:string;
    VITE_SITE_SECRET:string;
  }
  const component: DefineComponent<{}, {}, any>
  export default component
}
