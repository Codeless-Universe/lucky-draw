import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@nextui-org/react";

export default function LoginButton() {
  const { loginWithRedirect, loginWithPopup } = useAuth0();
  return (
    <Button
      onPress={() => {
        // loginWithRedirect();
        loginWithPopup();
      }}
    >
      Log in
    </Button>
  );
}
