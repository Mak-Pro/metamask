"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import HomeIcon from "@public/icons/nav-home-icon.svg";
// import BoostIcon from "@public/icons/nav-boost-icon.svg";
// import QuestIcon from "@public/icons/nav-quest-icon.svg";
// import ReferralIcon from "@public/icons/nav-referral-icon.svg";
// import RatingIcon from "@public/icons/nav-rating-icon.svg";
import styles from "./style.module.scss";
import clsx from "clsx";

// const navigationItems = [
//   { link: "/boost", icon: <BoostIcon />, text: "Boost" },
//   { link: "/quest", icon: <QuestIcon />, text: "Quest" },
//   { link: "/", icon: <HomeIcon />, text: "Home" },
//   { link: "/friends", icon: <ReferralIcon />, text: "Referral" },
//   { link: "/rating", icon: <RatingIcon />, text: "Rating" },
// ];

export const Navigation = () => {
  const path = usePathname();

  const isDynamicRoute = /^\/\d+$/.test(path);

  return (
    <nav className={styles.nav}>
      {/* {navigationItems.map((item) => (
        <div
          key={item.text}
          className={clsx(
            styles.nav__item,
            path === item.link && styles.nav__item_active,
            item.text === "Home" && isDynamicRoute && styles.nav__item_active,
            item.text === "Home" && styles.nav__item_main
          )}
        >
          <Link href={item.link} className={styles.nav__item_link}>
            Link
          </Link>
          <div className={styles.nav__item_icon}>{item.icon}</div>
          <span className={styles.nav__item_text}>{item.text}</span>
        </div>
      ))} */}
    </nav>
  );
};
