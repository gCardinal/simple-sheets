import { NavLink } from "@libs/ui";
import { Link, type LinkProps } from "@tanstack/react-router";
import type { FC, PropsWithChildren } from "react";

export interface NavigationProps extends PropsWithChildren {
  onClick?: () => void | Promise<void>;
  to: LinkProps["to"];
  params?: LinkProps["params"];
}

/**
 * Small wrapper around the UI lib's link component and tanstack's link component.
 * Just to clean up our code a bit :)
 */
export const Navigation: FC<NavigationProps> = ({
  onClick,
  children,
  ...linkParams
}) => (
  <NavLink
    renderRoot={({ className }) => (
      <Link {...linkParams} className={className} onClick={onClick}>
        {children}
      </Link>
    )}
  />
);
