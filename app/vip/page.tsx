import { Container } from "@mui/material";
import React from "react";
import TitleHeader from "../Components/PropertyDetail/TitleHeader";
import VipList from "./VipList";

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
      <TitleHeader title="لیست فایل های vip" />
      <VipList />
    </Container>
  );
}
