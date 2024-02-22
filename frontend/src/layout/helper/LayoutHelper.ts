import resso from "resso";

// copy form: https://github.com/nextui-org/nextui/blob/9d4c7ed9cf46df182437089e746e255b4b22bd42/packages/core/theme/src/components/navbar.ts#L186
let MAX_WIDTH_CONFIG = {
  sm: {
    wrapper: "max-w-[640px]",
  },
  md: {
    wrapper: "max-w-[768px]",
  },
  lg: {
    wrapper: "max-w-[1024px]",
  },
  xl: {
    wrapper: "max-w-[1280px]",
  },
  "2xl": {
    wrapper: "max-w-[1536px]",
  },
  full: {
    wrapper: "max-w-full",
  },
};

type KEYS = keyof typeof MAX_WIDTH_CONFIG;

export const LayoutStore = resso({
  maxWidth_CONST: "lg" as KEYS,
  maxWidth_tailwindclass: MAX_WIDTH_CONFIG.lg.wrapper,
});

export const LayoutHelper = {
  setWidth(maxWidth: KEYS) {
    let { maxWidth_CONST } = LayoutStore;
    if (maxWidth_CONST == maxWidth) {
      return;
    }
    LayoutStore.maxWidth_CONST = maxWidth;
    LayoutStore.maxWidth_tailwindclass = MAX_WIDTH_CONFIG[maxWidth].wrapper;
  },
};
