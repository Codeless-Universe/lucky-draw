import { useVoerkaI18n } from "@voerkai18n/react";

export const useProjectConfig = () => {
  const { t } = useVoerkaI18n();
  return {
    navMenu: [
      {
        title: t("线下"),
        href: "/",
      },
      {
        title: t("线上"),
        href: "/online",
      },
    ],
  };
};
