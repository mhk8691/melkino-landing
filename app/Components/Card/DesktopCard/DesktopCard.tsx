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
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";

export interface PropertyMetric {
  /** برچسب متریک، مثل «متراژ»، «اتاق» یا «طبقه» */
  label: string;
  /** مقدار متریک، مثل «۱۶۵ متر» */
  value: string;
}

export interface PropertyFileCardProps {
  /** آدرس تصویر اصلی ملک */
  imageUrl: string;
  /** متن جایگزین تصویر */
  imageAlt?: string;
  /** برچسب بالای کارت، مثل «فایل VIP ویژه» — اگر خالی باشد نمایش داده نمی‌شود */
  badgeLabel?: string;
  /** برچسب نوع معامله، مثل «فروش مسکونی» — اختیاری */
  dealTypeLabel?: string;
  /** تعداد تصاویر ملک */
  photoCount?: number;
  /** موقعیت مکانی، مثل «تهران، منطقه زعفرانیه» */
  location: string;
  /** عنوان فایل ملکی */
  title: string;
  /** ردیف متریک‌ها (حداکثر ۳ مورد پیشنهاد می‌شود) */
  metrics: PropertyMetric[];
  /** برچسب بالای قیمت، مثل «قیمت کل کارشناسی‌شده:» */
  priceLabel?: string;
  /** مقدار عددی قیمت به صورت رشته فرمت‌شده */
  priceValue: string;
  /** واحد قیمت، مثل «تومان» */
  priceUnit?: string;
  /** نام مشاور یا مالک */
  agentName: string;
  /** آیا مشاور/مالک تایید شده است (آیکن verified نشان داده می‌شود) */
  isVerified?: boolean;
  /** وضعیت اولیه نشان‌شده بودن (بوکمارک) */
  initialBookmarked?: boolean;
  /** کال‌بک کلیک روی دکمه نشان کردن */
  onBookmarkToggle?: (bookmarked: boolean) => void;
  /** کال‌بک کلیک روی دکمه چت */
  onChatClick?: () => void;
  /** کال‌بک کلیک روی دکمه مشاهده جزئیات */
  onDetailsClick?: () => void;
}

/**
 * کارت نمایش یک فایل ملکی (آپارتمان، ویلا، تجاری و ...)
 * مطابق تم بصری پروژه (رنگ‌ها، تایپوگرافی و شعاع گوشه‌ها) ساخته شده است.
 */
export default function PropertyFileCard({
  imageUrl,
  imageAlt = "",
  badgeLabel,
  dealTypeLabel,
  photoCount,
  location,
  title,
  metrics,
  priceLabel = "قیمت کل:",
  priceValue,
  priceUnit = "تومان",
  agentName,
  isVerified = false,
  initialBookmarked = false,
  onBookmarkToggle,
  onChatClick,
  onDetailsClick,
}: PropertyFileCardProps) {
  const [bookmarked, setBookmarked] = React.useState(initialBookmarked);

  const handleBookmarkClick = () => {
    const next = !bookmarked;
    setBookmarked(next);
    onBookmarkToggle?.(next);
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
        border: "1px solid",
        borderColor: "background.border",
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
        "&:hover": {
          boxShadow: "0 12px 28px rgba(20,68,147,0.14)",
          transform: "translateY(-3px)",
        },
      }}
    >
      {/* تصویر و بج‌ها */}
      <Box
        sx={{
          position: "relative",
          height: 200,
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={imageUrl}
          alt={imageAlt}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease",
            ".MuiCard-root:hover &": { transform: "scale(1.05)" },
          }}
        />

        {/* بج‌های بالا-راست (در RTL یعنی سمت شروع) */}
        <Stack
          direction="row"
          sx={{ position: "absolute", top: 12, left: 10, zIndex: 1, gap: 1 }}
        >
          {badgeLabel && (
            <Chip
              size="small"
              label={badgeLabel}
              sx={{
                bgcolor: "secondary.main",
                color: "#2A1800",
                fontWeight: 700,
                fontSize: 12,
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                "& .MuiChip-icon": { color: "#2A1800" },
              }}
            />
          )}
          {dealTypeLabel && (
            <Chip
              size="small"
              label={dealTypeLabel}
              sx={{
                bgcolor: alpha("#FFFFFF", 0.9),
                color: "primary.dark",
                fontWeight: 600,
                fontSize: 12,
              }}
            />
          )}
        </Stack>

        {/* دکمه نشان کردن (بوکمارک) بالا-چپ */}
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
            color: bookmarked ? "secondary.dark" : "text.secondary",
            "&:hover": { bgcolor: "#FFFFFF" },
          }}
        >
          {bookmarked ? (
            <BookmarkRoundedIcon fontSize="small" />
          ) : (
            <BookmarkBorderRoundedIcon fontSize="small" />
          )}
        </IconButton>

        {/* شمارنده تعداد تصاویر پایین-راست */}
        {typeof photoCount === "number" && (
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              position: "absolute",
              bottom: 8,
              left: 8,
              px: 1,
              py: 0.25,
              borderRadius: "4px",
              bgcolor: alpha("#000000", 0.6),
              color: "#FFFFFF",
              gap: 0.5,
            }}
          >
            <Typography variant="caption" sx={{ fontSize: 12 }}>
              {`تصویر ${photoCount} `}
            </Typography>
            <PhotoCameraRoundedIcon sx={{ fontSize: 14 }} />
          </Stack>
        )}
      </Box>

      {/* محتوای کارت */}
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
            alignItems: "flex-end",
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
              {location}
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
            }}
          >
            {title}
          </Typography>
        </Box>

        {/* ردیف متریک‌ها */}
        {metrics.length > 0 && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: `repeat(${metrics.length}, 1fr)`,
              gap: 0.5,
              bgcolor: "background.paper",
              borderRadius: "8px",
              p: 1,
              textAlign: "center",
            }}
          >
            {metrics.map((m, i) => (
              <Box key={i} sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="caption"
                  sx={{ color: "text.muted", fontSize: 11 }}
                >
                  {m.label}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, color: "text.primary" }}
                >
                  {m.value}
                </Typography>
              </Box>
            ))}
          </Box>
        )}

        {/* قیمت */}
        <Box
          sx={{
            pt: 1,
            borderTop: "1px solid",
            borderColor: "background.border",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: "text.muted", fontSize: 12 }}
          >
            {priceLabel}
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
              variant="caption"
              sx={{ color: "text.secondary", fontWeight: 600 }}
            >
              {priceUnit}
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: 800, color: "primary.main" }}
            >
              {priceValue}
            </Typography>
          </Stack>
        </Box>

        <Divider sx={{ borderColor: "background.border" }} />

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
              onClick={onDetailsClick}
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
          <Stack  sx={{ display:'flex',flexDirection:'row',alignItems: "center",gap:.5 }} >
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontSize: 12 }}
            >
              {agentName}
            </Typography>
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
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
