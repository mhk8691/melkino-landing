'use client'
import { useState } from 'react'
import { Box, Button, Drawer, useMediaQuery, useTheme } from '@mui/material'
import Grid from '@mui/material/Grid'
import TuneIcon from '@mui/icons-material/Tune'
import CardFile from './CardFile'
import { propertyItem } from '@/app/page'
import AdvancedFilterPanel from '../Filter/AdvancedFilterPanel'
// import CardFile from '...'
// const propertyItem = ...

export default function PropertiesPage() {
  const theme = useTheme()
  // زیر md (۹۰۰px) = موبایل و تبلت
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true })
  const [filterOpen, setFilterOpen] = useState(false)

  return (
    <Grid container spacing={2}>
      {/* فیلتر: دسکتاپ = ستون کناری sticky | موبایل = دکمه + Bottom Sheet */}
      {isMobile ? (
        <>
          <Grid size={12}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<TuneIcon />}
              onClick={() => setFilterOpen(true)}
              sx={{ py: 1.2, borderRadius: '10px', fontWeight: 700 }}
            >
              فیلترهای پیشرفته
            </Button>
          </Grid>

          <Drawer
            anchor="bottom"
            open={filterOpen}
            onClose={() => setFilterOpen(false)}
            keepMounted // state فیلترها با بستن Drawer از بین نمی‌رود
            slotProps={{
              paper: {
                sx: {
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  maxHeight: '90dvh',
                },
              },
            }}
          >
            <AdvancedFilterPanel
              embedded
              onClose={() => setFilterOpen(false)}
              onApply={() => setFilterOpen(false)}
            />
          </Drawer>
        </>
      ) : (
        <Grid size={{ md: 4, lg: 3 }}>
          <Box sx={{ position: 'sticky', top: 16 }}>
            <AdvancedFilterPanel />
          </Box>
        </Grid>
      )}

      {/* کارت‌ها */}
      <Grid container size={{ xs: 12, md: 8, lg: 9 }} spacing={1} >
        {[1, 2, 3, 4, 5].map((item) => (
          <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 3 }} key={item}>
            {/* برای هم‌ارتفاع شدن کارت‌ها، به CardFile استایل height: '100%' بدهید */}
            <CardFile data={propertyItem} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}