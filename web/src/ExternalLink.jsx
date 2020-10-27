import React from "react";
import { Link } from "@material-ui/core";

export function ExternalLink({ href, children }) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </Link>
  );
}
