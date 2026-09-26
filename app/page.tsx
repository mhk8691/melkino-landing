"use client";

import { Grid } from "@mui/material";
import CardFile from "./Components/Card/CardFile";

export default function Home() {
  return (
    <>
      <Grid container sx={{mt:2}} spacing={2}>
        {[1, 2, 3, 4, 5].map((item) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3,xl:12/5 }} key={item}>
            <CardFile
              imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuBsNx5uLrw-tH1aa99UGzzjb8SjYQEfdFVtwM1bRFEMB7cuo4eXVg6lc7dRbBOf5JypePTS3iocHIu2UZxsFzZZDBsrI4T1w7JHjSvB7AwBifW2PuqovunVcRqOZyxStRu7nva3Car0joTlgluF1d0TM9fkmeOY8sUUra-_eOIWl1FUFXoCcw25e_HLdqG6w9H5NkcXs35UM9v2JmuRf8MPa7X0cONfXiA6fPI6SYzmfyXSaibqC3HN4g"
              imageAlt="آپارتمان سوپرلوکس زعفرانیه"
              badgeLabel="فایل ویژه"
              dealTypeLabel="فروش مسکونی"
              photoCount={8}
              location="تهران، منطقه زعفرانیه، خیابان آصف"
              title="آپارتمان ۱۶۵ متری سوپرلوکس تک‌واحدی"
              metrics={[
                { label: "متراژ", value: "۱۶۵ متر" },
                { label: "اتاق", value: "۳ خواب" },
                { label: "طبقه", value: "4 از 5" },
              ]}
              priceLabel="قیمت کل کارشناسی‌شده:"
              priceValue="۱۱,۵۵۰,۰۰۰,۰۰۰"
              priceUnit="تومان"
              agentName="مشاور: مهندس اخوان"
              isVerified={false}
              onChatClick={() => console.log("چت")}
              onDetailsClick={() => console.log("مشاهده جزئیات")}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
