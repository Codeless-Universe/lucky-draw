import LoginButton_Auth0 from "@/pkgs/auth0/components/LoginButton_Auth0";
import { useConvexAuth } from "convex/react";
import OnlineMainGame from "./OnlineMainGame";

export default function OnlineMain() {
  const { isLoading, isAuthenticated } = useConvexAuth();

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
