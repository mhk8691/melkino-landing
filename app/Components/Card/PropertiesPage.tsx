"use client";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import CardFile from "./CardFile";
import { propertyItem } from "@/app/page";
import StarIcon from "@mui/icons-material/Star";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import StatsFilterBar, { FilterItem } from "../Filter/StatsFilterBar";
import FileToolbar from "../Sort/Sort";
import PaginationBar from "../Pagination/PaginationBar";
import ResponsiveFilter from "../Filter/ResponsiveFilter";
type TabType = "vip" | "all" | "requests";
const ITEMS: FilterItem<TabType>[] = [
  {
    key: "vip",
    value: "فایل‌های ویژه و VIP",
    icon: StarIcon,
    color: "#d99a1e",
  },
  {
    key: "all",
    value: "همه فایل‌های ملکی",
    icon: ApartmentIcon,
    color: "#2563c9",
  },
  {
    key: "requests",
    value: "تقاضا و درخواست‌های ملک",
    icon: ManageSearchIcon,
    color: "#7b3fb0",
  },
];
export default function PropertiesPage() {
  const [tab, setTab] = useState<TabType>("vip");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 24;
  return (
    <>
      <StatsFilterBar items={ITEMS} value={tab} onChange={setTab} />

      <Grid container spacing={2}>
       <ResponsiveFilter/>

        {/* کارت‌ها */}
        <Grid
          container
          size={{ xs: 12, md: 8, lg: 9 }}
          rowSpacing={2}
          columnSpacing={1}
        >
          <FileToolbar />
          {[1, 2, 3, 4, 5].map((item) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 3 }} key={item}>
              <CardFile data={propertyItem}  />
            </Grid>
          ))}
          <PaginationBar
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            siblingCount={1}
            boundaryCount={1}
          />
        </Grid>
      </Grid>
    </>
  );
}
