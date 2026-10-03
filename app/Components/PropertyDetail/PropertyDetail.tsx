"use client";
import React from "react";
import { Box, Typography, Stack, Chip } from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import LayersIcon from "@mui/icons-material/Layers";
import BathtubIcon from "@mui/icons-material/Bathtub";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import DeckIcon from "@mui/icons-material/Deck";
import ElevatorIcon from "@mui/icons-material/Elevator";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import BalconyIcon from "@mui/icons-material/Balcony";
import StraightenIcon from "@mui/icons-material/Straighten";
import CompassCalibrationIcon from "@mui/icons-material/CompassCalibration";
import DescriptionIcon from "@mui/icons-material/Description";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import NoteIcon from "@mui/icons-material/Note";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import AcUnitIcon from "@mui/icons-material/AcUnit";

export type PropertyMode = "file" | "request";

export type FilePropertyData = {
  id: number;
  status: string;
  propertyType: string;
  contractType: string;
  documentType: string;
  city: string;
  district: string;
  neighborhood: string;
  address: string;
  area: number;
  totalPrice: number;
  pricePerMeter: number;
  roomCount: number;
  occupancyStatus: string;
  bathroom: string;
  heating: string;
  cooling: string;
  flooring: string;
  facade: string;
  totalFloor: number;
  direction: string;
  amenities: string[];
  ownerName: string;
  ownerPhone: string;
  ownerPhone2: string;
  ownerJob: string;
  description: string;
};

export type RequestPropertyData = {
  id: number;
  propertyType: string;
  contractType: string;
  city: string;
  district: string[];
  neighborhood: string[];
  areaFrom: number;
  areaTo: number;
  totalPriceFrom: number;
  totalPriceTo: number;
  roomCount: number;
  requesterName: string;
  requesterPhone: string;
};

export type PropertyDetailsProps =
  | {
      mode: "file";
      data: FilePropertyData;
    }
  | {
      mode: "request";
      data: RequestPropertyData;
    };

const formatPrice = (price: number): string => {
  if (!price && price !== 0) return "-";
  if (price >= 1_000_000_000) {
    return `${(price / 1_000_000_000).toFixed(1)} میلیارد تومان`;
  }
  if (price >= 1_000_000) {
    return `${(price / 1_000_000).toFixed(0)} میلیون تومان`;
  }
  return price.toLocaleString("fa-IR") + " تومان";
};

const formatNumber = (num: number | string): string => {
  if (num === null || num === undefined || num === "") return "-";
  const n = Number(num);
  if (isNaN(n)) return String(num);
  return n.toLocaleString("fa-IR");
};

const AMENITY_ICONS: Record<string, React.ElementType> = {
  آسانسور: ElevatorIcon,
  پارکینگ: LocalParkingIcon,
  انباری: WarehouseIcon,
  بالکن: BalconyIcon,
};

const CARD_SX = {
  borderRadius: 3,
  border: "1px solid #eef0f4",
  boxShadow: "0 4px 20px rgba(20, 30, 60, 0.06)",
  bgcolor: "background.paper",
};

function FeatureCard({
  icon: Icon,
  value,
  label,
  color = "#1a73e8",
}: {
  icon: React.ElementType;
  value: string | number;
  label: string;
  color?: string;
}) {
  return (
    <Box
      sx={{
        ...CARD_SX,
        p: { xs: 1.5, sm: 1.75, md: 2 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: { xs: 0.5, md: 0.8 },
        textAlign: "center",
        transition: "all 0.2s ease",
        "&:hover": {
          borderColor: "#d0d7e2",
          boxShadow: "0 6px 24px rgba(20, 30, 60, 0.1)",
        },
      }}
    >
      <Icon sx={{ color, fontSize: { xs: 22, md: 26 } }} />
      <Typography
        sx={{
          color: "#1a1a1a",
          fontWeight: 800,
          fontSize: { xs: "0.9rem", md: "1.05rem" },
          lineHeight: 1.3,
        }}
      >
        {value}
      </Typography>
      <Typography
        sx={{
          color: "#7a8291",
          fontSize: { xs: "0.65rem", md: "0.72rem" },
          fontWeight: 500,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

function InfoRow({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  icon?: React.ElementType;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "flex-start", sm: "center" },
        justifyContent: "space-between",
        py: { xs: 1.2, md: 1.5 },
        px: { xs: 1.5, md: 2 },
        backgroundColor: "#fafbfc",
        borderRadius: 3,
        gap: { xs: 0.5, sm: 1 },
      }}
    >
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 0.8,
        }}
      >
        {Icon && <Icon sx={{ color: "#8b93a1", fontSize: { xs: 16, md: 18 } }} />}
        <Typography
          sx={{
            color: "#7a8291",
            fontSize: { xs: "0.72rem", md: "0.82rem" },
            fontWeight: 600,
          }}
        >
          {label}:
        </Typography>
      </Stack>
      <Typography
        sx={{
          color: "#1a1a1a",
          fontSize: { xs: "0.75rem", md: "0.85rem" },
          fontWeight: 700,
          textAlign: { xs: "right", sm: "left" },
          maxWidth: { xs: "100%", sm: "60%" },
          wordBreak: "break-word",
        }}
      >
        {value || "-"}
      </Typography>
    </Box>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  badge,
  iconBg = "#e8f0fe",
  iconColor = "#1a73e8",
}: {
  icon: React.ElementType;
  title: string;
  badge?: string;
  iconBg?: string;
  iconColor?: string;
}) {
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        mb: { xs: 2, md: 2.5 },
      }}
    >
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box
          sx={{
            backgroundColor: iconBg,
            borderRadius: 3,
            p: 0.8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon sx={{ color: iconColor, fontSize: 18 }} />
        </Box>
        <Typography
          sx={{
            color: "#1a1a1a",
            fontWeight: 800,
            fontSize: { xs: "0.9rem", md: "1.05rem" },
          }}
        >
          {title}
        </Typography>
      </Stack>

      {badge && (
        <Chip
          label={badge}
          size="small"
          sx={{
            backgroundColor: "#e8f5e9",
            color: "#0e9f6e",
            fontSize: { xs: "0.65rem", md: "0.72rem" },
            fontWeight: 700,
            height: { xs: 22, md: 26 },
            borderRadius: 3,
          }}
        />
      )}
    </Stack>
  );
}

