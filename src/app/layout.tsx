import React from "react";
import type { Metadata } from 'next'
import Image from "next/image";
import { Inter } from 'next/font/google'

import SWRProvider from "@/app/_providers/SWR";
import {ThemeRegistry} from "@/app/_assets/theme";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {ITEM_SIZES} from "@/app/_utils";
import SearchBox from "@/app/_components/SearchBox";
// import {NavigationBar} from "@/app/_components/NavigationBar";
// import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Innoscripta challenge',
  description: 'Developed by MohammadJavad',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ThemeRegistry>
          <AppBar position="sticky" sx={{ zIndex: 1000, top: 0, boxShadow: 'none' }}>
              <Toolbar sx={{ backgroundColor: 'background.paper', justifyContent: "center" }}>
                  <Image src="/images/newsLogo.png" alt="app logo"  width="24" height="24"/>
                  <Typography variant="body2" color="text.primary" sx={{fontWeight: 'fontWeightBold'}} ml="10px">
                      News Reader
                  </Typography>
              </Toolbar>
          </AppBar>
          <SWRProvider>
            {children}
          </SWRProvider>
        {/*<NavigationBar sx={{position: 'fixed', bottom: 0, left: 0, right: 0}}/>*/}
      </ThemeRegistry>
      </body>
    </html>
  )
}
