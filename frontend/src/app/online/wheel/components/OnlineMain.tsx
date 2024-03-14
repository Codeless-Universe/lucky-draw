import LoginButton_Auth0 from "@/pkgs/auth0/components/LoginButton_Auth0";
import { useRouterHelper } from "@/pkgs/base/helper/useRouterHelper";
import { useAuth0 } from "@auth0/auth0-react";
import { useConvexAuth, useMutation } from "convex/react";
import { useEffect } from "react";
import OnlineMainGame from "./OnlineMainGame";
import { api } from "@convex/_generated/api";

export default function OnlineMain() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { user, logout } = useAuth0();
  const { param, replace } = useRouterHelper({ id: "", ownerId: "", roomId: "" });
  const createRoom = useMutation(api.room.createRoom);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    // if (!param.ownerId) {
    //   replace({ ownerId: [user?.sub] });
    // }
    if (!param.roomId) {
    }
  }, [param, user, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div>
        <div className="my-4 text-default-700">Please log in to your account first</div>
        <LoginButton_Auth0></LoginButton_Auth0>
      </div>
    );
  }
  if (!param.roomId) {
    return (
      <div
        onClick={async () => {
          const res = await createRoom({
            wheelId: param.id,
          });
          console.log("id", res.id);
        }}
      >
        Creating room...{" "}
      </div>
    );
  }

  return <OnlineMainGame />;
}
