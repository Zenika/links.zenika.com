if (!process.env.ABSOLUTE_LINK_PREFIX) {
  throw new Error("ABSOLUTE_LINK_PREFIX is not set");
}

const absoluteLinkPrefix = process.env.ABSOLUTE_LINK_PREFIX;

export function toAbsoluteIncomingLink(relativeIncomingLink) {
  return relativeIncomingLink ? absoluteLinkPrefix + relativeIncomingLink : "";
}
