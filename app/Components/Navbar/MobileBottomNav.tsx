'use client';
import { useState, MouseEvent } from 'react';
import { BottomNavigation, BottomNavigationAction, Box, Menu, MenuItem, Typography } from '@mui/material';
import HomeWorkRoundedIcon from '@mui/icons-material/HomeWorkRounded';
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { isNavActive, NAV_ITEMS } from './nav-items';

const NAVY = '#1a237e';
const NAVY_SOFT = 'rgba(26, 35, 126, 0.10)';
const INACTIVE = '#6b7280';

const SUBMIT_OPTIONS = [
  {
    href: 'https://panel.mlkino.com/files/create',
    title: 'ثبت ملک',
    caption: 'ویژه مالک و موجر',
    icon: HomeWorkRoundedIcon,
  },
  {
    href: 'https://panel.mlkino.com/requests/create',
    title: 'درخواست ملک',
    caption: 'ویژه خریدار و مستاجر',
    icon: ManageSearchRoundedIcon,
  },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const value = NAV_ITEMS.findIndex((item) => isNavActive(pathname, item.href));

  // مدیریت وضعیت منوی بازشونده برای دکمه ثبت
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isSubmitMenuOpen = Boolean(anchorEl);

  const handleSubmitClick = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Box
      component="nav"
      aria-label="ناوبری اصلی"
      sx={{
        display: { xs: 'block', lg: 'none' },
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        px: 1.5,
        pt: 1,
        pb: 'max(env(safe-area-inset-bottom), 10px)',
        pointerEvents: 'none',
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        sx={{
          pointerEvents: 'auto',
          height: { xs: 60, sm: 68 },
          maxWidth: 560,
          mx: 'auto',
          px: 0.5,
          borderRadius: '24px',
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(14px)',
          border: '1px solid rgba(26, 35, 126, 0.08)',
          boxShadow: '0 8px 28px rgba(26, 35, 126, 0.16)',

          '& .MuiBottomNavigationAction-root': {
            minWidth: 0,
            flex: 1,
            padding: { xs: '6px 1px 5px', sm: '8px 2px 6px' },
            color: INACTIVE,
            gap: '4px',
            transition: 'color .2s ease',
          },

          '& .MuiBottomNavigationAction-label': {
            fontFamily: 'inherit',
            fontSize: { xs: '0.6rem', sm: '0.68rem' },
            fontWeight: 500,
            lineHeight: 1.2,
            whiteSpace: 'nowrap',
            opacity: 1,
            transition: 'color .2s ease, font-weight .2s ease',
            '&.Mui-selected': { fontSize: { xs: '0.6rem', sm: '0.68rem' }, fontWeight: 700 },
          },

          '& .nav-pill': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: { xs: 38, sm: 44 },
            height: { xs: 24, sm: 28 },
            borderRadius: '12px',
            backgroundColor: 'transparent',
            transition: 'background-color .25s ease, transform .25s ease',
          },
          '& .Mui-selected .nav-pill': {
            backgroundColor: NAVY_SOFT,
            transform: 'scale(1.06)',
          },
          '& .Mui-selected': { color: NAVY },

          // حالت فعال آیتم ثبت (وقتی منو باز است) مثل آیتم انتخاب‌شده
          '& .submit-open': {
            color: NAVY,
            '& .MuiBottomNavigationAction-label': { fontWeight: 700 },
            '& .nav-pill': {
              backgroundColor: NAVY_SOFT,
              transform: 'scale(1.06)',
            },
          },

          '& .MuiBottomNavigationAction-root.Mui-focusVisible': {
            outline: `2px solid ${NAVY}`,
            outlineOffset: -2,
            borderRadius: '18px',
          },

          '@media (prefers-reduced-motion: reduce)': {
            '& *': { transition: 'none !important' },
          },
        }}
      >
        {NAV_ITEMS.map(({ key, label, href, icon: Icon, activeIcon: ActiveIcon }, index) => {
          const isSubmit = key === 'submit';
          const isActive = value === index || (isSubmit && isSubmitMenuOpen);

          return (
            <BottomNavigationAction
              key={key}
              {...(!isSubmit
                ? { component: Link, href }
                : {
                    onClick: handleSubmitClick,
                    className: isSubmitMenuOpen ? 'submit-open' : undefined,
                    'aria-haspopup': 'menu' as const,
                    'aria-expanded': isSubmitMenuOpen,
                  })}
              aria-current={value === index ? 'page' : undefined}
              label={label}
              disableRipple
              icon={
                <span className="nav-pill">
                  {isActive ? (
                    <ActiveIcon sx={{ fontSize: { xs: 18, sm: 22 } }} />
                  ) : (
                    <Icon sx={{ fontSize: { xs: 18, sm: 22 } }} />
                  )}
                </span>
              }
            />
          );
        })}
      </BottomNavigation>

      {/* منوی بازشونده دکمه ثبت */}
      <Menu
        anchorEl={anchorEl}
        open={isSubmitMenuOpen}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        slotProps={{
          backdrop: {
            sx: { backgroundColor: 'rgba(15, 20, 60, 0.28)', backdropFilter: 'blur(3px)' },
          },
          paper: {
            sx: {
              mb: 1.5,
              p: 1,
              minWidth: 260,
              borderRadius: '20px',
              overflow: 'visible',
              boxShadow: '0 16px 40px rgba(26, 35, 126, 0.25)',
              // فلش کوچک زیر منو
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -6,
                left: '50%',
                width: 14,
                height: 14,
                bgcolor: 'background.paper',
                transform: 'translateX(-50%) rotate(45deg)',
                borderRadius: '3px',
              },
            },
          },
          list: { sx: { p: 0, display: 'flex', flexDirection: 'column', gap: 0.5 } },
        }}
      >
        {SUBMIT_OPTIONS.map(({ href, title, caption, icon: OptionIcon }) => (
          <MenuItem
            key={href}
            component={Link}
            href={href}
            onClick={handleClose}
            sx={{
              gap: 1.5,
              p: 1.25,
              borderRadius: '14px',
              '&:hover': { backgroundColor: NAVY_SOFT },
            }}
          >
            <Box
              sx={{
                width: 42,
                height: 42,
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '12px',
                color: NAVY,
                backgroundColor: NAVY_SOFT,
              }}
            >
              <OptionIcon sx={{ fontSize: 24 }} />
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body2" sx={{ fontWeight: 700, color: NAVY, fontFamily: 'inherit' }}>
                {title}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', fontSize: '0.72rem', fontFamily: 'inherit' }}
              >
                {caption}
              </Typography>
            </Box>

            <ChevronLeftRoundedIcon sx={{ color: INACTIVE, fontSize: 20 }} />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}