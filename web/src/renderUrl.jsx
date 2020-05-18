import React from "react";

export function toLinkOpeningNewTab(link) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {link}
    </a>
  );
}
