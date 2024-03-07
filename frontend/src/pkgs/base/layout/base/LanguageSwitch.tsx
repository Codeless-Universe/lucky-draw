"use client";

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { useVoerkaI18n } from "@voerkai18n/react";
import { useEffect, useState } from "react";

export default function LanguageSwitch() {
  const { t, activeLanguage, changeLanguage, languages, defaultLanguage } = useVoerkaI18n();
  const [currentLanguage, setCurrentLanguage] = useState(activeLanguage);

  useEffect(() => {
    // 直接使用 activeLanguage，网页会卡顿一下
    if (activeLanguage == currentLanguage) {
      return;
    }
    setCurrentLanguage(activeLanguage);
  }, [activeLanguage]);

  return (
    <Dropdown>
      <DropdownTrigger>
        {/* <Button variant="bordered">Open Menu</Button> */}
        <Button isIconOnly variant="bordered" onClick={() => {}}>
          {/* <SVGWrap svg={SVGMapper.materialLanguageFilled} /> */}
          {(() => {
            let map = { zh: "简", cht: "繁" };
            // @ts-ignore
            let retValue = map[currentLanguage];
            if (retValue) {
              return retValue;
            }
            return currentLanguage?.toUpperCase();
          })()}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        items={languages}
        selectedKeys={[currentLanguage + ""]}
        onAction={(key) => {
          setCurrentLanguage(key.toString());
          changeLanguage(key.toString());
        }}
      >
        {(item) => <DropdownItem key={item.name}>{item.title}</DropdownItem>}
      </DropdownMenu>
    </Dropdown>
  );
}
