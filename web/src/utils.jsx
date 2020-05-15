import React from "react";

if (!process.env.ABSOLUTE_LINK_PREFIX) {
  throw new Error("ABSOLUTE_LINK_PREFIX is not set");
}

const absoluteLinkPrefix = process.env.ABSOLUTE_LINK_PREFIX;

export function toAbsoluteIncomingLink(relativeIncomingLink) {
  const link = relativeIncomingLink
    ? absoluteLinkPrefix + relativeIncomingLink
    : "";
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {link}
    </a>
  );
}

export function toLinkOpeningNewTab(outgoingLink) {
  return (
    <a href={outgoingLink} target="_blank" rel="noopener noreferrer">
      {outgoingLink}
    </a>
  );
}
