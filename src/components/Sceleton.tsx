import React from "react";
import ContentLoader from "react-content-loader";

export const Sceleton: React.FC = () => (
  <ContentLoader
    speed={2}
    width={280}
    height={425}
    viewBox="0 0 280 425"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="140" cy="134" r="130" />
    <rect x="25" y="271" rx="15" ry="15" width="230" height="38" />
    <rect x="0" y="321" rx="15" ry="15" width="280" height="50" />
    <rect x="26" y="389" rx="5" ry="5" width="80" height="25" />
    <rect x="146" y="380" rx="15" ry="15" width="100" height="45" />
  </ContentLoader>
);
