"use client";

import CardFile from "./Components/Card/CardFile";
import { PropertyType } from "./Core/types";


// نمونه فایل ملکی (Property File)
export const propertyItem: PropertyType = {
  id: 101,
  propertyType: "آپارتمان",
  contractType: "فروش",
  documentType: "سند تک‌برگ",
  assignedTo: "مهندس اخوان",
  monthlyCharge: "۵۰۰,۰۰۰",
  city: "تهران",
  virtualTourLink: "https://example.com/tour/101",
  district: "منطقه ۱",
  neighborhood: "زعفرانیه",
  address: "خیابان آصف، کوچه فیروزکوه، پلاک ۱۲",
  budgetType: "نقدی",
  area: 165,
  totalPrice: 11550000000,
  pricePerMeter: 70000000,
  rent: 0,
  mortgagePrice: 0,
  monthlyRent: 0,
  mortgageTerms: "",
  roomCount: 3,
  occupancyStatus: "تخلیه",
  bathroom: "ایرانی و مستر",
  heating: "پکیج و شوفاژ",
  cooling: "کولر گازی",
  flooring: "سنگ",
  facade: "سنگ تراورتن",
  totalFloor: 5,
  direction: "جنوبی",
  amenities: ["پارکینگ", "انباری", "آسانسور", "بالکن", "لابی‌من"],
  ownerName: "آقای رضایی",
  ownerPhone: "09121112233",
  ownerPhone2: "09121112244",
  ownerJob: "پزشک",
  images: [
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
  ],
  description: "آپارتمان سوپرلوکس ۱۶۵ متری تک‌واحدی، نورگیری عالی از جنوب و شمال.",
  internalNote: "مالک فروشنده واقعی است و تخفیف جزئی پای معامله می‌دهد.",
  buildYear: "۱۳۹۹",
  advisorName: "مهندس اخوان",
  agencyName: "املاک بزرگ زعفرانیه",
  contactPhone: "02122001122",
};

// نمونه درخواست ملک (Property Request)
export const requestItem: PropertyType = {
  id: 202,
  propertyType: "آپارتمان",
  contractType: "رهن و اجاره",
  documentType: "مهم نیست",
  requesterName: "علی محمدی",
  requesterPhone: "09123456789",
  assignedTo: "خانم شریفی",
  monthlyCharge: "",
  city: "تهران",
  virtualTourLink: "",
  district: ["منطقه ۲", "منطقه ۵"],
  neighborhood: ["سعادت‌آباد", "شهرک غرب"],
  address: "محدوده سرو یا بلوار پاکنژاد",
  budgetType: "رهن کامل یا ترکیبی",
  area: 0,
  areaFrom: 100,
  areaTo: 130,
  totalPrice: 0,
  pricePerMeter: 0,
  rent: 0,
  mortgagePrice: 800000000,
  mortgagePriceFrom: 800000000,
  mortgagePriceTo: 1000000000,
  monthlyRent: 15000000,
  monthlyRentFrom: 10000000,
  monthlyRentTo: 20000000,
  mortgageTerms: "قابل تبدیل",
  roomCount: 2,
  occupancyStatus: "",
  bathroom: "",
  heating: "",
  cooling: "",
  flooring: "",
  facade: "",
  totalFloor: 6,
  direction: "",
  amenities: ["پارکینگ", "آسانسور"],
  ownerName: "",
  ownerPhone: "",
  ownerPhone2: "",
  ownerJob: "",
  images: [],
  description: "متقاضی خانواده ۳ نفره، آماده عقد قرارداد و تخلیه فوری.",
  internalNote: "بودجه نقد و تایید شده است.",
};

export default function Home() {
  return (
    <>
      <CardFile
        data={propertyItem}
        badgeLabel="فایل ویژه"
        onDetailsClick={(item) => console.log(item)}
      />

      <CardFile
        data={requestItem}
        onDetailsClick={(item) => console.log(item)}
      />
    </>
  );
}
