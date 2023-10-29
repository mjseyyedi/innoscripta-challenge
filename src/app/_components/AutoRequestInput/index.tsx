import React, {useEffect, useMemo, useState} from "react";
import Box from '@mui/material/Box'
import {Chip, Typography} from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from "@mui/material/TextField";
import { debounce } from '@mui/material/utils';

import useSWR from "swr";

export const AutoRequestInput = ({APIInstance ,endpoint, title, inputPlaceholder ,optionLabel, onChangeSelection} :
                                     {endpoint: string, APIInstance: any, inputPlaceholder: string, onChangeSelection: any,
                                         title: string, optionLabel: string}) => {

    const [prefix, setPrefix] = useState<string>('')
    const {data = []} = useSWR([endpoint, prefix], ([url, prefix]) => APIInstance.post(url, {prefix, apiKey: process.env.NEXT_PUBLIC_NEWS_API_AI_API_KEY}))

    const [options, setOptions] = useState(new Set());
    const debouncedPrefixSet = useMemo(() => debounce((query) => setPrefix(query), 700), [])


    useEffect(() => {
        onChangeSelection([...options])
    }, [options])

    return <Box px={3} pb={2}>
        <Typography variant="h6"
                    pb={1}
                    sx={{fontSize: 'fontSize'}}>
            {title}
        </Typography>
        <Autocomplete
            filterSelectedOptions
            includeInputInList
            autoComplete
            options={data}
            getOptionLabel={(option) =>
                typeof option === 'string' ? option : option[optionLabel]
            }
            filterOptions={(x) => x}
            value={prefix}
            onChange={(event: any, newValue) => {
                if(newValue){
                    const newSet = new Set(options);
                    if (newSet.has(newValue)) newSet.delete(newValue);
                    else newSet.add(newValue);
                    setOptions(newSet);
                    console.log(444, newValue, [...newSet])
                }

                setPrefix('');
            }}
            onInputChange={(_, newInputValue) => debouncedPrefixSet(newInputValue)}
            renderInput={(params) => (
                <TextField {...params}
                    size="small"
                           label={inputPlaceholder} fullWidth />
            )}
        />
        <Box display="flex" gap={1}
             mt={1}
             flexWrap="wrap">
            {
                [...options]?.map(option => <Chip key={option.uri} label={option[optionLabel]}/>)
            }
        </Box>

    </Box>


}

export default AutoRequestInput