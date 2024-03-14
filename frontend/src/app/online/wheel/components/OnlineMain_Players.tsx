import { api } from "@convex/_generated/api";
import { User, Button, Chip } from "@nextui-org/react";
import { useMutation, useQuery } from "convex/react";
import { UserIdentity } from "convex/server";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function OnlineMain_Players(props: { room: any }) {
  const joinWheel = useMutation(api.room.joinWheel);
  const list = useQuery(api.room.queryMembers, {
    roomId: props.room._id,
  });

  useEffect(() => {
    let join = async () => {
      await joinWheel({
        roomId: props.room._id,
      });
    };

    const intervalId = setInterval(() => {
      join();
    }, 40 * 1000);
    join();

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="flex flex-col items-start gap-2">
      {list?.map((item) => {
        const lastAt: number = item.lastAt;
        const user: UserIdentity = item.userIdentity;
        return (
          <div key={user.subject} className="flex flex-row items-center justify-center gap-2">
            <User
              name={user.name}
              description={user.email}
              avatarProps={{
                name: user.name || user.email,
                size: "sm",
              }}
            />
            {(() => {
              if (user.subject == props.room.ownerSubject) {
                return (
                  <Chip size="sm" color="primary">
                    Owner
                  </Chip>
                );
              }
              return <></>;
            })()}
            {/* <Chip size="sm" color="warning" variant="dot">
              Current
            </Chip> */}
            {(() => {
              if (lastAt + 60000 < Date.now())
                return (
                  <Chip size="sm" variant="dot" color="danger">
                    Offline
                  </Chip>
                );
            })()}
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
