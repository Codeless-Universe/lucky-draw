import { ButtonProps, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import ButtonLoading from "./ButtonLoading";
import { useState } from "react";

export default function PopoverWrap(props: {
  children?: JSX.Element | JSX.Element[];
  renderChildren?: (set: (value: boolean) => void) => JSX.Element;
  onClick?: () => Promise<void>;
  title?: string;
  desc?: string;
  buttonProps?: ButtonProps;
  confirm?: JSX.Element;
  className?: string;
}) {
  let [isOpen, setIsOpen] = useState(false);

  let buttonProps = Object.assign(
    {
      color: "danger",
      size: "sm",
      children: "Submit",
    },
    props.buttonProps,
  );

  let dom = (
    <div className="px-1 py-2">
      <div className="text-small font-bold">{props.title}</div>
      <div className="text-tiny">{props.desc ? props.desc : "Please operate with caution."}</div>
      <div className="mt-3 flex flex-row">
        {(() => {
          return (
            <ButtonLoading
              onClick={async () => {
                if (props.onClick) {
                  await props.onClick();
                }
                setIsOpen(false);
              }}
              {...buttonProps}
            ></ButtonLoading>
          );
        })()}
      </div>
    </div>
  );
  if (props.confirm) {
    dom = props.confirm;
  }
  return (
    <Popover
      className={props.className}
      placement="bottom"
      isOpen={isOpen}
      onOpenChange={(isOpen) => {
        setIsOpen(isOpen);
      }}
    >
      <PopoverTrigger>
        <div className="cursor-pointer">
          {(() => {
            if (props.renderChildren) {
              return props.renderChildren(setIsOpen);
            }
            return props.children;
          })()}
        </div>
      </PopoverTrigger>
      <PopoverContent>{dom}</PopoverContent>
    </Popover>
  );
}
