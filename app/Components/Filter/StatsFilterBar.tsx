"use client";
import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";

type TabType = "vip" | "all" | "requests";

const TABS: {
  key: TabType;
  label: string;
  count: string;
  icon: React.ElementType;
  iconColor: string; // رنگ آیکون در حالت فعال
  chipBg: string; // پس‌زمینه‌ی شمارنده در حالت فعال
  chipColor: string;
}[] = [
  {
    key: "vip",
    label: "فایل‌های ویژه و VIP",
    count: "۱,۲۴۰",
    icon: StarIcon,
    iconColor: "#d99a1e",
    chipBg: "#fde5c3",
    chipColor: "#c2680a",
  },
  {
    key: "all",
    label: "همه فایل‌های ملکی",
    count: "۱۸,۵۰۰",
    icon: ApartmentIcon,
    iconColor: "#2563c9",
    chipBg: "#dce8fb",
    chipColor: "#1d4fa3",
  },
  {
    key: "requests",
    label: "تقاضا و درخواست‌های ملک",
    count: "۳۴۰",
    icon: ManageSearchIcon,
    iconColor: "#7b3fb0",
    chipBg: "#eddff7",
    chipColor: "#6a2d9e",
  },
];

const ACTIVE_TEXT = "#1a4fa3";
const IDLE_TEXT = "#5b6472";

type Props = {
  defaultTab?: TabType;
  onTabChange?: (tab: TabType) => void;
};

export default function StatsFilterBar({
  defaultTab = "vip",
  onTabChange,
}: Props) {
  const [activeTab, setActiveTab] = useState<TabType>(defaultTab);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: { xs: "14px", md: "16px" },
        border: "1px solid #eef0f4",
        boxShadow: "0 4px 20px rgba(20, 30, 60, 0.06)",
        p: { xs: 1, md: 1.25 },
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        alignItems: { xs: "stretch", lg: "center" },
        justifyContent: "center",
        gap: { xs: 1.5, lg: 2 },
        minWidth: 0,
      }}
    >
      {/* ==================== سمت راست: تب‌ها ==================== */}
      <Box
        role="tablist"
        aria-label="فیلتر فایل‌ها"
        sx={{
          backgroundColor: "#f3f5f9",
          borderRadius: "14px",
          p: 0.5,
          display: "flex",
          gap: 0.5,
          minWidth: 0,
          maxWidth: "100%",
          overflowX: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          const Icon = tab.icon;

          return (
            <Button
              key={tab.key}
              role="tab"
              aria-selected={isActive}
              disableRipple
              onClick={() => handleTabChange(tab.key)}
              sx={{
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: { xs: 1.5, md: 2.25 },
                py: { xs: 0.9, md: 1.1 },
                borderRadius: "10px",
                whiteSpace: "nowrap",
                fontSize: { xs: "0.78rem", md: "0.875rem" },
                fontWeight: isActive ? 800 : 600,
                color: isActive ? ACTIVE_TEXT : IDLE_TEXT,
                backgroundColor: isActive ? "#fff" : "transparent",
                boxShadow: isActive
                  ? "0 2px 8px rgba(20, 30, 60, 0.1)"
                  : "none",
                transition:
                  "background-color 0.2s ease, box-shadow 0.2s ease, color 0.2s ease",
                "&:hover": {
                  backgroundColor: isActive ? "#fff" : "rgba(255,255,255,0.6)",
                },
                "&:focus-visible": {
                  outline: "2px solid #2563c9",
                  outlineOffset: 2,
                },
              }}
            >
              <Icon
                sx={{
                  fontSize: { xs: 18, md: 20 },
                  color: isActive ? tab.iconColor : "#8b93a1",
                }}
              />
              <Box component="span">{tab.label}</Box>
              <Box
                component="span"
                sx={{
                  px: 1,
                  py: 0.2,
                  borderRadius: "7px",
                  fontSize: { xs: "0.68rem", md: "0.72rem" },
                  fontWeight: 700,
                  lineHeight: 1.6,
                  backgroundColor: isActive ? tab.chipBg : "#e4e7ed",
                  color: isActive ? tab.chipColor : IDLE_TEXT,
                }}
              >
                {tab.count}
              </Box>
            </Button>
          );
        })}
      </Box>
    </Box>
  );
}
