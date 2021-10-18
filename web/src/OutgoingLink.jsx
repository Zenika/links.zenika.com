import React from "react";
import { ExternalLink } from "./ExternalLink";

export function OutgoingLink({ outgoing_link }) {
  let outgoingUrl = outgoing_link;
  try {
    outgoingUrl = new URL(outgoingUrl).host + "...";
  } catch (err) {
    console.warn(`Could not parse '${outgoingUrl}' as a URL`);
  }
  return (
    <ExternalLink href={outgoing_link} title={outgoing_link}>
      {outgoingUrl}
    </ExternalLink>
  );
}
