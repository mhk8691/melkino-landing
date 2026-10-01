'use client'
import { Grid } from '@mui/material';
import React, { useState } from 'react'
import ResponsiveFilter from '../Components/Filter/ResponsiveFilter';
import FileToolbar from '../Components/Sort/Sort';
import CardFile from '../Components/Card/CardFile';
import PaginationBar from '../Components/Pagination/PaginationBar';
import { propertyItem } from '../page';

export default function RequestsList() {
   const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 24;
  return (
    <Grid container spacing={2}>
      <ResponsiveFilter />

      {/* کارت‌ها */}
      <Grid
        container
        size={{ xs: 12, md: 8, lg: 9 }}
        rowSpacing={2}
        columnSpacing={1}
      >
        <FileToolbar />
        {[1, 2, 3, 4, 5].map((item) => (
          <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 3 }} key={item}>
            <CardFile data={propertyItem} />
          </Grid>
        ))}
        <PaginationBar
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          siblingCount={1}
          boundaryCount={1}
        />
      </Grid>
    </Grid>
  );
}
