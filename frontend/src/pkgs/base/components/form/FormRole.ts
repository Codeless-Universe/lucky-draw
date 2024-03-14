import { RegisterOptions } from "react-hook-form";

export const FormRole = {
  minLength(value: number) {
    let retObj: RegisterOptions["minLength"] = {
      value: value,
      message: `min length is ${value}`,
    };
    return { minLength: retObj };
  },
  maxLength(value: number) {
    let retObj: RegisterOptions["maxLength"] = {
      value: value,
      message: `max length is ${value}`,
    };
    return { maxLength: retObj };
  },
  // 正则全部复制在这里,以便共享
  // https://any-rule.vercel.app/
  mail() {
    let retObj: RegisterOptions["pattern"] = {
      value: /^[\.A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
      message: "Email format error",
    };
    return { pattern: retObj };
  },
  equalsOtherField(field = "password", errorMsg = "Passwords are not same") {
    // https://react-hook-form.com/docs/useform/register
    return {
      // @ts-ignore
      validate: (value: string, formValues) => {
        if (formValues[field] == value) {
          return true;
        }
        return errorMsg;
      },
    };
  },
};
