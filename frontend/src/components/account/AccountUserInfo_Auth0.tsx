import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";

export default function AccountUserInfo_Auth0(props: {}) {
  const { user, loginWithPopup } = useAuth0();

  return (
    <div>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <div className="flex cursor-pointer items-center gap-2">
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name={user?.email}
              size="sm"
            />
            <div className="hidden flex-col sm:flex">
              <span className="text-tiny text-default-400">{user?.email}</span>
            </div>
          </div>
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem
            key="logout"
            color="danger"
            onClick={async () => {
              await loginWithPopup();
            }}
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
