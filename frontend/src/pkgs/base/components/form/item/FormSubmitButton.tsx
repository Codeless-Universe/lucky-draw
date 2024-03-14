import { Button, ButtonProps } from "@nextui-org/react";
import { useContext } from "react";
import { FormContext, TFormContext } from "../FormWrap";

type TProps = {} & ButtonProps;

export default function FormSubmitButton({ type = "submit", ...props }: TProps) {
  const formContext: TFormContext = useContext(FormContext);
  return (
    <Button type={type} isLoading={formContext.submitStatus == "SUBMITING"} {...props}>
      {props.children}
    </Button>
  );
}
