import { SubmitHandler, useForm, UseFormReturn } from "react-hook-form";

import React, { createContext, forwardRef, Ref, useEffect, useImperativeHandle, useRef, useState } from "react";

export type TFormContext = {
  debugName?: string;
  validator: UseFormReturn<any, any>;
  submitStatus: "NONE" | "SUBMITING" | "DONE";
  addCustomValidator: (field: string, fn: () => Promise<any>) => void;
  setFormData: (handledData: object) => void;
  submit: () => Promise<any>;
};

// @ts-ignore
export const FormContext = createContext<TFormContext>({});

export function FormWrapHander<T extends any>(init: () => Promise<T>, onSubmit?: (formData: T) => Promise<void>) {
  return {
    init: init,
    onSubmit: onSubmit,
  };
}

export function FormWrap(
  props: {
    formWrapHanderInstance: ReturnType<typeof FormWrapHander<any>>;
    debugName?: string;
    className?: string;
    children: JSX.Element | JSX.Element[];
  },
  ref: Ref<any> | undefined,
) {
  const validator = useForm({});
  const [submitStatus, setSubmitStatus] = useState<TFormContext["submitStatus"]>("NONE");
  const [customValidators, setCustomValidators] = useState<
    {
      field: string;
      fn: () => Promise<any>;
    }[]
  >([]);

  useEffect(() => {
    if (!props.formWrapHanderInstance?.init) {
      return;
    }
    props.formWrapHanderInstance.init().then((t) => {
      for (let key in t) {
        let val = t[key];
        validator.setValue(key, val);
      }
    });
  }, []);

  const formContext: TFormContext = {
    debugName: props.debugName,
    validator: validator,
    submitStatus: submitStatus,
    addCustomValidator: (field: string, fn) => {
      let newList = customValidators;
      let isAdded = false;
      for (let i = 0; i < newList.length; i++) {
        let item = newList[i];
        if (item?.field == field) {
          newList[i] = { field, fn };
          isAdded = true;
          break;
        }
      }
      if (!isAdded) {
        newList.push({ field, fn });
      }

      console.debug(
        `Form Validate ${props.debugName} customValidators=` +
          (() => {
            let msgs: string[] = [];
            newList.forEach((item) => {
              msgs.push(item.field);
            });
            return msgs.join(", ");
          })(),
      );
      setCustomValidators(newList);
    },
    setFormData: (handledData: object) => {},
    submit: async () => {},
  };

  useImperativeHandle(ref, () => {
    return formContext;
  });

  const {
    formState: { errors },
    handleSubmit,
  } = validator;

  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log("form", data);

    if (props.formWrapHanderInstance?.onSubmit) {
      setSubmitStatus("SUBMITING");
      try {
        await props.formWrapHanderInstance.onSubmit(data);
      } finally {
        setSubmitStatus("DONE");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* {Object.keys(errors).length > 0 && (
          <div className="z-10 mx-3 mt-3 h-12 text-red-500">{JSON.stringify(errors)}</div>
        )} */}
        <FormContext.Provider value={formContext}>
          <div className={props.className}>{props.children}</div>
        </FormContext.Provider>
      </form>
    </div>
  );
}

export default forwardRef(FormWrap);
