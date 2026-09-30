"use client";
import { useState } from "react";
import { Box, Button, Drawer, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import TuneIcon from "@mui/icons-material/Tune";
import CardFile from "./CardFile";
import { propertyItem } from "@/app/page";
import StarIcon from "@mui/icons-material/Star";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import AdvancedFilterPanel from "../Filter/AdvancedFilterPanel";
import StatsFilterBar, { FilterItem } from "../Filter/StatsFilterBar";
import FileToolbar from "../Sort/Sort";
type TabType = "vip" | "all" | "requests";
const ITEMS: FilterItem<TabType>[] = [
  {
    key: "vip",
    value: "فایل‌های ویژه و VIP",
    count: "۱,۲۴۰",
    icon: StarIcon,
    color: "#d99a1e",
  },
  {
    key: "all",
    value: "همه فایل‌های ملکی",
    count: "۱۸,۵۰۰",
    icon: ApartmentIcon,
    color: "#2563c9",
  },
  {
    key: "requests",
    value: "تقاضا و درخواست‌های ملک",
    count: "۳۴۰",
    icon: ManageSearchIcon,
    color: "#7b3fb0",
  },
];
export default function PropertiesPage() {
  const theme = useTheme();
  const [tab, setTab] = useState<TabType>("vip");
  const isMobile = useMediaQuery(theme.breakpoints.down("md"), { noSsr: true });
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <>
      <StatsFilterBar items={ITEMS} value={tab} onChange={setTab} />
     
      <Grid container spacing={2}>
        {isMobile ? (
          <>
            <Grid size={12}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<TuneIcon />}
                onClick={() => setFilterOpen(true)}
                sx={{ py: 1.2, borderRadius: "10px", fontWeight: 700 }}
              >
                فیلترهای پیشرفته
              </Button>
            </Grid>

            <Drawer
              anchor="bottom"
              open={filterOpen}
              onClose={() => setFilterOpen(false)}
              keepMounted
              slotProps={{
                paper: {
                  sx: {
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    maxHeight: "90dvh",
                  },
                },
              }}
            >
              <AdvancedFilterPanel
                embedded
                onClose={() => setFilterOpen(false)}
                onApply={() => setFilterOpen(false)}
              />
            </Drawer>
          </>
        ) : (
          <Grid size={{ md: 4, lg: 3 }}>
            <Box sx={{ position: "sticky", top: 16 }}>
              <AdvancedFilterPanel />
            </Box>
          </Grid>
        )}

        {/* کارت‌ها */}
        <Grid container size={{ xs: 12, md: 8, lg: 9 }} rowSpacing={2} columnSpacing={1}>
           <FileToolbar />
          {[1, 2, 3, 4, 5].map((item) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 3 }} key={item}>
              <CardFile data={propertyItem} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
