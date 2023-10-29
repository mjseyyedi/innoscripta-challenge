import Box from '@mui/material/Box'
import {Button, Chip, IconButton, Input, TextField, Typography, useTheme} from "@mui/material";
import {Drawer} from "@mui/material";
import {CloseSharp} from "@mui/icons-material";
import DateRangePicker from "@/app/_components/DateRangePicker";
import useFilter from "@/app/_components/FilterSheet/useFilter";
import React, {useEffect, useState} from "react";
import AutoRequestInput from "@/app/_components/AutoRequestInput";

import {EndpointsURL, newsAPIAIInstance} from "@/app/_lib/api";
const anchor = 'bottom';

const Title = ({text}) => {
    return <Typography variant="h6" sx={{fontSize: 'fontSize'}}>
        {text}
    </Typography>
}

export const FilterSheet = ({ sheetState, toggleSheet, categories, onSubmit }: {sheetState: boolean, toggleSheet: any, categories: any[], onSubmit: any}) => {

    const theme = useTheme();

    const {activeCat, handleSelectCat} = useFilter()
    const [open, setOpen] = React.useState(false);
    const [dateRange, setDateRange] = React.useState<any>({});
    const toggle = () => setOpen(!open);
    const [activeAIFilters, setAIFilters] = useState({})

    return <Drawer
        sx={{' .MuiPaper-root': {minHeight: 400, py: 3}}}
        paperProps
        anchor={anchor}
        open={sheetState}
        onClose={() => toggleSheet(false)}
    >
        <Box display="flex" flexDirection="column" px={3}>
            <Title text="news API org Categories"/>
            <Box sx={{"> div": {mr: 1, mb: 1}}} py={1}>
                {categories?.map(cat => <Chip key={cat} label={cat}
                                              sx={{color: activeCat.has(cat) ? 'background.paper' : theme.palette.grey[600]}}
                                              color={activeCat.has(cat) ? 'primary' : 'default'}
                                              onClick={() => handleSelectCat(cat)} />)}
            </Box>
        </Box>
        <Box display="flex" flexDirection="column" px={3} pb={2}>
            <Title text="Date Range" />
            <Box display="flex"
                 justifyContent="space-around"
                 pt={1}
                 gap={1}
                 onClick={toggle}>
                <TextField placeholder="start date"
                       sx={{"input": {fontSize: 12}}}
                           size="small"
                       value={dateRange?.startDate}/>
                <TextField placeholder="end date"
                           size="small"
                           sx={{"input": {fontSize: 12}}}
                       value={dateRange?.endDate}/>
            </Box>

        </Box>

        <DateRangePicker open={open}
                         onSubmitRange={setDateRange}
                         toggle={toggle}/>

        <AutoRequestInput title="news API AI categories"
                          inputPlaceholder="Add a category"
                          endpoint={EndpointsURL.newsAPIAI.getCategories}
                          optionLabel="label"
                          onChangeSelection={categories => setAIFilters(prevState => ({...prevState, categories}))}
                          APIInstance={newsAPIAIInstance} />

        <AutoRequestInput title="news API AI sources"
                          inputPlaceholder="Add a source"
                          endpoint={EndpointsURL.newsAPIAI.getSources}
                          optionLabel="title"
                          onChangeSelection={sources => setAIFilters(prevState => ({...prevState, sources}))}
                          APIInstance={newsAPIAIInstance} />

        <AutoRequestInput title="news API AI authors"
                          inputPlaceholder="Add an author"
                          endpoint={EndpointsURL.newsAPIAI.getAuthors}
                          optionLabel="name"
                          onChangeSelection={authors => setAIFilters(prevState => ({...prevState, authors}))}
                          APIInstance={newsAPIAIInstance} />


        <Box pb={1} px={3} display="flex"
             widht="100%" gap={1}
             justifyContent="flex-end">
            <Button onClick={() => toggleSheet(false)}>
                Cancel
            </Button>
            <Button variant="contained"
                    onClick={() => {
                        toggleSheet(false)
                        onSubmit({...activeAIFilters, dateRange, newsOrgCats: [...activeCat]})
                    }}>
                Submit
            </Button>
        </Box>
    </Drawer>
}

export default FilterSheet