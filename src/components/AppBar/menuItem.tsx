"use client";

import { ListItem, ListItemButton, MenuItem as MuiMenuItem, useTheme } from "@mui/material";
import React, { MouseEventHandler } from "react";
import { usePathname, useRouter } from "next/navigation";

interface IProps {
  href: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  isMobile?: boolean;
}

const MenuItem: React.FC<React.PropsWithChildren<IProps>> = ({ href, onClick, isMobile, children }) => {
  if (isMobile) {
    return <MobileMenuItem {...{ href, onClick, children }} />;
  } else {
    return <DesktopMenuItem {...{ href, onClick, children }} />;
  }
};

const DesktopMenuItem: React.FC<React.PropsWithChildren<Omit<IProps, "isMobile">>> = ({ href, onClick, children }) => {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const handlePrefetch = () => {
    if (onClick === undefined) {
      router.prefetch(href);
    }
  };

  const handleRedirect = () => {
    router.push(href);
  };

  return (
    <div>
      <ListItem sx={{ justifyContent: "center" }}>
        <ListItemButton
          selected={pathname === href}
          href={href}
          onMouseEnter={handlePrefetch}
          onClick={onClick ?? handleRedirect}
          sx={{
            borderRadius: `${theme.shape.borderRadius}px`,
          }}
        >
          {children}
        </ListItemButton>
      </ListItem>
    </div>
  );
};

const MobileMenuItem: React.FC<React.PropsWithChildren<Omit<IProps, "isMobile">>> = ({ href, onClick, children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handlePrefetch = () => {
    if (onClick === undefined) {
      router.prefetch(href);
    }
  };

  const handleRedirect = () => {
    router.push(href);
  };

  return (
    <MuiMenuItem
      selected={pathname === href}
      href={href}
      onMouseEnter={handlePrefetch}
      onClick={onClick ?? handleRedirect}
    >
      {children}
    </MuiMenuItem>
  );
};

export default MenuItem;
