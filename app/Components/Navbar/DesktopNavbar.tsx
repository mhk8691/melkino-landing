"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AppBar, Box, Button, IconButton, Avatar, Menu, MenuItem } from "@mui/material";
import LocationOnOutlined from "@mui/icons-material/LocationOnOutlined";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import MenuRounded from "@mui/icons-material/MenuRounded";
import BookmarkBorderRounded from "@mui/icons-material/BookmarkBorderRounded";
import { NAV_ITEMS, isNavActive } from "./nav-items";
import LocationPickerModal from "../ChooseCity/LocationPickerModal";
import SearchBox from "./SearchBox";

export default function DesktopNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const handleSearch = (query: string) => { console.log("search:", query); };
  return <>
    <AppBar position="static" elevation={0} color="inherit" sx={{bgcolor: 'transparent', pt: {xs: 2.5, md: 3}, pb: 2.5}}>
      <Box sx={{width:'100%', maxWidth:1440, mx:'auto', px:{xs:2,sm:4}, display:'grid', gridTemplateColumns:{xs:'minmax(0, 1fr) auto minmax(0, 1fr)', md:'auto minmax(250px, 1fr) auto'}, alignItems:'center', gap:{xs:0.5, sm:2, md:3}}}>
        <Box sx={{display:'flex', alignItems:'center',gap:{xs:0,sm:1}, minWidth:0, gridColumn:1,gridRow:1}}>
          <IconButton aria-label="منوی اصلی" onClick={e=>setAnchor(e.currentTarget)} sx={{color:'#15234b'}}><MenuRounded sx={{fontSize:29}} /></IconButton>
          <Button onClick={()=>setOpen(true)} startIcon={<LocationOnOutlined />} endIcon={<KeyboardArrowDown />} sx={{color:'text.primary',bgcolor:'#eef2fb',borderRadius:10,px:{xs:1,sm:2},minWidth:0, fontSize:{xs:12,sm:14}, '& .MuiButton-startIcon':{marginInlineEnd:0.25}, '& .MuiButton-endIcon':{display:{xs:'none',sm:'inherit'}}}}>تهران</Button>
          <Box component={Link} href="/" sx={{display:{xs:'none',md:'block'},position:'relative',width:58,height:58,mr:1}}><Image src="/images/melkino.png" alt="ملکینو" fill priority sizes="58px" style={{objectFit:'contain'}} /></Box>
        </Box>
        <Box component={Link} href="/" aria-label="ملکینو، صفحه اصلی" sx={{display:{xs:'block',md:'none'},gridColumn:2,gridRow:1,position:'relative',width:{xs:46,sm:66},height:{xs:46,sm:66}}}><Image src="/images/melkino.png" alt="ملکینو" fill priority sizes="66px" style={{objectFit:'contain'}} /></Box>
        <Box sx={{gridColumn:{xs:'1 / -1',md:2},gridRow:{xs:2,md:1},width:'100%',minWidth:0,'& > div':{maxWidth:'none'},'& form':{height:{xs:49,sm:58},borderRadius:'14px',borderColor:'#e0e5f0',bgcolor:'rgba(255,255,255,.85)'}}}><SearchBox onSearch={handleSearch} /></Box>
        <Box sx={{gridColumn:3,gridRow:1,display:'flex',justifyContent:'flex-end',alignItems:'center',gap:{xs:0.5,sm:2}}}>
          <IconButton component={Link} href="/saved" aria-label="نشان‌ها" sx={{bgcolor:'#fff',borderRadius:'14px',color:isNavActive(pathname,'/saved')?'primary.main':'#65708c'}}><BookmarkBorderRounded /></IconButton>
          <Link href={NAV_ITEMS.find(item=>item.key==='profile')!.href} aria-label="ملکینوی من"><Avatar src="/images/profile.png" sx={{width:{xs:36,sm:48},height:{xs:36,sm:48}}} /></Link>
        </Box>
      </Box>
    </AppBar>
    <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={()=>setAnchor(null)}>{NAV_ITEMS.map(item=><MenuItem key={item.key} component={Link} href={item.key==='submit'?'https://panel.mlkino.com/files/create':item.href} onClick={()=>setAnchor(null)} selected={isNavActive(pathname,item.href)}>{item.label}</MenuItem>)}</Menu>
    <LocationPickerModal open={open} onClose={()=>setOpen(false)} />
  </>;
}
