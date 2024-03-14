import { Input, InputProps, Radio, RadioGroup } from "@nextui-org/react";
import { useContext } from "react";
import { Controller, RegisterOptions } from "react-hook-form";
import { FormContext, TFormContext } from "../FormWrap";
import { FormErrorMsg } from "../FormErrorMsg";

type TProps = {
  field: string;
  rules?: RegisterOptions;
} & InputProps;

export default function FormRadio({ isRequired = true, ...props }: TProps) {
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
            <RadioGroup
              label={
                <span
                  className={`text-foreground-600 text-xs font-medium ${
                    isRequired ? "after:text-danger after:ml-0.5 after:content-['*']" : ""
                  } `}
                >
                  {props.label}
                </span>
              }
              orientation="horizontal"
              onChange={onChange}
              value={value ? value : ""}
            >
              <Radio value="Y">
                <span className="text-foreground-700 text-sm">Yes</span>
              </Radio>
              <Radio value="N">
                <span className="text-foreground-700 text-sm">No</span>
              </Radio>
            </RadioGroup>
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
