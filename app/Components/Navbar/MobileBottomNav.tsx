'use client';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { isNavActive, NAV_ITEMS } from './nav-items';

const NAVY = '#1a237e';
const NAVY_SOFT = 'rgba(26, 35, 126, 0.10)';
const INACTIVE = '#6b7280';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const value = NAV_ITEMS.findIndex((item) => isNavActive(pathname, item.href));

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
        {NAV_ITEMS.map(({ key, label, href, icon: Icon, activeIcon: ActiveIcon }, index) => (
          <BottomNavigationAction
            key={key}
            component={Link}
            href={href}
            aria-current={value === index ? 'page' : undefined}
            label={label}
            disableRipple
            icon={
              <span className="nav-pill">
                {value === index ? (
                  <ActiveIcon sx={{ fontSize: { xs: 18, sm: 22 } }} />
                ) : (
                  <Icon sx={{ fontSize: { xs: 18, sm: 22 } }} />
                )}
              </span>
            }
          />
        ))}
      </BottomNavigation>
    </Box>
  );
}