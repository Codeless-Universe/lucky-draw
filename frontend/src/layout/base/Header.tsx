import ThemeDarkSwitch from "@/layout/theme/ThemeDarkSwitch";
import {
  Link,
  LinkProps,
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { LayoutStore } from "../helper/LayoutHelper";
import NavbarLogo from "../../custom/logo/NavbarLogo";
import { usePathname, useRouter } from "next/navigation";
import LanguageSwitch from "@/layout/base/LanguageSwitch";
import { useVoerkaI18n } from "@voerkai18n/react";

function NavbarItem_Constom(props: LinkProps) {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(pathname == props.href);
  }, [pathname, props.href]);

  return (
    <NavbarItem isActive={isActive}>
      <Link color={isActive ? "primary" : "foreground"} {...props}></Link>
    </NavbarItem>
  );
}

export default function Header() {
  let { maxWidth_CONST } = LayoutStore;
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { t } = useVoerkaI18n();

  const menuItems = ["Home"];

  return (
    <Navbar isBordered maxWidth={maxWidth_CONST} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
        <NavbarLogo />
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarLogo />

        <NavbarItem_Constom href="/">{t("首页")}</NavbarItem_Constom>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <LanguageSwitch />
        </NavbarItem>

        <NavbarItem>
          <ThemeDarkSwitch />
        </NavbarItem>
        {/* <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Login
          </Button>
        </NavbarItem> */}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"}
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
