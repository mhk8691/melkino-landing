"use client";
import React, { useState } from "react";
import StatsFilterBar, { FilterItem } from "../Filter/StatsFilterBar";

type TabType = "all" | "buy" | "rent" | 'requests';

const ITEMS: FilterItem<TabType>[] = [
  {
    key: "all",
    value: 'همه فایل ها',
    count: "۱۶۸۰",
    color: "#d99a1e",
  },
  {
    key: "buy",
    value: 'خرید و فروش',
    count: "۱۰۰۰",
    color: "#2563c9",
  },
  {
    key: "rent",
    value: 'رهن و اجاره',
    count: "۳۴۰",
    color: "#7b3fb0",
  },
  {
    key: "requests",
    value: 'درخواست ها',
    count: "۳۴۰",
    color: "#d1495b",
  },
];
export default function SavedItems() {
  const [tab, setTab] = useState<TabType>("all");

  return <StatsFilterBar items={ITEMS} value={tab} onChange={setTab} />;
}