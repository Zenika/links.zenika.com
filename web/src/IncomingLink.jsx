import React from "react";
import { ExternalLink } from "./ExternalLink";
import { toAbsoluteIncomingLink } from "./absoluteIncomingLink";

export function IncomingLink({ incoming_link }) {
  const absoluteLink = toAbsoluteIncomingLink(incoming_link);
  return (
    <ExternalLink href={absoluteLink} title={absoluteLink}>
      ...{incoming_link}
    </ExternalLink>
  );
}
