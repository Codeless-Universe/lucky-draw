import SpinWheelWrap from "@/spinwheel/SpinWheelWrap";
import { api } from "@convex/_generated/api";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { useQuery } from "convex/react";

export default function WheelCardList() {
  const wheels = useQuery(api.wheel.get);
  return (
    <div className="grid grid-cols-3 gap-4">
      {wheels?.map((item, index) => {
        console.log(item);
        return (
          <div key={index}>
            <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
              <CardBody className="overflow-visible p-0">
                <SpinWheelWrap labels={item.wheels[0].items}></SpinWheelWrap>
              </CardBody>
              <CardFooter className="justify-between text-small">
                <b>{item.title}</b>
                <p className="text-default-500">{item.price}</p>
              </CardFooter>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
