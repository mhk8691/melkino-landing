import PropertyDetails, {
  FilePropertyData,
  RequestPropertyData,
} from "@/app/Components/PropertyDetail/PropertyDetail";
import PropertyGallery from "@/app/Components/PropertyDetail/PropertyGallery";
import TitleHeader from "@/app/Components/PropertyDetail/TitleHeader";
import { Container } from "@mui/material";
import React from "react";

const fileData: FilePropertyData = {
  id: 1,
  status: "فعال",
  propertyType: "آپارتمان",
  contractType: "فروش",
  documentType: "تک برگ",
  city: "تهران",
  district: "منطقه ۲",
  neighborhood: "سعادت‌آباد",
  address: "خیابان علامه شمالی، کوچه ۱۲، پلاک ۴",
  area: 120,
  totalPrice: 8500000000,
  pricePerMeter: 70833333,
  roomCount: 2,
  occupancyStatus: "تخلیه",
  bathroom: "ایرانی و فرنگی",
  heating: "پکیج",
  cooling: "اسپلیت",
  flooring: "سرامیک",
  facade: "سنگ",
  totalFloor: 6,
  direction: "شمالی",
  amenities: ["آسانسور", "پارکینگ", "انباری", "بالکن"],
  ownerName: "علی رضایی",
  ownerPhone: "09121234567",
  ownerPhone2: "02188451234",
  ownerJob: "مهندس",
  description: "واحد نوساز، نور عالی، نزدیک مترو و مراکز خرید.",
  internalNote: "مالک عجله برای فروش دارد، قابل مذاکره.",
};

// دیتای درخواست (نمونه)
const requestData: RequestPropertyData = {
  id: 1,
  propertyType: "آپارتمان",
  contractType: "فروش",
  city: "تهران",
  district: ["منطقه ۱", "منطقه ۲"],
  neighborhood: ["زعفرانیه", "الهیه"],
  areaFrom: 90,
  areaTo: 130,
  totalPriceFrom: 5000000000,
  totalPriceTo: 7500000000,
  roomCount: 2,
  requesterName: "علی محمدی",
  requesterPhone: "09121234567",
};

export default function page() {
  return (
    <Container
      maxWidth={"xl"}
      sx={{
        px: {
          xs: 2,
          sm: 4,
        },
        minWidth: "100% !important",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        mb: 5,
        mt: 2,
      }}
    >
      <TitleHeader  />
      <PropertyGallery />
      <PropertyDetails mode="file" data={fileData} />
    </Container>
  );
}
