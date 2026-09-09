import React from "react";

export function AnchorLink({
  href,
  children,
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: React.ReactNode }) {
  return <a className={className} href={href} {...props}>{children}</a>;
}
