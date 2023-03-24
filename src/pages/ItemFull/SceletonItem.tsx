import React from "react";
import ContentLoader from "react-content-loader";
import styles from "./ItemFull.module.scss";

const SceletonItem: React.FC = () => (
  <>
    <ContentLoader
      speed={2}
      width={540}
      height={260}
      viewBox="0 0 540 260"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      className={styles.svg}
      data-testid="skeletonItem"
    >
      <circle cx="130" cy="130" r="130" />
      <rect x="288" y="10" rx="10" ry="10" width="231" height="36" />
      <rect x="348" y="89" rx="10" ry="10" width="115" height="27" />
      <rect x="275" y="140" rx="15" ry="15" width="253" height="54" />
      <rect x="330" y="203" rx="20" ry="20" width="152" height="38" />
    </ContentLoader>

    <ContentLoader
      speed={2}
      width={260}
      height={540}
      viewBox="0 0 260 540"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      className={styles.svg_mob}
    >
      <circle cx="130" cy="137" r="130" />
      <rect x="18" y="296" rx="10" ry="10" width="231" height="36" />
      <rect x="78" y="375" rx="10" ry="10" width="115" height="27" />
      <rect x="5" y="426" rx="15" ry="15" width="253" height="54" />
      <rect x="60" y="489" rx="20" ry="20" width="152" height="38" />
    </ContentLoader>
  </>
);

export default SceletonItem;
