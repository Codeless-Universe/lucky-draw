import { api } from "@convex/_generated/api";
import { Chip, Listbox, ListboxItem, User } from "@nextui-org/react";
import { useQuery } from "convex/react";
import { UserIdentity } from "convex/server";

export default function OnlineMain_Records(props: { room: any }) {
  const list = useQuery(api.room.queryRecords, {
    roomId: props.room._id,
  });
  if (!list) {
    return <div>Loading</div>;
  }
  if (list.length === 0) {
    return <div>No records</div>;
  }

  return (
    <div className="flex flex-col items-start gap-2">
      {list?.map((item) => {
        const _creationTime: number = item._creationTime;
        const user: UserIdentity = item.playerInfo;
        return (
          <div key={item._id} className="flex flex-row items-center justify-center gap-2">
            <User
              name={user.name}
              description={
                <div>
                  <div>user.email</div>
                  <div>{_creationTime}</div>
                </div>
              }
              avatarProps={{
                name: user.name || user.email,
                size: "sm",
              }}
            />
            <Chip size="sm" color="warning" variant="dot">
              {item.resultValue}
            </Chip>
          </div>
        );
      })}
    </div>
  );
}
