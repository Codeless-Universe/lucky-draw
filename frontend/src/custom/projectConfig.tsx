import { useVoerkaI18n } from "@voerkai18n/react";

export const useProjectConfig = () => {
  const { t } = useVoerkaI18n();
  return {
    navMenu: [
      {
        title: t("Single"),
        href: "/",
      },
      {
        title: t("Offline"),
        href: "/offline",
      },
      {
        title: t("Online"),
        href: "/online",
      },
    ],
  };
};
