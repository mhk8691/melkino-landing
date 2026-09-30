"use client";

import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Stack,
  Typography,
  Button,
  alpha,
} from "@mui/material";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import PhotoCameraRoundedIcon from "@mui/icons-material/PhotoCameraRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import PhoneInTalkRoundedIcon from "@mui/icons-material/PhoneInTalkRounded";
import { PropertyType } from "@/app/Core/types";
import { getPropertyTypeIcon } from "./PropertyTypeIcon";

export interface CardFileProps {
  /** داده کامل از نوع PropertyType شامل تمام فیلدهای مشترک و اختصاصی */
  data: PropertyType;
  /** برچسب ویژه اختیاری، مثل «فایل ویژه» یا «VIP» */
  badgeLabel?: string;
  /** وضعیت اولیه نشان‌شده بودن (بوکمارک) */
  initialBookmarked?: boolean;
  /** آیا مسئول/مشاور تایید شده است */
  isVerified?: boolean;
  /** کال‌بک کلیک روی دکمه نشان کردن */
  onBookmarkToggle?: (bookmarked: boolean) => void;
  /** کال‌بک کلیک روی دکمه مشاهده جزئیات */
  onDetailsClick?: (data: PropertyType) => void;
}

/** تابع کمکی فرمت اعداد */
const formatNumber = (num?: number) => {
  if (num === undefined || num === null || isNaN(num)) return "0";
  return num.toLocaleString("fa-IR");
};

/** تابع کمکی ترکیب فیلدهای مشترک موقعیت مکانی */
const getFormattedLocation = (data: PropertyType) => {
  const parts: string[] = [];
  if (data.city) parts.push(data.city);

  if (data.district) {
    parts.push(
      Array.isArray(data.district) ? data.district.join("، ") : data.district,
    );
  }

  if (data.neighborhood) {
    parts.push(
      Array.isArray(data.neighborhood)
        ? data.neighborhood.join("، ")
        : data.neighborhood,
    );
  }

  return parts.length > 0 ? parts.join("، ") : "موقعیت مشخص نشده";
};

