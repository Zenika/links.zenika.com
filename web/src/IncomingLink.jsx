import React from "react";
import { ExternalLink } from "./ExternalLink";
import { toAbsoluteIncomingLink } from "./absoluteIncomingLink";

export function IncomingLink(linkRecord) {
  const absoluteLink = toAbsoluteIncomingLink(linkRecord.incoming_link);
  return (
    <ExternalLink href={absoluteLink} title={absoluteLink}>
      ...{linkRecord.incoming_link}
    </ExternalLink>
  );
}
