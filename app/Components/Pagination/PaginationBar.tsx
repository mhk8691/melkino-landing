"use client";
import React from "react";
import { Box, Button, Pagination, PaginationItem } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export type PaginationBarProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  boundaryCount?: number;
  disabled?: boolean;
};

const toPersianDigits = (n: number): string => n.toLocaleString("fa-IR");

const navButtonSx = {
  flexShrink: 0,
  minWidth: "auto",
  px: { xs: 1.25, sm: 2 },
  py: 0.75,
  gap: 0.5,
  borderRadius: "8px",
  border: "1px solid #e6e9f0",
  backgroundColor: "#f6f7fb",
  color: "#3d4656",
  fontFamily: "inherit",
  fontSize: "0.75rem",
  fontWeight: 600,
  textTransform: "none",
  boxShadow: "none",
  "& .MuiButton-startIcon, & .MuiButton-endIcon": {
    m: 0,
  },
  "&:hover": {
    backgroundColor: "#eceff6",
    boxShadow: "none",
  },
  "&.Mui-disabled": {
    backgroundColor: "#f8f9fb",
    borderColor: "#eef0f4",
    color: "#c4cad4",
  },
} as const;

export default function PaginationBar({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  boundaryCount = 1,
  disabled = false,
}: PaginationBarProps) {
  if (totalPages <= 1) return null;

  const goTo = (page: number) => {
    if (disabled || page < 1 || page > totalPages || page === currentPage)
      return;
    onPageChange(page);
  };

  return (
    <Box
      dir="rtl"
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: { xs: 1, md: 2 },
        px: { xs: 1.25, md: 2 },
        py: 1.25,
        borderRadius: 3,
        border: "1px solid #eef0f4",
        boxShadow: "0 4px 20px rgba(20, 30, 60, 0.06)",
        bgcolor: "background.paper",
      }}
    >
      <Button
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage === 1 || disabled}
        startIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
        sx={navButtonSx}
      >
        <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
          صفحه قبلی
        </Box>
      </Button>

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(_event, page) => goTo(page)}
        siblingCount={siblingCount}
        boundaryCount={boundaryCount}
        disabled={disabled}
        dir="rtl"
        shape="rounded"
        renderItem={(item) => {
          if (item.type === "previous" || item.type === "next") return null;

          if (item.type === "start-ellipsis" || item.type === "end-ellipsis") {
            return (
              <Box
                component="span"
                sx={{
                  px: 0.5,
                  color: "#a3abb8",
                  fontSize: "0.9rem",
                  userSelect: "none",
                }}
              >
                …
              </Box>
            );
          }

          return (
            <PaginationItem
              {...item}
              page={item.page !== null ? toPersianDigits(item.page) : null}
              sx={{
                "& .MuiTouchRipple-root": { display: "none" },
                minWidth: { xs: 32, md: 36 },
                height: { xs: 32, md: 36 },
                mx: { xs: 0.25, md: 0.5 },
                borderRadius: "8px",
                fontFamily: "inherit",
                fontSize: "0.875rem",
                fontWeight: item.selected ? 700 : 600,
                color: item.selected ? "#fff" : "#3d4656",
                backgroundColor: item.selected ? "#1f5fc9" : "transparent",
                transition: "background-color .15s",
                "&:hover": {
                  backgroundColor: item.selected ? "#1a52ae" : "#f1f3f8",
                },
                "&.Mui-selected": {
                  backgroundColor: "#1f5fc9",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#1a52ae" },
                },
              }}
            />
          );
        }}
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          overflowX: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
          "& ul": {
            flexWrap: "nowrap",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      />

      <Button
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage === totalPages || disabled}
        endIcon={<ArrowBackIcon sx={{ fontSize: 16 }} />}
        sx={navButtonSx}
      >
        <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
          صفحه بعدی
        </Box>
      </Button>
    </Box>
  );
}
