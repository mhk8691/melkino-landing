import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

export type SortValue = "newest" | "cheapest" | "expensive" | "popular";
export type ViewValue = "list" | "grid";

interface SortOption {
  value: SortValue;
  label: string;
}

const SORT_OPTIONS: SortOption[] = [
  { value: "newest", label: "جدیدترین فایل‌ها" },
  { value: "cheapest", label: "ارزان‌ترین" },
  { value: "expensive", label: "گران‌ترین" },
  { value: "popular", label: "محبوب‌ترین" },
];

export interface FileToolbarProps {
  total?: number;
  from?: number;
  to?: number;
  defaultSort?: SortValue;
  defaultView?: ViewValue;
  sortValue?: SortValue;
  viewValue?: ViewValue;
  onSortChange?: (sort: SortValue) => void;
  onViewChange?: (view: ViewValue) => void;
}

// تابع کمکی برای تبدیل مطمئن اعداد به فارسی
const toPersianDigits = (n: number): string => {
  return n.toLocaleString("fa-IR");
};

export default function FileToolbar({
  total = 1240,
  from = 1,
  to = 6,
  defaultSort = "newest",
  sortValue,
  onSortChange,
}: FileToolbarProps): React.JSX.Element {
  // پشتیبانی همزمان از حالت Controlled و Uncontrolled
  const [sort, setSort] = useState<SortValue>(sortValue ?? defaultSort);

  useEffect(() => {
    if (sortValue !== undefined) setSort(sortValue);
  }, [sortValue]);


  const handleSortChange = (
    _event: React.MouseEvent<HTMLElement>,
    newSort: SortValue | null,
  ): void => {
    if (newSort !== null) {
      if (sortValue === undefined) setSort(newSort);
      onSortChange?.(newSort);
    }
  };



  return (
    <Box
      sx={{
        width: "100%",
        direction: "rtl",
      }}
    >
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
          px: 2,
          py: 1,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        {/* Result count + view toggle */}
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", whiteSpace: "nowrap" }}
          >
            نمایش {toPersianDigits(from)} تا {toPersianDigits(to)} از{" "}
            {toPersianDigits(total)} فایل
          </Typography>

         

   
        </Stack>
        {/* Sort controls */}
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", whiteSpace: "nowrap" }}
          >
            :مرتب‌سازی بر اساس
          </Typography>

          <ToggleButtonGroup
            value={sort}
            exclusive
            onChange={handleSortChange}
            size="small"
            sx={{
              gap: 0.5,
              "& .MuiToggleButtonGroup-grouped": {
                border: "none",
                borderRadius: "8px !important",
                px: 1.5,
                color: "text.secondary",
                fontSize: "0.8125rem",
                textTransform: "none",
                "&.Mui-selected": {
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                },
              },
            }}
          >
            {SORT_OPTIONS.map((opt) => (
              <ToggleButton key={opt.value} value={opt.value}>
                {opt.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Stack>
      </Stack>
    </Box>
  );
}
