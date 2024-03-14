import { FieldError } from "react-hook-form";

let msgMap: { [key: string]: string } = {
  required: "This is required.",
};

export const FormErrorMsg = {
  getMsgByType: (fieldError?: FieldError) => {
    if (!fieldError) {
      return "";
    }

    if (fieldError.message) {
      return fieldError.message;
    }

    let msg = msgMap[fieldError.type];
    if (msg) {
      return msg;
    }
    return fieldError.type;
  },
};
