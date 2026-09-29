import type { SvgIconComponent } from '@mui/icons-material';

import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import FolderIcon from '@mui/icons-material/Folder';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PersonIcon from '@mui/icons-material/Person';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';

export type NavItem = {
  key: 'listings' | 'vip' | 'requests' | 'profile' | 'saved';
  label: string;
  href: string;
  icon: SvgIconComponent;
  activeIcon: SvgIconComponent;
  group: 'main' | 'account';
};

export const NAV_ITEMS: NavItem[] = [
  { key: 'listings', label: 'فایل‌ها', href: '/listings', icon: FolderOpenOutlinedIcon, activeIcon: FolderIcon, group: 'main' },
  { key: 'vip', label: 'فایل‌های ویژه', href: '/vip', icon: StarBorderRoundedIcon, activeIcon: StarRoundedIcon, group: 'main' },
  { key: 'requests', label: 'درخواست‌ها', href: '/requests', icon: RequestQuoteOutlinedIcon, activeIcon: RequestQuoteIcon, group: 'main' },
  { key: 'saved', label: 'ذخیره‌شده‌ها', href: '/saved', icon: BookmarkBorderRoundedIcon, activeIcon: BookmarkRoundedIcon, group: 'account' },
  { key: 'profile', label: 'ملکینوی من', href: '/panel', icon: PersonOutlineOutlinedIcon, activeIcon: PersonIcon, group: 'account' },
];

export const MAIN_ITEMS = NAV_ITEMS.filter((i) => i.group === 'main');

export const isNavActive = (pathname: string | null, href: string) =>
  !!pathname && (pathname === href || pathname.startsWith(`${href}/`));