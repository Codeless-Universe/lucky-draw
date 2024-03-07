import LoginButton_Auth0 from "@/pkgs/auth0/components/LoginButton_Auth0";
import LanguageSwitch from "@/pkgs/base/layout/base/LanguageSwitch";
import ThemeDarkSwitch from "@/pkgs/base/layout/theme/ThemeDarkSwitch";
import { useVoerkaI18n } from "@voerkai18n/react";

export const useProjectConfig = () => {
  const { t } = useVoerkaI18n();
  return {
    nav: {
      menus: [
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
      rightItems: [<LanguageSwitch />, <ThemeDarkSwitch />, <LoginButton_Auth0 />],
    },
  };
};
