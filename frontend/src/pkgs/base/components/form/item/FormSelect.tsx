import { Input, InputProps, Select, SelectItem, SelectProps } from "@nextui-org/react";
import { useContext } from "react";
import { Controller, RegisterOptions } from "react-hook-form";
import { FormContext, TFormContext } from "../FormWrap";
import { FormErrorMsg } from "../FormErrorMsg";

type TProps = {
  field: string;
  rules?: RegisterOptions;
} & SelectProps;

export default function FormSelect({ isRequired = true, ...props }: TProps) {
  const formContext: TFormContext = useContext(FormContext);

  let rules = props.rules;
  if (!rules) {
    rules = {};
  }

  return (
    <Controller
      control={formContext.validator.control}
      rules={{
        required: isRequired,
        ...rules,
      }}
      render={(handler) => {
        const {
          field: { onChange, onBlur, value },
          fieldState,
        } = handler;

        return (
          <div>
            <Select
              selectedKeys={(() => {
                let array: any[] = [];
                if (value) {
                  if (value instanceof Array) {
                    array = value;
                  } else {
                    array = [value];
                  }
                }
                return new Set(array);
              })()}
              onChange={(e) => {
                let value = e.target.value;
                if (typeof value == "boolean") {
                  onChange(value);
                  return;
                }

                let array = (value + "").split(",");

                let index = array.indexOf("UnLimit");
                if (index == array.length - 1) {
                  array = ["UnLimit"]; //最后一个是未选中
                } else if (index == 0) {
                  array.shift();
                }
                if (props.selectionMode == "multiple") {
                  onChange(array);
                } else {
                  onChange(array.join(","));
                }
              }}
              isRequired={isRequired}
              color={fieldState.invalid ? "danger" : "default"}
              {...props}
            >
              {props.children}
            </Select>
            {/* <div>
              {value} {typeof value} {(value instanceof Array) + " "}
            </div> */}
            {fieldState.invalid && (
              <div className="pt-1 pb-2 text-sm font-light text-red-500">
                {FormErrorMsg.getMsgByType(fieldState.error)}
              </div>
            )}
          </div>
        );
      }}
      name={props.field}
    />
  );
}
