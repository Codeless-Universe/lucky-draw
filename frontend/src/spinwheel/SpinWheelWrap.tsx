import SpinWheelDom from "./SpinWheelDom";
import "./spinwheel.css";

export default function SpinWheelWrap() {
  return (
    <div className="">
      <SpinWheelDom labels={["#fa8c16", "#faad14", "#a0d911", "#52c41a", "#13c2c2", "#1890ff", "#722ed1", "#eb2f96"]} />
    </div>
  );
}
