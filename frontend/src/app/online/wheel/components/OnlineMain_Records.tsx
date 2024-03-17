import { api } from "@convex/_generated/api";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { useQuery } from "convex/react";

export default function OnlineMain_Records(props: { room: any }) {
  const list = useQuery(api.room.queryRecords, {
    roomId: props.room._id,
  });
  console.log("xxxx", list);
  if (!list) {
    return <div>Loading</div>;
  }
  if (list.length === 0) {
    return <div>No records</div>;
  }

  // <ListboxItem key="new" description="Result1 | restul2">
  //       Play1
  //     </ListboxItem>
  //     <ListboxItem key="new2" description="Result1 | restul2">
  //       Play2
  //     </ListboxItem>
  return (
    <Listbox aria-label="Actions" onAction={(key) => alert(key)} items={list}>
      {(item) => (
        <ListboxItem key={item._id} description={item.resultValue}>
          {item.playerInfo.nickname} {item.playerInfo.email}
        </ListboxItem>
      )}
    </Listbox>
  );
}
