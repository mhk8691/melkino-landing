import type { SvgIconComponent } from '@mui/icons-material';

import FolderIcon from '@mui/icons-material/Folder';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PersonIcon from '@mui/icons-material/Person';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import AddIcon from '@mui/icons-material/Add';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import HomeIcon from '@mui/icons-material/Home';
export type NavItem = {
  key: 'home' | 'submit' | 'support' | 'profile' | 'saved';
  label: string;
  href: string;
  icon: SvgIconComponent;
  activeIcon: SvgIconComponent;
  group: 'main' | 'account';
};

export const NAV_ITEMS: NavItem[] = [
  { key: 'home', label: 'خانه', href: '/', icon: HomeIcon, activeIcon: FolderIcon, group: 'main' },
  { key: 'saved', label: 'نشان ها', href: '/saved', icon: BookmarkBorderRoundedIcon, activeIcon: BookmarkRoundedIcon, group: 'account' },

  { key: 'support', label: 'چت و تماس', href: 'https://panel.mlkino.com/support', icon: SupportAgentIcon, activeIcon: RequestQuoteIcon, group: 'main' },
  { key: 'submit', label: 'ثبت', href: '/vip', icon: AddIcon, activeIcon: StarRoundedIcon, group: 'main' },
  { key: 'profile', label: 'ملکینوی من', href: '/panel', icon: PersonOutlineOutlinedIcon, activeIcon: PersonIcon, group: 'account' },
];

export const MAIN_ITEMS = NAV_ITEMS.filter((i) => i.group === 'main');

export const isNavActive = (pathname: string | null, href: string) =>
  !!pathname && (pathname === href || pathname.startsWith(`${href}/`));