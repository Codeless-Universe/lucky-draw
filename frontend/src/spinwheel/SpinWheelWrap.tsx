import SpinWheelDom from "./SpinWheelDom";
import "./spinwheel.css";

export default function SpinWheelWrap() {
  return (
    <div className="">
      <SpinWheelDom labels={["1", "2"]} />
    </div>
  );
}
