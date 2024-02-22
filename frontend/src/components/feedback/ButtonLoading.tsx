import { Button, ButtonProps } from "@nextui-org/react";
import { useState } from "react";

export default function ButtonLoading({ onClick, children, ...props }: {} & ButtonProps) {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      {...props}
      isLoading={loading}
      onClick={async (e) => {
        setLoading(true);
        try {
          if (onClick) {
            await onClick(e);
          }
        } finally {
          setLoading(false);
        }
      }}
    >
      {!loading && children}
    </Button>
  );
}
