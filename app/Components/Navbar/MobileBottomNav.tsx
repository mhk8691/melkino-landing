"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AddRounded from "@mui/icons-material/AddRounded";
import { NAV_ITEMS, isNavActive } from "./nav-items";
import SubmitMenu from "./SubmitMenu";
import styles from "./navbar.module.css";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return <>
    <nav className={styles.bottom} aria-label="ناوبری پایین صفحه">
      <div className={styles.bottomInner}>
        {NAV_ITEMS.map(({ key, href, label, icon: Icon, activeIcon: ActiveIcon }) => {
          if (key === "submit") return <button
            key={key}
            type="button"
            className={styles.submitBottom}
            aria-label="ثبت ملک یا درخواست ملک"
            aria-haspopup="menu"
            aria-expanded={Boolean(anchorEl)}
            aria-controls={anchorEl ? "bottom-submit-menu" : undefined}
            onClick={event => setAnchorEl(event.currentTarget)}
          ><span className={styles.submitIcon}><AddRounded /></span><span>ثبت</span></button>;
          const active = isNavActive(pathname, href);
          return <Link key={key} href={href} className={styles.bottomLink} aria-current={active ? "page" : undefined}>
            <span className={styles.bottomIcon}>{active ? <ActiveIcon /> : <Icon />}</span><span>{label}</span>
          </Link>;
        })}
      </div>
    </nav>
    <SubmitMenu id="bottom-submit-menu" anchorEl={anchorEl} onClose={() => setAnchorEl(null)} placement="top" />
  </>;
}
