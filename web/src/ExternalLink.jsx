import React from "react";
import { Link } from "@material-ui/core";

export function ExternalLink({ href, children, ...props }) {
  return (
    <Link href={href} {...props} target="_blank" rel="noopener noreferrer">
      {children}
    </Link>
  );
}
