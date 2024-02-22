"use client";

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { useVoerkaI18n } from "@voerkai18n/react";

export default function LanguageSwitch() {
  const { t, activeLanguage, changeLanguage, languages, defaultLanguage } = useVoerkaI18n();

  return (
    <Dropdown>
      <DropdownTrigger>
        {/* <Button variant="bordered">Open Menu</Button> */}
        <Button isIconOnly variant="bordered" onClick={() => {}}>
          {/* <SVGWrap svg={SVGMapper.materialLanguageFilled} /> */}
          {(() => {
            let map = { zh: "简", cht: "繁" };
            // @ts-ignore
            let retValue = map[activeLanguage];
            if (retValue) {
              return retValue;
            }
            return activeLanguage?.toUpperCase();
          })()}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        items={languages}
        selectedKeys={[activeLanguage + ""]}
        onAction={(key) => {
          changeLanguage(key.toString());
        }}
      >
        {(item) => <DropdownItem key={item.name}>{item.title}</DropdownItem>}
      </DropdownMenu>
    </Dropdown>
  );
}
