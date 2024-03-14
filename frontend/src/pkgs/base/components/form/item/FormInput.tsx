import { Input, InputProps } from "@nextui-org/react";
import { useContext } from "react";
import { Controller, RegisterOptions } from "react-hook-form";
import { FormContext, TFormContext } from "../FormWrap";
import { FormErrorMsg } from "../FormErrorMsg";

type TProps = {
  field: string;
  rules?: RegisterOptions;
  mask?: string;
} & InputProps;

export default function FormInput({ isRequired = true, ...props }: TProps) {
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
            <Input
              value={value ? value : ""}
              onChange={onChange}
              isRequired={isRequired}
              color={fieldState.invalid ? "danger" : "default"}
              {...props}
            />
            {fieldState.invalid && (
              <div className="pb-2 pt-1 text-sm font-light text-red-500">
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
