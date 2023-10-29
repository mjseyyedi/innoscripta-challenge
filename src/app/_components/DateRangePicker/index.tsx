import React, {useEffect} from "react";
import Box from '@mui/material/Box'
import {useTheme} from "@mui/material";
import { DateRangePicker, DateRange } from "mui-daterange-picker";

export const DateRangeSetter = ({ open, toggle, onSubmitRange }) => {

    const theme = useTheme()
    const [dateRange, setDateRange] = React.useState<any>({});


    useEffect(() => {
        if(dateRange?.endDate){
            onSubmitRange(dateRange)
            toggle()
        }
    }, [dateRange])

    return <DateRangePicker
        open={open}
        toggle={toggle}
        onChange={(range) => setDateRange(range)}
    />
}

export default DateRangeSetter