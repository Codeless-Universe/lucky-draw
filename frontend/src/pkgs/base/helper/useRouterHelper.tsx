import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export type TRouteRetBean<T extends object> = {
  path: string;
  param: T;
  router: AppRouterInstance;
  push: (param: { [key: string]: any }) => void;
  replace: (param: { [key: string]: any }) => void;
};

export function useRouterHelper<T extends { [key: string]: string | number | string[] }, O extends object>(
  defaultParam: T,
  otherParam?: O,
): TRouteRetBean<T & O> {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  let getParams = () => {
    let retParam = Object.assign({}, defaultParam);

    let allSearchParams: { [key: string]: string[] } = {};
    searchParams.forEach((value, name) => {
      allSearchParams[name] = searchParams.getAll(name);
    });

    for (let k in defaultParam) {
      let defaultValue = defaultParam[k];
      //取得数组
      let tempValue = searchParams.getAll(k);
      let array: string[] = [];
      if (!tempValue) {
        if (typeof defaultValue == "string") {
          array = [defaultValue];
        } else if (typeof defaultValue == "number") {
          array = [defaultValue + ""];
        } else {
          // @ts-ignore
          array = defaultValue;
        }
      } else if (typeof tempValue == "string") {
        array = [tempValue];
      } else if (tempValue instanceof Array) {
        array = tempValue;
      }

      //合并值
      if (typeof defaultValue == "string") {
        // @ts-ignore
        retParam[k] = array[0];
      } else if (typeof defaultValue == "number") {
        // @ts-ignore
        retParam[k] = parseFloat(array[0]);
      } else {
        // @ts-ignore
        retParam[k] = array;
      }
    }

    const buildURL = (param: { [key: string]: any }) => {
      const array = [];
      for (let k in param) {
        let value = param[k];
        if (value instanceof Array) {
          value.forEach((v) => {
            array.push(k + "=" + v);
          });
        } else {
          array.push(k + "=" + value);
        }
      }
      return pathname + "?" + array.join("&");
    };

    return {
      allSearchParams: allSearchParams,
      param: Object.assign({}, retParam, otherParam),
      path: pathname,
      router: router,
      push: (param: { [key: string]: any }) => {
        let newURL = buildURL(Object.assign({}, allSearchParams, param));
        router.push(newURL);
      },
      replace: (param: { [key: string]: any }) => {
        let newURL = buildURL(Object.assign({}, allSearchParams, param));
        router.replace(newURL);
      },
    };
  };
  const [retState, setRetState] = useState<TRouteRetBean<T & O>>(getParams());

  useEffect(() => {
    let newObj = getParams();
    // console.log("新路由", newObj);
    setRetState(newObj);
  }, [pathname, router, searchParams]);

  return retState;
}

export function useRouterPage<T extends { [key: string]: string | number | string[] }, O extends object>(
  defaultParam: T,
  otherParam?: O,
): TRouteRetBean<
  T &
    O & {
      currentPage: number;
      pageSize: number;
    }
> {
  let retState = useRouterHelper(
    Object.assign(
      {},
      {
        currentPage: 1,
        pageSize: 2,
      },
      defaultParam,
    ),
    otherParam,
  );
  return retState;
}