export default function CardFile({
  data,
  badgeLabel,
  initialBookmarked = false,
  isVerified = false,
  onBookmarkToggle,
  onDetailsClick,
}: CardFileProps) {
  const [bookmarked, setBookmarked] = React.useState(initialBookmarked);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !bookmarked;
    setBookmarked(next);
    onBookmarkToggle?.(next);
  };

  const getDisplayArea = (): string => {
    if (data.area) return `${formatNumber(data.area)} متر`;
    if (data.areaFrom || data.areaTo) {
      return `${formatNumber(data.areaFrom || 0)} تا ${formatNumber(data.areaTo || 0)} متر`;
    }
    return "نامشخص";
  };

  // محاسبه قیمت بر اساس فیلدهای مشترک
  const isRentType =
    data.contractType === "رهن و اجاره" || data.contractType === "اجاره";
  const displayPriceValue = isRentType
    ? formatNumber(data.mortgagePrice || data.rent || data.mortgagePriceFrom)
    : formatNumber(data.totalPrice || data.totalPriceFrom);

  const personName =
    data.assignedTo || data.advisorName || data.ownerName || "کارشناس مربوطه";
  const getCoverImage = () => {
    if (data.images && data.images.length > 0) {
      const firstImg = data.images[0];
      if (typeof firstImg === "string") return firstImg;
      if (firstImg instanceof File) return URL.createObjectURL(firstImg);
    }
    return null;
  };
  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        maxWidth: 360,
        borderRadius: "12px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
        border: "1px solid #eef0f4",
          boxShadow: "0 4px 20px rgba(20, 30, 60, 0.06)",
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
        "&:hover": {
          boxShadow: "0 12px 28px rgba(20,68,147,0.14)",
          transform: "translateY(-3px)",
        },
      }}
    >
      {/* تصویر و بج‌ها */}
      {/* بخش تصویر / آیکون fallback */}
      <Box
        sx={{
          position: "relative",
          height: 200,
          width: "100%",
          bgcolor: "action.hover",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            data.images && data.images.length > 0
              ? "none"
              : (theme) =>
                  `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.primary.main, 0.2)} 100%)`,
        }}
      >
        {data.images && data.images.length > 0 ? (
          <Box
            component="img"
            src={getCoverImage()}
            alt={data.propertyType || "ملک"}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.5s ease",
              ".MuiCard-root:hover &": { transform: "scale(1.05)" },
            }}
          />
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              color: "primary.main",
              p: 2,
              textAlign: "center",
            }}
          >
            {getPropertyTypeIcon(data.propertyType, {
              sx: { fontSize: 64, opacity: 0.85 },
            })}
            <Typography
              variant="caption"
              sx={{ fontWeight: 700, color: "text.secondary", fontSize: 13 }}
            >
              {data.propertyType || "درخواست ملک"}
            </Typography>
          </Box>
        )}

        {/* بج‌های راست (RTL) */}
        <Stack
          direction="row"
          spacing={1}
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            zIndex: 1,
          }}
        >
          {badgeLabel && (
            <Chip
              size="small"
              label={badgeLabel}
              sx={{
                bgcolor: "warning.main",
                color: "warning.contrastText",
                fontWeight: 700,
                fontSize: 11,
              }}
            />
          )}
          {data.contractType && (
            <Chip
              size="small"
              label={data.contractType}
              sx={{
                bgcolor: alpha("#FFFFFF", 0.9),
                backdropFilter: "blur(4px)",
                color: "primary.dark",
                fontWeight: 700,
                fontSize: 11,
              }}
            />
          )}
        </Stack>

        {/* دکمه بوکمارک */}
        <IconButton
          onClick={handleBookmarkClick}
          aria-label="نشان کردن ملک"
          size="small"
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 1,
            bgcolor: alpha("#FFFFFF", 0.85),
            backdropFilter: "blur(4px)",
            color: bookmarked ? "primary.main" : "text.secondary",
            "&:hover": { bgcolor: "#FFFFFF" },
          }}
        >
          {bookmarked ? (
            <BookmarkRoundedIcon fontSize="small" />
          ) : (
            <BookmarkBorderRoundedIcon fontSize="small" />
          )}
        </IconButton>

        {/* شمارنده عکس‌ها (فقط در صورت وجود عکس) */}
        {data.images && data.images.length > 0 && (
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              position: "absolute",
              bottom: 10,
              right: 10,
              px: 1,
              py: 0.3,
              borderRadius: "6px",
              bgcolor: alpha("#000000", 0.65),
              color: "#FFFFFF",
              gap: 0.5,
              backdropFilter: "blur(2px)",
            }}
          >
            <PhotoCameraRoundedIcon sx={{ fontSize: 13 }} />
            <Typography
              variant="caption"
              sx={{ fontSize: 11, fontWeight: 600 }}
            >
              {formatNumber(data.images.length)}
            </Typography>
          </Stack>
        )}
      </Box>

      {/* محتوای اصلی کارت */}
      <CardContent
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1.25,
          flex: 1,
        }}
      >
        <Box
          sx={{
            flexDirection: "column",
            alignItems: "flex-start",
            display: "flex",
          }}
        >
          <Stack
            direction="row"
            spacing={0.5}
            sx={{ color: "text.muted", mb: 0.5, alignItems: "center" }}
          >
            <LocationOnRoundedIcon
              sx={{ fontSize: 18, color: "primary.main" }}
            />
            <Typography variant="caption" sx={{ fontSize: 12 }}>
              {getFormattedLocation(data)}
            </Typography>
          </Stack>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              color: "text.title",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width: "100%",
            }}
          >
            {`${data.propertyType} ${data.contractType ? `- ${data.contractType}` : ""}`}
          </Typography>
        </Box>

        {/* ردیف متریک‌های مشترک (متراژ، تعداد اتاق، طبقه) */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 0.5,
            bgcolor: "#F1F5F9",
            borderRadius: "8px",
            p: 1,
            textAlign: "center",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="caption"
              sx={{ color: "text.muted", fontSize: 11 }}
            >
              متراژ
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: 700, color: "text.primary" }}
            >
              {getDisplayArea()}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="caption"
              sx={{ color: "text.muted", fontSize: 11 }}
            >
              اتاق
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: 700, color: "text.primary" }}
            >
              {data.roomCount
                ? `${formatNumber(data.roomCount)} خواب`
                : "نامشخص"}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="caption"
              sx={{ color: "text.muted", fontSize: 11 }}
            >
              طبقه
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: 700, color: "text.primary" }}
            >
              {data.totalFloor ? `${formatNumber(data.totalFloor)}` : "نامشخص"}
            </Typography>
          </Box>
        </Box>

        {/* بخش قیمت */}
        <Box
          sx={{
            pt: 1,
            borderTop: "1px solid",
            borderColor: "background.border",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: "text.muted", fontSize: 12 }}
          >
            {isRentType ? "قیمت رهن / ودیعه:" : "قیمت کل:"}
          </Typography>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
                  <Typography
              variant="h6"
              sx={{ fontWeight: 800, color: "primary.main" }}
            >
              {displayPriceValue}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontWeight: 600 }}
            >
              تومان
            </Typography>
      
          </Stack>
        </Box>

        {/* فیلدهای اختیاری درخواست‌کننده (در صورت وجود) */}
        {(data.requesterName || data.requesterPhone) && (
          <Box
            sx={{
              p: 1,
              borderRadius: "8px",
              bgcolor: alpha("#1976d2", 0.05),
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
            }}
          >
            {data.requesterName && (
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <PersonOutlineRoundedIcon
                  sx={{ fontSize: 15, color: "primary.main" }}
                />
                <Typography
                  variant="caption"
                  sx={{ fontSize: 11, color: "text.secondary" }}
                >
                  متقاضی:
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ fontSize: 11, fontWeight: 700, color: "text.primary" }}
                >
                  {data.requesterName}
                </Typography>
              </Stack>
            )}
            {data.requesterPhone && (
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <PhoneInTalkRoundedIcon
                  sx={{ fontSize: 15, color: "primary.main" }}
                />
                <Typography
                  variant="caption"
                  sx={{ fontSize: 11, color: "text.secondary" }}
                >
                  تماس:
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "text.primary",
                    direction: "ltr",
                  }}
                >
                  {data.requesterPhone}
                </Typography>
              </Stack>
            )}
          </Box>
        )}

        <Divider sx={{ borderColor: "background.border" }} />

        {/* فوتر کارت */}
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Stack direction="row" spacing={0.5}>
            <Button
              size="small"
              onClick={() => onDetailsClick?.(data)}
              variant="contained"
              sx={{
                borderRadius: "8px",
                fontWeight: 700,
                fontSize: 12,
                boxShadow: "none",
                px: 1.5,
                "&:hover": { boxShadow: "none" },
              }}
            >
              مشاهده جزئیات
            </Button>
          </Stack>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 0.5,
            }}
          >
               {isVerified ? (
              <VerifiedRoundedIcon sx={{ fontSize: 16, color: "#10B981" }} />
            ) : (
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: "#10B981",
                }}
              />
            )}
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontSize: 12 }}
            >
              {personName}
            </Typography>
         
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
