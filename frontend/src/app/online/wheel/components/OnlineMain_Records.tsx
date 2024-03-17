import { api } from "@convex/_generated/api";
import { Chip, Listbox, ListboxItem, User } from "@nextui-org/react";
import { useQuery } from "convex/react";
import { UserIdentity } from "convex/server";

function formatTimestamp(timestamp: number) {
  // 创建一个新的 Date 对象，传入时间戳（毫秒为单位）
  var date = new Date(timestamp);

  // 获取年、月、日、时、分、秒
  var year = date.getFullYear();
  var month = (date.getMonth() + 1).toString().padStart(2, "0"); // 月份从 0 开始，需要加 1
  var day = date.getDate().toString().padStart(2, "0");
  var hours = date.getHours().toString().padStart(2, "0");
  var minutes = date.getMinutes().toString().padStart(2, "0");
  var seconds = date.getSeconds().toString().padStart(2, "0");

  // 构建 YYYY-MM-DD hh:mm:ss 格式的日期字符串
  var formattedDate = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;

  return formattedDate;
}

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
                  <div>{user.email}</div>
                  <div>{formatTimestamp(_creationTime)}</div>
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
