"use client";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Stack,
  IconButton,
  Divider,
} from "@mui/material";

import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Image from "next/image";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#0B1528",
        color: "#d1d1d1",
        pt: 6,
        pb: 3,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid
            size={{
              xs: 12,
              md: 6,
              lg: 4,
            }}
          >
            <Stack spacing={2}>
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Box
                  component="span"
                  sx={{
                    position: "relative",
                    display: "block",
                    width: { xs: 40, lg: 52 },
                    height: { xs: 40, lg: 52 },
                  }}
                >
                  <Image
                    src="/images/melkino.png"
                    alt="ملکینو"
                    fill
                    sizes="52px"
                    priority
                    style={{ objectFit: "contain" }}
                  />
                </Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#fff" }}
                >
                  سامانه املاک ملکینو
                </Typography>
              </Stack>

              <Typography variant="caption" sx={{ color: "#888" }}>
                معتبرترین مرجع مسکن و زمین
              </Typography>

              <Typography
                variant="body2"
                sx={{ lineHeight: 1.8, color: "#aaa", fontSize: "0.85rem" }}
              >
                ملکینو نخستین سامانه تخصصی و هوشمند جستجوی ملک، رهن، اجاره و
                خرید آپارتمان است. هدف ما ایجاد بستری شفاف، مستقیم و بدون واسطه
                برای دسترسی سریع به املاک با پشتیبانی پویسته کارشناسان مجرب است.
              </Typography>

              <Stack direction="row" spacing={1.5} sx={{ mt: 1 }}>
                <IconButton
                  sx={{
                    backgroundColor: "#333",
                    color: "#fff",
                    borderRadius: 2,
                    "&:hover": { backgroundColor: "#444" },
                  }}
                >
                  <InstagramIcon fontSize="small" />
                </IconButton>
                <IconButton
                  sx={{
                    backgroundColor: "#333",
                    color: "#fff",
                    borderRadius: 2,
                    "&:hover": { backgroundColor: "#444" },
                  }}
                >
                  <TelegramIcon fontSize="small" />
                </IconButton>
                <IconButton
                  sx={{
                    backgroundColor: "#333",
                    color: "#fff",
                    borderRadius: 2,
                    "&:hover": { backgroundColor: "#444" },
                  }}
                >
                  <LinkedInIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>
          </Grid>

          <Grid
            size={{
              xs: 12,
              sm: 6,
              lg: 2,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", color: "#fff", mb: 2 }}
            >
              دسترسی سریع
            </Typography>
            <Stack spacing={1.5}>
              {[
                "خرید آپارتمان مسکونی",
                "رهن و اجاره خانه",
                "خرید ویلا و باغ",
                "املاک تجاری و اداری",
                "فایل‌های ممتاز و ویژه",
              ].map((item) => (
                <Link
                  key={item}
                  href="#"
                  underline="none"
                  sx={{
                    color: "#aaa",
                    fontSize: "0.85rem",
                    "&:hover": { color: "#fff" },
                  }}
                >
                  {item}
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", color: "#fff", mb: 2 }}
            >
              خدمات ملکینو
            </Typography>
            <Stack spacing={1.5}>
              {[
                "ثبت رایگان فایل ملکی",
                "درخواست خرید ملک",
                "پنل دفاتر و مشاورین املاک",
                "سامانه تخمین قیمت روز",
                "قوانین و مقررات حقوقی",
              ].map((item) => (
                <Link
                  key={item}
                  href="#"
                  underline="none"
                  sx={{
                    color: "#aaa",
                    fontSize: "0.85rem",
                    "&:hover": { color: "#fff" },
                  }}
                >
                  {item}
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", color: "#fff", mb: 2 }}
            >
              ارتباط و پشتیبانی
            </Typography>
            <Stack spacing={2}>
              {/* شماره تماس */}
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <SupportAgentIcon sx={{ color: "#f5a623" }} />
                <Typography variant="body2" sx={{ color: "#aaa" }}>
                  پشتیبانی تلفنی ۲۴/۷
                </Typography>
              </Stack>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#fff",
                  textAlign: "left",
                }}
              >
                ۰۲۱ - ۹۱۰۰۸۰۸۰
              </Typography>

              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: 1,
                }}
              >
                <LocationOnOutlinedIcon sx={{ color: "#f5a623", mt: 0.5 }} />
                <Typography
                  variant="body2"
                  sx={{ color: "#aaa", lineHeight: 1.8 }}
                >
                  قم، بلوار امیر کبیر، ساختمان تجاری ملکینو، طبقه ۵
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: "#333", my: 3 }} />

        <Stack
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* کپی‌رایت */}
          <Typography
            variant="caption"
            sx={{ color: "#777", textAlign: "center" }}
          >
            © ۱۴۰۳ تمامی حقوق مادی و معنوی این پلتفرم متعلق به سامانه املاک
            ملکینو است.
          </Typography>

          <Stack direction="row" spacing={3}>
            <Link
              href="#"
              underline="none"
              sx={{
                color: "#777",
                fontSize: "0.75rem",
                "&:hover": { color: "#fff" },
              }}
            >
              حریم خصوصی
            </Link>
            <Link
              href="#"
              underline="none"
              sx={{
                color: "#777",
                fontSize: "0.75rem",
                "&:hover": { color: "#fff" },
              }}
            >
              شرایط استفاده
            </Link>
            <Link
              href="#"
              underline="none"
              sx={{
                color: "#777",
                fontSize: "0.75rem",
                "&:hover": { color: "#fff" },
              }}
            >
              نقشه سایت
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
