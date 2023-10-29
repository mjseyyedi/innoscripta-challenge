"use client"

import React, {useState} from "react";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

export function NavigationBar({sx}) {
    const [value, setValue] = useState(0)

    return  <BottomNavigation
        // showLabels
        sx={sx}
        value={value}
        onChange={(event, newValue) => {
            setValue(newValue);
        }}
    >
        <BottomNavigationAction icon={<HomeIcon />} />
        <BottomNavigationAction icon={<SearchIcon />} />
        <BottomNavigationAction icon={<FilterListIcon />} />
    </BottomNavigation>
}