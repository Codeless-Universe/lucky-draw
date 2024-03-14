import LoginButton_Auth0 from "@/pkgs/auth0/components/LoginButton_Auth0";
import { useConvexAuth } from "convex/react";
import OnlineMainGame from "./OnlineMainGame";
import { useRouterHelper } from "@/pkgs/base/helper/useRouterHelper";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@nextui-org/react";

export default function OnlineMain() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { user, logout } = useAuth0();
  const { param, replace } = useRouterHelper({ id: "", ownerId: "" });

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    if (!param.ownerId) {
      replace({ ownerId: [user?.sub] });
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

  return <OnlineMainGame />;
}
