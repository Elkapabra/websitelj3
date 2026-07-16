declare module "@gsap/react" {
  import { RefObject } from "react";

  export interface useGSAPConfig {
    scope?: RefObject<any> | HTMLElement | null;
    dependencies?: any[];
    revertOnUpdate?: boolean;
  }

  export function useGSAP(
    callback: () => void,
    config?: useGSAPConfig | any[]
  ): void;
}
