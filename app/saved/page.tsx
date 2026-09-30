import { Container } from "@mui/material";
import React from "react";
import SavedItemsHeader from "../Components/SavedItems/SavedItemsHeader";
import SavedItems from "../Components/SavedItems/SavedItems";
import EmptySavedState from "../Components/SavedItems/EmptySavedState";
import RequestPropertyBanner from "../Components/SavedItems/RequestPropertyBanner";

export default function SavedPage() {
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
        mt:2
      }}
    >
      <SavedItemsHeader />
      <SavedItems/>
      <EmptySavedState/>
      <RequestPropertyBanner />
    </Container>
  );
}
