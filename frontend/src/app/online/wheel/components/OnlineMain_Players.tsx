import { api } from "@convex/_generated/api";
import { User, Button } from "@nextui-org/react";
import { useMutation, useQuery } from "convex/react";
import { UserIdentity } from "convex/server";
import { toast } from "react-toastify";

export default function OnlineMain_Players(props: { ownerSubject: string }) {
  const joinWheel = useMutation(api.room.joinWheel);
  const list = useQuery(api.room.queryMembers, {
    ownerSubject: props.ownerSubject,
  });

  return (
    <div className="flex flex-col items-start gap-2">
      {list?.map((item) => {
        const user: UserIdentity = item.userIdentity;
        return (
          <div key={user.subject}>
            <User
              name={user.name}
              description={user.email}
              avatarProps={{
                name: user.name || user.email,
                size: "sm",
              }}
            />
          </div>
        );
      })}

      <div>
        <Button
          onPress={async () => {
            await joinWheel({
              ownerSubject: props.ownerSubject,
            });
            toast("Wow so easy!");
          }}
        >
          Invite friends
        </Button>
      </div>
    </div>
  );
}
