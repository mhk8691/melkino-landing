"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Drawer, IconButton } from "@mui/material";
import LocationOnOutlined from "@mui/icons-material/LocationOnOutlined";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import MenuRounded from "@mui/icons-material/MenuRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import BookmarkBorderRounded from "@mui/icons-material/BookmarkBorderRounded";
import PersonOutlineRounded from "@mui/icons-material/PersonOutlineRounded";
import AddRounded from "@mui/icons-material/AddRounded";
import { isNavActive } from "./nav-items";
import LocationPickerModal, { type LocationValue } from "../ChooseCity/LocationPickerModal";
import AdvancedFilterPanel from "../Filter/AdvancedFilterPanel";
import SearchBox from "./SearchBox";
import SubmitMenu from "./SubmitMenu";
import styles from "./navbar.module.css";

const links = [
  { href: "/", label: "خانه" },
  { href: "/files", label: "فایل‌های ملکی" },
  { href: "/vip", label: "فایل‌های ویژه" },
  { href: "/requests", label: "درخواست‌های ملکی" },
  { href: "/categories", label: "دسته‌بندی‌ها" },
];

export default function DesktopNavbar() {
  const pathname = usePathname();
  const [locationOpen, setLocationOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [location, setLocation] = useState<LocationValue>({ allIran: false, cities: ["tehran"], provinces: [] });
  const cityNames: Record<string, string> = { tehran: "تهران", karaj: "کرج", mashhad: "مشهد", shiraz: "شیراز", isfahan: "اصفهان", tabriz: "تبریز", kish: "کیش", qeshm: "قشم" };
  const locationCount = location.cities.length + location.provinces.length;
  const cityLabel = location.allIran ? "سراسر ایران" : locationCount === 0 ? "انتخاب شهر" : locationCount === 1 ? cityNames[location.cities[0]] ?? "منطقه منتخب" : `${locationCount.toLocaleString("fa-IR")} منطقه`;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [submitAnchor, setSubmitAnchor] = useState<HTMLElement | null>(null);
  const handleSearch = (query: string) => { console.log("search:", query); };

  return <>
    <header className={styles.header}>
      <div className={styles.shell}>
        <div className={styles.topRow}>
          <IconButton className={styles.menuButton} aria-label="باز کردن منوی اصلی" aria-expanded={drawerOpen} aria-controls={drawerOpen ? "main-navigation-drawer" : undefined} onClick={() => setDrawerOpen(true)}><MenuRounded /></IconButton>
          <Link href="/" className={styles.brand} aria-label="ملکینو، صفحه اصلی">
            <Image src="/images/melkino.png" alt="" width={48} height={48} priority />
            <span><strong>ملکینو</strong><small>همراه شما تا خانه</small></span>
          </Link>
          <div className={styles.searchRow}>
            <button type="button" className={styles.city} aria-label="انتخاب شهر" onClick={() => setLocationOpen(true)}><LocationOnOutlined /><span>{cityLabel}</span><KeyboardArrowDown /></button>
            <div className={styles.search}><SearchBox onSearch={handleSearch} onFilterClick={() => setFilterOpen(true)} /></div>
          </div>
          <div className={styles.actions}>
            <Link href="/saved" className={styles.iconLink} aria-label="نشان‌ها" aria-current={isNavActive(pathname, "/saved") ? "page" : undefined}><BookmarkBorderRounded /></Link>
            <Link href="/panel" className={styles.account} aria-label="ملکینوی من"><PersonOutlineRounded /><span>ملکینوی من</span></Link>
            <button type="button" className={styles.submitDesktop} onClick={event => setSubmitAnchor(event.currentTarget)} aria-haspopup="menu" aria-expanded={Boolean(submitAnchor)} aria-controls={submitAnchor ? "header-submit-menu" : undefined}><AddRounded /> ثبت آگهی</button>
          </div>
        </div>
        <nav className={styles.desktopLinks} aria-label="منوی اصلی سایت">
          {links.map(({ href, label }) => <Link key={href} href={href} aria-current={isNavActive(pathname, href) ? "page" : undefined}>{label}</Link>)}
          <Link className={styles.support} href="https://panel.mlkino.com/support">چت و تماس</Link>
        </nav>
      </div>
    </header>
    <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} slotProps={{ paper: { sx: { width: 320, maxWidth: "calc(100vw - 32px)" } } }}>
      <div id="main-navigation-drawer" className={styles.drawer}>
        <div className={styles.drawerTitle}><strong>منوی ملکینو</strong><IconButton aria-label="بستن منو" onClick={() => setDrawerOpen(false)}><CloseRounded /></IconButton></div>
        <nav aria-label="منوی اصلی موبایل">{[...links, { href: "/saved", label: "نشان‌ها" }, { href: "https://panel.mlkino.com/support", label: "چت و تماس" }, { href: "/panel", label: "ملکینوی من" }].map(({ href, label }) => <Link key={href} href={href} onClick={() => setDrawerOpen(false)} aria-current={isNavActive(pathname, href) ? "page" : undefined}>{label}</Link>)}</nav>
      </div>
    </Drawer>
    <SubmitMenu id="header-submit-menu" anchorEl={submitAnchor} onClose={() => setSubmitAnchor(null)} />
    <Drawer anchor="bottom" open={filterOpen} onClose={() => setFilterOpen(false)} slotProps={{ paper: { sx: { maxHeight: "90dvh", borderRadius: "24px 24px 0 0", pb: "env(safe-area-inset-bottom)" } } }}>
      <div className={styles.filterPanel}><AdvancedFilterPanel embedded onClose={() => setFilterOpen(false)} onApply={() => setFilterOpen(false)} /></div>
    </Drawer>
    <LocationPickerModal open={locationOpen} value={location} onApply={setLocation} onClose={() => setLocationOpen(false)} />
  </>;
}
