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
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import TourRoundedIcon from "@mui/icons-material/TourRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import HandshakeRoundedIcon from "@mui/icons-material/HandshakeRounded";
import { PropertyType } from "@/app/Core/types";
import { getPropertyTypeIcon } from "./PropertyTypeIcon";
import { useRouter } from "next/navigation";
import VisitRequestModal from "./VisitRequestModal";

export interface CardFileProps {
  data: PropertyType;
  badgeLabel?: string;
  initialBookmarked?: boolean;
  isVerified?: boolean;
  onBookmarkToggle?: (bookmarked: boolean) => void;
  onDetailsClick?: (data: PropertyType) => void;
  /** ثبت بازدید (فقط در mode="file") */
  onVisitRequest?: (data: PropertyType) => void;
  /** من دارم (فقط در mode="request") */
  onIHave?: (data: PropertyType) => void;
  mode?: "request" | "file";
}

const formatNumber = (num?: number) => {
  if (num === undefined || num === null || isNaN(num)) return "0";
  return num.toLocaleString("fa-IR");
};

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
  onVisitRequest,
  onIHave,
  mode = "file",
}: CardFileProps) {
  const [bookmarked, setBookmarked] = React.useState(initialBookmarked);
  const [visitModalOpen, setVisitModalOpen] = React.useState(false);
  const router = useRouter();

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !bookmarked;
    setBookmarked(next);
    onBookmarkToggle?.(next);
  };

  const getDisplayArea = (): string => {
    if (data.area) return `${formatNumber(data.area)} متر`;
    if (data.areaFrom || data.areaTo) {
      return `${formatNumber(data.areaFrom || 0)} تا ${formatNumber(
        data.areaTo || 0,
      )} متر`;
    }
    return "نامشخص";
  };

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

  // آدرس تور مجازی (در صورت وجود در تایپ، as any را حذف کن)
  const virtualTourUrl: string | undefined =
    (data as any).virtualTourUrl || (data as any).tourUrl;

  const handleDetails = () => {
    if (onDetailsClick) onDetailsClick(data);
    else router.push(`/property/${data.id ?? 1}`);
  };

  const handleViewProperty = () => {
    if (virtualTourUrl) {
      window.open(virtualTourUrl, "_blank", "noopener,noreferrer");
    } else {
      router.push(`/property/${data.id ?? 1}`);
    }
  };

  const handleVisitRequest = () => {
    setVisitModalOpen(true);
    onVisitRequest?.(data);
  };

  const handleIHave = () => {
    onIHave?.(data);
  };

  return (
    <>
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
                    `linear-gradient(135deg, ${alpha(
                      theme.palette.primary.main,
                      0.08,
                    )} 0%, ${alpha(theme.palette.primary.main, 0.2)} 100%)`,
          }}
        >
          {data.images && data.images.length > 0 ? (
            <Box
              component="img"
              src={getCoverImage() ?? "/images/placeholder.jpg"}
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

          <Stack
            direction="row"
            spacing={1}
            sx={{ position: "absolute", top: 12, left: 12, zIndex: 1 }}
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
              {`${data.propertyType} ${
                data.contractType ? `- ${data.contractType}` : ""
              }`}
            </Typography>
          </Box>

          {/* متریک‌ها */}
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
                {data.totalFloor
                  ? `${formatNumber(data.totalFloor)}`
                  : "نامشخص"}
              </Typography>
            </Box>
          </Box>

          {/* قیمت */}
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

          {/* اطلاعات متقاضی (درخواست) */}
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
                    sx={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "text.primary",
                    }}
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

          {/* خط جداکننده */}
          <Divider sx={{ borderColor: "background.border", my: 0.5 }} />

          {/* نام مشاور / تایید */}
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
              {isVerified ? (
                <VerifiedRoundedIcon sx={{ fontSize: 18, color: "#10B981" }} />
              ) : (
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "#10B981",
                    boxShadow: "0 0 0 3px rgba(16,185,129,0.15)",
                  }}
                />
              )}
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  fontSize: 12,
                  fontWeight: 600,
                  maxWidth: 180,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {personName}
              </Typography>
            </Stack>

            {mode === "request" && (
              <Chip
                size="small"
                label="درخواست"
                sx={{
                  height: 20,
                  fontSize: 10,
                  fontWeight: 700,
                  bgcolor: alpha("#1976d2", 0.1),
                  color: "primary.main",
                }}
              />
            )}
          </Stack>

          {/* ناحیه دکمه‌ها */}
          <Stack spacing={1} sx={{ mt: 0.5 }}>
            {/* دکمه اصلی: مشاهده جزئیات */}
            <Button
              fullWidth
              onClick={handleDetails}
              variant="contained"
              startIcon={<VisibilityRoundedIcon sx={{ fontSize: 18 }} />}
              sx={{
                borderRadius: "10px",
                fontWeight: 700,
                fontSize: 13,
                py: 1,
                boxShadow: "0 4px 12px rgba(25,118,210,0.25)",
                transition: "all 0.2s ease",
                "&:hover": {
                  boxShadow: "0 6px 16px rgba(25,118,210,0.35)",
                  transform: "translateY(-1px)",
                },
              }}
            >
              مشاهده جزئیات
            </Button>

            {/* دکمه‌های ثانویه بر اساس mode */}
            <Stack direction="row" spacing={1}>
              {mode === "file" ? (
                <>
                  <Button
                    fullWidth
                    onClick={handleViewProperty}
                    variant="outlined"
                    startIcon={<TourRoundedIcon sx={{ fontSize: 16 }} />}
                    sx={{
                      borderRadius: "10px",
                      fontWeight: 700,
                      fontSize: 12,
                      py: 0.9,
                      borderColor: alpha("#1976d2", 0.4),
                      color: "primary.main",
                      "&:hover": {
                        borderColor: "primary.main",
                        bgcolor: alpha("#1976d2", 0.06),
                      },
                    }}
                  >
                    مشاهده ملک
                  </Button>
                  <Button
                    fullWidth
                    onClick={handleVisitRequest}
                    variant="outlined"
                    color="success"
                    startIcon={
                      <EventAvailableRoundedIcon sx={{ fontSize: 16 }} />
                    }
                    sx={{
                      borderRadius: "10px",
                      fontWeight: 700,
                      fontSize: 12,
                      py: 0.9,
                      borderColor: alpha("#10B981", 0.5),
                      color: "#059669",
                      "&:hover": {
                        borderColor: "#10B981",
                        bgcolor: alpha("#10B981", 0.08),
                      },
                    }}
                  >
                    ثبت بازدید
                  </Button>
                </>
              ) : (
                <Button
                  fullWidth
                  onClick={handleIHave}
                  variant="outlined"
                  color="secondary"
                  startIcon={<HandshakeRoundedIcon sx={{ fontSize: 16 }} />}
                  sx={{
                    borderRadius: "10px",
                    fontWeight: 700,
                    fontSize: 12,
                    py: 0.9,
                    borderColor: alpha("#9c27b0", 0.5),
                    color: "#7b1fa2",
                    "&:hover": {
                      borderColor: "#9c27b0",
                      bgcolor: alpha("#9c27b0", 0.08),
                    },
                  }}
                >
                  من دارم
                </Button>
              )}
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      {/* مودال ثبت بازدید — با key برای ریست خودکار state */}
      <VisitRequestModal
        key={visitModalOpen ? "open" : "closed"}
        open={visitModalOpen}
        onClose={() => setVisitModalOpen(false)}
        property={data}
        onSubmit={async (payload) => {
          // اینجا به API وصل کن
          console.log("Visit request:", { ...payload, propertyId: data.id });
          // await fetch("/api/visit-requests", {
          //   method: "POST",
          //   headers: { "Content-Type": "application/json" },
          //   body: JSON.stringify({ ...payload, propertyId: data.id }),
          // });
        }}
      />
    </>
  );
}