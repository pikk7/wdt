import React from "react";
import { FacebookProvider, ShareButton } from "react-facebook";

export default function FacebookShare() {
  return (
    <FacebookProvider appId="1017644115423946">
      <ShareButton href="https://people.inf.elte.hu/migmir/wdt">
        Share
      </ShareButton>
    </FacebookProvider>
  );
}
