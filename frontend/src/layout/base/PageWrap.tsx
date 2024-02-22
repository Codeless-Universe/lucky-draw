import { LayoutStore } from "../helper/LayoutHelper";

export default function PageWrap(props: { children?: React.ReactNode; className?: string }) {
  let { maxWidth_tailwindclass } = LayoutStore;
  return (
    <div className={["flex w-full max-w-[100vw] items-center justify-center"].join(" ")}>
      <div
        // max-w-[1536px] 是限制 PC 端大屏, max-w-[100vw] 是限制移动端不要把容器撑宽.
        className={["w-full px-6 pt-6", maxWidth_tailwindclass, props.className].join(" ")}
      >
        {props.children}
      </div>
    </div>
  );
}
