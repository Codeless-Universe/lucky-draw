import LoginButton_Auth0 from "@/pkgs/auth0/components/LoginButton_Auth0";
import { useConvexAuth } from "convex/react";

export default function OnlineMain() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  if (isLoading) {
    return <div></div>;
  }
  if (!isAuthenticated) {
    return (
      <div>
        <LoginButton_Auth0></LoginButton_Auth0>
      </div>
    );
  }

  return (
    <div>
      <h1>OnlineMain</h1>
    </div>
  );
}
