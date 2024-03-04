"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@nextui-org/react";
import { useConvexAuth } from "convex/react";
import { useEffect } from "react";
import ButtonLoading from "../feedback/ButtonLoading";
import AccountUserInfo_Auth0 from "./AccountUserInfo_Auth0";

export default function LoginButton_ICP() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { user, loginWithRedirect, loginWithPopup } = useAuth0();

  useEffect(() => {}, []);

  if (isLoading) {
    return <Button isLoading={true}></Button>;
  }
  if (isAuthenticated) {
    return <AccountUserInfo_Auth0 />;
  }

  return (
    <>
      <ButtonLoading
        color="primary"
        href="#"
        variant="flat"
        onClick={async () => {
          await loginWithPopup();
        }}
      >
        Login
      </ButtonLoading>
    </>
  );
}
