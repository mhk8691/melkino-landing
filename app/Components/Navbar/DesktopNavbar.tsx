"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  IconButton,
  Avatar,
  Tooltip,
  Divider,
} from "@mui/material";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { NAV_ITEMS, isNavActive } from "./nav-items";
import LocationPickerModal from "../ChooseCity/LocationPickerModal";
import SearchBox from "./SearchBox";

type CitySelectorProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function CitySelector({ setOpen }: CitySelectorProps) {
  return (
    <Button
      color="inherit"
      aria-label="انتخاب شهر"
      onClick={() => setOpen(true)}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.35,
        borderRadius: 999,

        px: {
          xs: 0.75,
          sm: 1,
          md: 1.25,
          lg: 1.5,
        },

        py: 0.7,

        bgcolor: "grey.100",
        color: "text.primary",

        fontSize: {
          xs: "0.75rem",
          sm: "0.8rem",
          md: "0.82rem",
          lg: "0.85rem",
        },

        fontWeight: 500,
        whiteSpace: "nowrap",
        flexShrink: 0,

        "&:hover": {
          bgcolor: "grey.200",
        },
      }}
    >
      <LocationOnOutlinedIcon
        color="primary"
        sx={{
          fontSize: {
            xs: 16,
            sm: 17,
            md: 18,
          },
        }}
      />
      تهران
      <KeyboardArrowDownIcon
        sx={{
          fontSize: 17,
          color: "text.secondary",
        }}
      />
    </Button>
  );
}

export default function DesktopNavbar() {
  const pathname = usePathname();

  const saved = NAV_ITEMS.find((item) => item.key === "saved");

  const profile = NAV_ITEMS.find((item) => item.key === "profile");

  const SavedIcon = saved
    ? isNavActive(pathname, saved.href)
      ? saved.activeIcon
      : saved.icon
    : null;

  const [open, setOpen] = useState(false);

  const handleSearch = (query: string) => {
    console.log("search:", query);

    // بعداً می‌توانی سرچ واقعی را اینجا وصل کنی:
    //
    // router.push(
    //   `/search?q=${encodeURIComponent(query)}`
    // );
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        color="inherit"
        sx={{
          bgcolor: "rgba(255, 255, 255, 0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid",
          borderColor: "divider",
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "minmax(0, 1fr) minmax(0, 1.4fr)",

              md: "minmax(220px, 0.85fr) minmax(300px, 1.4fr) minmax(220px, 0.85fr)",
            },

            alignItems: "center",

            minHeight: {
              xs: 60,
              sm: 64,
              md: 72,
            },

            columnGap: {
              xs: 1,
              sm: 1.25,
              md: 2,
              lg: 3,
            },

            px: {
              xs: 1.25,
              sm: 2,
              md: 3,
              lg: 4,
            },
          }}
        >
          {/* ================================================= */}
          {/* Logo + City */}
          {/* ================================================= */}

          <Box
            sx={{
              gridColumn: {
                xs: "1 / 2",
                md: "1 / 2",
              },

              gridRow: 1,

              display: "flex",
              alignItems: "center",

              justifyContent: {
                xs: "flex-start",
                md: "flex-start",
              },

              gap: {
                xs: 0.75,
                sm: 1,
                md: 1.5,
                lg: 2,
              },

              minWidth: 0,
            }}
          >
            {/* Logo */}
            <Link
              href="/"
              aria-label="ملکینو، صفحه اصلی"
              style={{
                display: "flex",
                flexShrink: 0,
              }}
            >
              <Box
                component="span"
                sx={{
                  position: "relative",
                  display: "block",

                  width: {
                    xs: 34,
                    sm: 40,
                    md: 46,
                    lg: 52,
                  },

                  height: {
                    xs: 34,
                    sm: 40,
                    md: 46,
                    lg: 52,
                  },
                }}
              >
                <Image
                  src="/images/melkino.png"
                  alt="ملکینو"
                  fill
                  priority
                  sizes="52px"
                  style={{
                    objectFit: "contain",
                  }}
                />
              </Box>
            </Link>

            {/* City */}
            <CitySelector setOpen={setOpen} />
          </Box>

          {/* ================================================= */}
          {/* Search */}
          {/* زیر md = سمت چپ */}
          {/* md+ = وسط */}
          {/* ================================================= */}

          <Box
            sx={{
              gridColumn: {
                xs: "2 / 3",
                md: "2 / 3",
              },

              gridRow: 1,

              width: "100%",
              minWidth: 0,

              display: "flex",
              alignItems: "center",

              justifyContent: {
                xs: "flex-start",
                sm: "flex-start",
                md: "center",
              },
            }}
          >
            <SearchBox onSearch={handleSearch} />
          </Box>

          {/* ================================================= */}
          {/* Right Actions */}
          {/* فقط md به بالا */}
          {/* ================================================= */}

          <Box
            sx={{
              gridColumn: {
                xs: "none",
                md: "3 / 4",
              },

              gridRow: 1,

              display: {
                xs: "none",
                md: "flex",
              },

              alignItems: "center",
              justifyContent: "flex-end",

              gap: {
                md: 1,
                lg: 1.5,
              },

              minWidth: 0,
            }}
          >
            {/* ======================= */}
            {/* Saved */}
            {/* ======================= */}

            {saved && SavedIcon && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Tooltip title={saved.label}>
                  <IconButton
                    component={Link}
                    href={saved.href}
                    aria-label={saved.label}
                    sx={{
                      color: isNavActive(pathname, saved.href)
                        ? "primary.main"
                        : "text.secondary",

                      "&:hover": {
                        bgcolor: "grey.100",
                      },
                    }}
                  >
                    <SavedIcon />
                  </IconButton>
                </Tooltip>

                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    my: 2.5,
                    mx: 0.5,
                  }}
                />
              </Box>
            )}

            {/* ======================= */}
            {/* My Melkino / Profile */}
            {/* ======================= */}

            {profile && (
              <Box
                component={Link}
                href={profile.href}
                aria-current={
                  isNavActive(pathname, profile.href) ? "page" : undefined
                }
                sx={{
                  display: "flex",
                  alignItems: "center",

                  p: 0.5,
                  borderRadius: 999,

                  textDecoration: "none",
                  color: "inherit",

                  minWidth: 0,

                  "&:hover": {
                    bgcolor: "grey.100",
                  },
                }}
              >
                <Avatar
                  src="/images/profile.png"
                  alt=""
                  sx={{
                    width: 34,
                    height: 34,
                    flexShrink: 0,
                  }}
                />

                <Box
                  sx={{
                    ml: 1,
                    mr: 0.5,

                    whiteSpace: "nowrap",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 700,
                      lineHeight: 1.3,
                    }}
                  >
                    {profile.label}
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.2,
                    }}
                  >
                    پنل کاربری
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* ================================================= */}
      {/* Location Modal */}
      {/* ================================================= */}

      <LocationPickerModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
