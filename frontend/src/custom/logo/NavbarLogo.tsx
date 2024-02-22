import { Image, Link, NavbarBrand as Nextui_NavbarBrand } from "@nextui-org/react";
import Logo from "./Logo";

export default function NavbarLogo() {
  return (
    <Nextui_NavbarBrand>
      <Logo />
      <Link color="foreground" href="/">
        {/* <p className="font-bold text-inherit">ProjectName</p> */}
      </Link>
    </Nextui_NavbarBrand>
  );
}
