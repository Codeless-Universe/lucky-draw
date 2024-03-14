import { api } from "@convex/_generated/api";
import { User, Button } from "@nextui-org/react";
import { useMutation } from "convex/react";
import { toast } from "react-toastify";

export default function OnlineMain_Players(props: { ownerSubject: string }) {
  const joinWheel = useMutation(api.room.joinWheel);

  return (
    <div className="flex flex-col items-start gap-2">
      <div>
        <User
          name="Jane Doe"
          description="Product Designer"
          avatarProps={{
            name: "Jan",
            size: "sm",
          }}
        />
      </div>

      <div>
        <User
          name="Jane Doe"
          description="Product Designer"
          avatarProps={{
            name: "Jan",
            size: "sm",
          }}
        />
      </div>

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
