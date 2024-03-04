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
import { useProjectConfig } from "@/custom/projectConfig";
import LoginButton_Auth0 from "@/components/account/LoginButton_Auth0";

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

function NavbarMenuItem_Constom(props: LinkProps) {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(pathname == props.href);
  }, [pathname, props.href]);

  return (
    <NavbarMenuItem isActive={isActive}>
      <Link color={isActive ? "primary" : "foreground"} {...props}></Link>
    </NavbarMenuItem>
  );
}

export default function Header() {
  let { maxWidth_CONST } = LayoutStore;
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const config = useProjectConfig();

  return (
    <Navbar isBordered maxWidth={maxWidth_CONST} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
        <NavbarLogo />
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarLogo />

        {config.navMenu.map((menu, index) => {
          return (
            <NavbarItem_Constom href={menu.href} key={index}>
              {menu.title}
            </NavbarItem_Constom>
          );
        })}
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
        <NavbarItem>
          <LoginButton_Auth0 />
          {/* <Button as={Link} color="primary" href="#" variant="flat">
            Login
          </Button> */}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {config.navMenu.map((menu, index) => (
          <NavbarMenuItem_Constom href={menu.href} key={index}>
            {menu.title}
          </NavbarMenuItem_Constom>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
