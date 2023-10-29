import CircularProgress from '@mui/material/CircularProgress';
import {Box} from "@mui/material";

export const Loading = ({height = "100px"} ) => {


    return  <Box sx={{ display: 'flex', height, alignItems: 'center', justifyContent: 'center', width: "100%" }}>
        <CircularProgress />
    </Box>
}

export default Loading