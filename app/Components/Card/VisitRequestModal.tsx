"use client";

import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Stack,
  Typography,
  Box,
  InputAdornment,
  alpha,
  CircularProgress,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import PhoneInTalkRoundedIcon from "@mui/icons-material/PhoneInTalkRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { PropertyType } from "@/app/Core/types";

export interface VisitRequestPayload {
  fullName: string;
  phone: string;
  visitDate: string; // YYYY-MM-DD
  visitTime: string; // HH:mm
  description: string;
}

export interface VisitRequestModalProps {
  open: boolean;
  onClose: () => void;
  property?: PropertyType | null;
  onSubmit?: (payload: VisitRequestPayload) => void | Promise<void>;
}

const initialForm: VisitRequestPayload = {
  fullName: "",
  phone: "",
  visitDate: "",
  visitTime: "",
  description: "",
};

/** تبدیل اعداد فارسی/عربی به انگلیسی */
const toEnglishDigits = (str: string) =>
  str
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));

/** اعتبارسنجی شماره موبایل ایران */
const isValidIranMobile = (phone: string) =>
  /^09\d{9}$/.test(toEnglishDigits(phone).replace(/\s|-/g, ""));

export default function VisitRequestModal({
  open,
  onClose,
  property,
  onSubmit,
}: VisitRequestModalProps) {
  const [form, setForm] = React.useState<VisitRequestPayload>(initialForm);
  const [errors, setErrors] = React.useState<
    Partial<Record<keyof VisitRequestPayload, string>>
  >({});
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleChange =
    (field: keyof VisitRequestPayload) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const validate = (): boolean => {
    const next: Partial<Record<keyof VisitRequestPayload, string>> = {};
    if (!form.fullName.trim()) next.fullName = "نام و نام خانوادگی الزامی است.";
    if (!form.phone.trim()) next.phone = "شماره تماس الزامی است.";
    else if (!isValidIranMobile(form.phone))
      next.phone = "شماره موبایل معتبر نیست (مثال: ۰۹۱۲۳۴۵۶۷۸۹).";
    if (!form.visitDate) next.visitDate = "تاریخ بازدید الزامی است.";
    if (!form.visitTime) next.visitTime = "ساعت بازدید الزامی است.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      setSubmitting(true);
      await onSubmit?.(form);
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={submitting ? undefined : onClose}
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: {
          sx: {
            borderRadius: "16px",
            overflow: "hidden",
          },
        },
      }}
    >
      {/* هدر */}
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pb: 1,
          background: (theme) =>
            `linear-gradient(135deg, ${alpha(
              theme.palette.primary.main,
              0.08,
            )} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
        }}
      >
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: alpha("#10B981", 0.12),
              color: "#059669",
            }}
          >
            <EventAvailableRoundedIcon sx={{ fontSize: 20 }} />
          </Box>
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 800, lineHeight: 1.2 }}
            >
              ثبت درخواست بازدید
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontSize: 11 }}
            >
              اطلاعات تماس و زمان مورد نظر خود را وارد کنید
            </Typography>
          </Box>
        </Stack>
        <IconButton onClick={onClose} size="small" disabled={submitting}>
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ pt: 2.5 }}>
        {success ? (
          <Stack
            spacing={1.5}
            sx={{
              alignItems: "center",
              justifyContent: "center",
              py: 4,
              textAlign: "center",
            }}
          >
            <CheckCircleRoundedIcon sx={{ fontSize: 64, color: "#10B981" }} />
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              درخواست بازدید ثبت شد
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              کارشناس مربوطه در اسرع وقت با شما تماس می‌گیرد.
            </Typography>
          </Stack>
        ) : (
          <Stack spacing={2}>
            {/* خلاصه ملک */}
            {property && (
              <Box
                sx={{
                  p: 1.25,
                  borderRadius: "10px",
                  bgcolor: alpha("#1976d2", 0.05),
                  border: `1px solid ${alpha("#1976d2", 0.12)}`,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", fontSize: 11 }}
                >
                  ملک مورد نظر:
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, mt: 0.25 }}
                  noWrap
                >
                  {`${property.propertyType ?? ""} ${
                    property.contractType ? `- ${property.contractType}` : ""
                  }${property.city ? ` • ${property.city}` : ""}`}
                </Typography>
              </Box>
            )}

            {/* نام و نام خانوادگی */}
            <TextField
              label="نام و نام خانوادگی"
              placeholder="مثلاً: علی محمدی"
              value={form.fullName}
              onChange={handleChange("fullName")}
              error={!!errors.fullName}
              helperText={errors.fullName}
              fullWidth
              size="small"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineRoundedIcon
                        sx={{ fontSize: 18, color: "text.secondary" }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
            />

            {/* شماره تماس */}
            <TextField
              label="شماره تماس"
              placeholder="۰۹۱۲۳۴۵۶۷۸۹"
              value={form.phone}
              onChange={handleChange("phone")}
              error={!!errors.phone}
              helperText={errors.phone}
              fullWidth
              size="small"
              slotProps={{
                htmlInput: {
                  inputMode: "tel",
                  dir: "ltr",
                  style: { textAlign: "right" },
                },
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneInTalkRoundedIcon
                        sx={{ fontSize: 18, color: "text.secondary" }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
            />

            {/* زمان مناسب بازدید: تاریخ و ساعت */}
            <Box>
              <Stack
                direction="row"
                spacing={0.5}
                sx={{ alignItems: "center", mb: 0.75 }}
              >
                <EventAvailableRoundedIcon
                  sx={{ fontSize: 16, color: "text.secondary" }}
                />
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", fontWeight: 600 }}
                >
                  زمان مناسب بازدید
                </Typography>
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <TextField
                  label="تاریخ"
                  type="date"
                  value={form.visitDate}
                  onChange={handleChange("visitDate")}
                  error={!!errors.visitDate}
                  helperText={errors.visitDate}
                  fullWidth
                  size="small"
                  slotProps={{ inputLabel: { shrink: true } }}
                />
                <TextField
                  label="ساعت"
                  type="time"
                  value={form.visitTime}
                  onChange={handleChange("visitTime")}
                  error={!!errors.visitTime}
                  helperText={errors.visitTime}
                  fullWidth
                  size="small"
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              </Stack>
            </Box>

            {/* توضیحات */}
            <TextField
              label="توضیحات"
              placeholder="در صورت نیاز توضیح بیشتری وارد کنید..."
              value={form.description}
              onChange={handleChange("description")}
              fullWidth
              multiline
              minRows={3}
              size="small"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ alignSelf: "flex-start", mt: 1.25 }}
                    >
                      <NotesRoundedIcon
                        sx={{ fontSize: 18, color: "text.secondary" }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Stack>
        )}
      </DialogContent>

      {!success && (
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            onClick={onClose}
            variant="text"
            disabled={submitting}
            sx={{ fontWeight: 700, borderRadius: "10px" }}
          >
            انصراف
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="success"
            disabled={submitting}
            startIcon={
              submitting ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                <EventAvailableRoundedIcon sx={{ fontSize: 18 }} />
              )
            }
            sx={{
              fontWeight: 700,
              borderRadius: "10px",
              px: 3,
              boxShadow: "0 4px 12px rgba(16,185,129,0.3)",
              "&:hover": { boxShadow: "0 6px 16px rgba(16,185,129,0.4)" },
            }}
          >
            {submitting ? "در حال ارسال..." : "ثبت درخواست"}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}