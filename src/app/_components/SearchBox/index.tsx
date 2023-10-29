import Box from '@mui/material/Box'
import {InputBase, useTheme} from "@mui/material";
import { alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

export const SearchBox = ({ onChange }) => {

    const theme = useTheme()

    return <Box sx={{position: 'relative',
        border: `1px solid ${theme.palette.grey[200]}`,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            // width: 'auto',
        },}}>
        <Box sx={{
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <SearchIcon color="disabled" />
        </Box>
        <InputBase
            sx={{
                color: 'inherit',
                '& .MuiInputBase-input': {
                    padding: theme.spacing(1, 1, 1, 0),
                    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                    transition: theme.transitions.create('width'),
                    width: '100%',
                    [theme.breakpoints.up('sm')]: {
                        width: '12ch',
                        '&:focus': {
                            width: '20ch',
                        },
                    },
                },
            }}
            placeholder="Search…"
            onChange={onChange}
            inputProps={{ 'aria-label': 'search' }}
        />
    </Box>
}

export default SearchBox