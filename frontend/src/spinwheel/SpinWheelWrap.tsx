import SpinWheelDom, { TProps_SpinWheelDom } from "./SpinWheelDom";
import "./spinwheel.css";

export default function SpinWheelWrap(props: TProps_SpinWheelDom) {
  return (
    <div className="">
      <SpinWheelDom labels={props.labels} />
      {/* <SpinWheelDom labels={["#fa8c16", "#faad14", "#a0d911", "#52c41a", "#13c2c2", "#1890ff", "#722ed1", "#eb2f96"]} /> */}
    </div>
  );
}