function BaseCard({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        ...CARD_SX,
        p: { xs: 1.5, sm: 2, md: 2.5 },
      }}
    >
      {children}
    </Box>
  );
}

export default function PropertyDetails(props: PropertyDetailsProps) {
  if (props.mode === "file") {
    const d = props.data;

    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: { xs: 2, md: 3 },
        }}
      >
        <BaseCard>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
                md: "repeat(6, 1fr)",
              },
              gap: { xs: 1, sm: 1.2, md: 1.5 },
            }}
          >
            <FeatureCard
              icon={SquareFootIcon}
              value={formatNumber(d.area)}
              label="متراژ"
              color="#1a73e8"
            />
            <FeatureCard
              icon={MeetingRoomIcon}
              value={formatNumber(d.roomCount)}
              label="خواب"
              color="#7b3fb0"
            />
            <FeatureCard
              icon={BathtubIcon}
              value={d.bathroom || "-"}
              label="حمام"
              color="#0e9f6e"
            />
            <FeatureCard
              icon={LayersIcon}
              value={formatNumber(d.totalFloor)}
              label="طبقه کل"
              color="#d99a1e"
            />
            <FeatureCard
              icon={CompassCalibrationIcon}
              value={d.direction || "-"}
              label="جهت"
              color="#e02424"
            />
            <FeatureCard
              icon={StraightenIcon}
              value={d.propertyType || "-"}
              label="نوع ملک"
              color="#1a4fa3"
            />
          </Box>
        </BaseCard>

        <BaseCard>
          <SectionHeader icon={GridViewIcon} title="مشخصات فنی، سندی و سازه‌ای" />
          <Stack spacing={{ xs: 1, md: 1.2 }}>
            <InfoRow label="وضعیت سند" value={d.documentType} icon={DescriptionIcon} />
            <InfoRow label="وضعیت اشتغال" value={d.occupancyStatus} icon={HomeWorkIcon} />
            <InfoRow label="نوع قرارداد" value={d.contractType} icon={NoteIcon} />
            <InfoRow label="گرمایش" value={d.heating} icon={ThermostatIcon} />
            <InfoRow label="سرمایش" value={d.cooling} icon={AcUnitIcon} />
            <InfoRow label="کف‌پوش" value={d.flooring} icon={SquareFootIcon} />
            <InfoRow label="نما" value={d.facade} icon={HomeWorkIcon} />
            <InfoRow label="قیمت کل" value={formatPrice(d.totalPrice)} icon={DescriptionIcon} />
            <InfoRow label="قیمت متری" value={formatPrice(d.pricePerMeter)} icon={DescriptionIcon} />
          </Stack>
        </BaseCard>

        <BaseCard>
          <SectionHeader icon={LocationOnIcon} title="موقعیت مکانی" />
          <Stack spacing={{ xs: 1, md: 1.2 }}>
            <InfoRow label="شهر" value={d.city} />
            <InfoRow label="منطقه" value={d.district} />
            <InfoRow label="محله" value={d.neighborhood} />
            <InfoRow label="آدرس" value={d.address} icon={LocationOnIcon} />
          </Stack>
        </BaseCard>

        {d.amenities && d.amenities.length > 0 && (
          <BaseCard>
            <SectionHeader
              icon={DeckIcon}
              title="امکانات رفاهی و تجهیزات"
              badge={`${d.amenities.length} ویژگی`}
              iconBg="#fef3c7"
              iconColor="#d99a1e"
            />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, 1fr)",
                  sm: "repeat(3, 1fr)",
                  md: "repeat(4, 1fr)",
                },
                gap: { xs: 0.8, sm: 1, md: 1.2 },
              }}
            >
              {d.amenities.map((amenity, index) => {
                const Icon = AMENITY_ICONS[amenity] || DeckIcon;
                return (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: { xs: 0.6, md: 0.8 },
                      p: { xs: 0.8, md: 1 },
                      borderRadius: 3,
                      backgroundColor: "#fafbfc",
                      border: "1px solid #eef0f4",
                    }}
                  >
                    <Icon sx={{ color: "#1a73e8", fontSize: { xs: 16, md: 18 } }} />
                    <Typography
                      sx={{
                        color: "#1a1a1a",
                        fontSize: { xs: "0.68rem", md: "0.75rem" },
                        fontWeight: 600,
                      }}
                    >
                      {amenity}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </BaseCard>
        )}

        <BaseCard>
          <SectionHeader icon={PersonIcon} title="اطلاعات مالک" />
          <Stack spacing={{ xs: 1, md: 1.2 }}>
            <InfoRow label="نام مالک" value={d.ownerName} icon={PersonIcon} />
            <InfoRow label="تلفن" value={d.ownerPhone} icon={PhoneIcon} />
            <InfoRow label="تلفن دوم" value={d.ownerPhone2} icon={PhoneIcon} />
            <InfoRow label="شغل" value={d.ownerJob} icon={WorkIcon} />
          </Stack>
        </BaseCard>

        {(d.description) && (
          <BaseCard>
            <SectionHeader icon={NoteIcon} title="توضیحات" />
            <Stack spacing={{ xs: 1, md: 1.2 }}>
              {d.description && (
                <Box
                  sx={{
                    p: { xs: 1.5, md: 2 },
                    backgroundColor: "#fafbfc",
                    borderRadius: 3,
                  }}
                >
                  <Typography
                    sx={{
                      color: "#7a8291",
                      fontSize: { xs: "0.68rem", md: "0.75rem" },
                      fontWeight: 700,
                      mb: 0.5,
                    }}
                  >
                    توضیحات:
                  </Typography>
                  <Typography
                    sx={{
                      color: "#1a1a1a",
                      fontSize: { xs: "0.75rem", md: "0.85rem" },
                      lineHeight: 1.9,
                    }}
                  >
                    {d.description}
                  </Typography>
                </Box>
              )}
          
            </Stack>
          </BaseCard>
        )}
      </Box>
    );
  }

  const d = props.data;

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: { xs: 2, md: 3 },
      }}
    >
      <BaseCard>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: { xs: 1, sm: 1.2, md: 1.5 },
          }}
        >
          <FeatureCard
            icon={SquareFootIcon}
            value={`${formatNumber(d.areaFrom)} تا ${formatNumber(d.areaTo)}`}
            label="متراژ (متر)"
            color="#1a73e8"
          />
          <FeatureCard
            icon={MeetingRoomIcon}
            value={formatNumber(d.roomCount)}
            label="خواب"
            color="#7b3fb0"
          />
          <FeatureCard
            icon={HomeWorkIcon}
            value={d.propertyType}
            label="نوع ملک"
            color="#0e9f6e"
          />
          <FeatureCard
            icon={NoteIcon}
            value={d.contractType}
            label="نوع قرارداد"
            color="#d99a1e"
          />
        </Box>
      </BaseCard>

      <BaseCard>
        <SectionHeader icon={DescriptionIcon} title="محدوده بودجه" />
        <Stack spacing={{ xs: 1, md: 1.2 }}>
          <InfoRow label="قیمت از" value={formatPrice(d.totalPriceFrom)} />
          <InfoRow label="قیمت تا" value={formatPrice(d.totalPriceTo)} />
          <InfoRow
            label="متراژ"
            value={`${formatNumber(d.areaFrom)} تا ${formatNumber(d.areaTo)} متر`}
          />
        </Stack>
      </BaseCard>

      <BaseCard>
        <SectionHeader icon={LocationOnIcon} title="موقعیت مکانی مورد نظر" />
        <Stack spacing={{ xs: 1, md: 1.2 }}>
          <InfoRow label="شهر" value={d.city} />
          <InfoRow label="منطقه" value={d.district?.join("، ") || "-"} />
          <InfoRow label="محله" value={d.neighborhood?.join("، ") || "-"} />
        </Stack>
      </BaseCard>

      <BaseCard>
        <SectionHeader icon={PersonIcon} title="اطلاعات درخواست‌کننده" />
        <Stack spacing={{ xs: 1, md: 1.2 }}>
          <InfoRow label="نام" value={d.requesterName} icon={PersonIcon} />
          <InfoRow label="تلفن" value={d.requesterPhone} icon={PhoneIcon} />
        </Stack>
      </BaseCard>
    </Box>
  );
}