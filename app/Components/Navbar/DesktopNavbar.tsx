'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  IconButton,
  Avatar,
  Tooltip,
  Divider,
} from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

import { MAIN_ITEMS, NAV_ITEMS, isNavActive } from './nav-items';
import LocationPickerModal from '../ChooseCity/LocationPickerModal';



function CitySelector({setOpen}:{setOpen:React.Dispatch<React.SetStateAction<boolean>>}) {
  return (
    <Button
      color="inherit"
      aria-label="انتخاب شهر"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        borderRadius: 999,
        px: { xs: 1.25, lg: 1.75 },
        py: 0.75,
        bgcolor: 'grey.100',
        color: 'text.primary',
        fontSize: '0.85rem',
        fontWeight: 500,
        whiteSpace: 'nowrap',
        '&:hover': { bgcolor: 'grey.200' },
      }}
      onClick={()=>setOpen(true)}
    >
      <LocationOnOutlinedIcon color="primary" sx={{ fontSize: 18 }} />
      تهران
      <KeyboardArrowDownIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
    </Button>
  );
}

export default function DesktopNavbar() {
  const pathname = usePathname();
  const saved = NAV_ITEMS.find((i) => i.key === 'saved')!;
  const profile = NAV_ITEMS.find((i) => i.key === 'profile')!;
  const SavedIcon = isNavActive(pathname, saved.href) ? saved.activeIcon : saved.icon;
  const [open,setOpen] = useState(false)

  return (
   <>
    <AppBar
      position="sticky"
      elevation={0}
      color="inherit"
      sx={{
        bgcolor: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr auto', lg: '1fr auto 1fr' },
          alignItems: 'center',
          columnGap: 2,
          minHeight: { xs: 60, lg: 72 },
          px: { xs: 2, lg: 4 },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, lg: 2 } }}>
          <Link href="/" aria-label="ملکینو، صفحه اصلی" style={{ display: 'flex' }}>
            <Box
              component="span"
              sx={{
                position: 'relative',
                display: 'block',
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
                style={{ objectFit: 'contain' }}
              />
            </Box>
          </Link>
          <CitySelector setOpen={setOpen} />
        </Box>

        <Box
          component="nav"
          aria-label="ناوبری اصلی"
          sx={{ display: { xs: 'none', lg: 'flex' }, alignSelf: 'stretch', gap: 0.5 }}
        >
          {MAIN_ITEMS.map((item) => {
            const active = isNavActive(pathname, item.href);
            return (
              <Button
                key={item.key}
                component={Link}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                disableRipple
                color="inherit"
                sx={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.75,
                  borderRadius: 0,
                  px: 2.5,
                  fontSize: '0.92rem',
                  fontWeight: active ? 700 : 500,
                  color: active ? 'primary.main' : 'text.secondary',
                  transition: 'color .2s ease',
                  '&:hover': { bgcolor: 'transparent', color: 'primary.main' },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    left: 16,
                    right: 16,
                    bottom: -1,
                    height: 3,
                    borderRadius: '3px 3px 0 0',
                    bgcolor: 'secondary.main',
                    transform: active ? 'scaleX(1)' : 'scaleX(0)',
                    transition: 'transform .25s ease',
                  },
                  '&:hover::after': { transform: active ? 'scaleX(1)' : 'scaleX(0.35)' },
                  '@media (prefers-reduced-motion: reduce)': {
                    transition: 'none',
                    '&::after': { transition: 'none' },
                  },
                }}
              >
                {item.key === 'vip' && (
                  <StarRoundedIcon sx={{ fontSize: 18, color: 'secondary.main' }} />
                )}
                {item.label}
              </Button>
            );
          })}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1.5 }}>
          <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 1 }}>
            <Tooltip title={saved.label}>
              <IconButton
                component={Link}
                href={saved.href}
                aria-label={saved.label}
                sx={{
                  color: isNavActive(pathname, saved.href) ? 'primary.main' : 'text.secondary',
                  '&:hover': { bgcolor: 'grey.100' },
                }}
              >
                <SavedIcon />
              </IconButton>
            </Tooltip>

            <Divider orientation="vertical" flexItem sx={{ my: 2.5, mx: 0.5 }} />
          </Box>

          <Button
            component={Link}
            href="/listings/new"
            variant="contained"
            color="secondary"
            disableElevation
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.75,
              borderRadius: 2.5,
              fontWeight: 700,
              whiteSpace: 'nowrap',
              px: { xs: 1.5, lg: 2.5 },
              py: { xs: 0.75, lg: 1.1 },
              fontSize: { xs: '0.8rem', lg: '0.9rem' },
            }}
          >
            <AddCircleOutlineOutlinedIcon sx={{ fontSize: { xs: 18, lg: 20 } }} />
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
              ثبت رایگان ملک
            </Box>
            <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
              ثبت ملک
            </Box>
          </Button>

          <Box
            component={Link}
            href={profile.href}
            aria-current={isNavActive(pathname, profile.href) ? 'page' : undefined}
            sx={{
              display: { xs: 'none', lg: 'flex' },
              alignItems: 'center',
              p: 0.5,
              borderRadius: 999,
              textDecoration: 'none',
              color: 'inherit',
              '&:hover': { bgcolor: 'grey.100' },
            }}
          >
            <Avatar src="/images/profile.png" alt="" sx={{ width: 34, height: 34 }} />
            <Box sx={{ mx: 1, whiteSpace: 'nowrap' }}>
              <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
                {profile.label}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.2 }}>
                پنل کاربری
              </Typography>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
    <LocationPickerModal open={open} onClose={()=>setOpen(false)} />
   </>
  );
}