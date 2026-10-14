"use client";

import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import CardFile from "./CardFile";
import CardFileHorizontal from "./CardFileHorizontal";
import { propertyItem } from "@/app/page";
import StarIcon from "@mui/icons-material/Star";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import StatsFilterBar, { FilterItem } from "../Filter/StatsFilterBar";
import FileToolbar, { SortValue, ViewValue } from "../Sort/Sort";
import ResponsiveFilter from "../Filter/ResponsiveFilter";

type TabType = "vip" | "all" | "requests";

const ITEMS: FilterItem<TabType>[] = [
  {
    key: "vip",
    value: "فایل‌های ویژه",
    icon: StarIcon,
    color: "#d99a1e",
  },
  {
    key: "all",
    value: "فایل‌های ملکی",
    icon: ApartmentIcon,
    color: "#2563c9",
  },
  {
    key: "requests",
    value: "درخواست‌های ملکی",
    icon: ManageSearchIcon,
    color: "#7b3fb0",
  },
];

const VIEW_STORAGE_KEY = "files-view-mode";

export default function PropertiesPage() {
  const [tab, setTab] = useState<TabType>("vip");
  const [view, setView] = useState<ViewValue>("grid");
  const [sort, setSort] = useState<SortValue>("newest");

  // خواندن انتخاب ذخیره‌شده (داخل useEffect برای جلوگیری از hydration mismatch)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(VIEW_STORAGE_KEY);
      if (saved === "grid" || saved === "list") setView(saved);
    } catch {
      // localStorage در دسترس نیست
    }
  }, []);

  const handleViewChange = (next: ViewValue) => {
    setView(next);
    try {
      localStorage.setItem(VIEW_STORAGE_KEY, next);
    } catch {
      // نادیده گرفتن خطا
    }
  };

  const items = [1, 2, 3, 4, 5];
  const isList = view === "list";

  return (
    <>
      <StatsFilterBar items={ITEMS} value={tab} onChange={setTab} />

      <Grid container spacing={2}>
        <ResponsiveFilter />

        {/* کارت‌ها */}
        <Grid
          container
          size={{ xs: 12, md: 8, lg: 9 }}
          rowSpacing={2}
          columnSpacing={1}
          sx={{ alignContent: "flex-start" }}
        >
          <Grid size={12}>
            <FileToolbar
              total={items.length}
              from={1}
              to={items.length}
              sortValue={sort}
              onSortChange={setSort}
              viewValue={view}
              onViewChange={handleViewChange}
            />
          </Grid>

          {items.map((item) => (
            <Grid
              key={item}
              size={
                isList
                  ? { xs: 12 }
                  : { xs: 12, sm: 6, lg: 4, xl: 3 }
              }
              sx={{
                display: "flex",
                justifyContent: isList ? "stretch" : "center",
              }}
            >
              {isList ? (
                <CardFileHorizontal data={propertyItem} />
              ) : (
                <CardFile data={propertyItem} />
              )}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
}