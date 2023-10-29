import {useState} from "react";
import {LatestNews} from "@/app/_types";
import {Box, Divider, Typography, useTheme} from "@mui/material";
import Link from '@mui/material/Link';
import Image from "next/image";



const Logo =  "/images/newsLogo.png"

export const Headlines = ({news} : {news: LatestNews}) => {
    const theme = useTheme()
    const [hasError, setError] = useState<boolean>(false)


    return <Box mb={2} sx={{"&>img" : {
            borderRadius: theme.shape.borderRadius+"px"
        }, position: 'relative'
    }} >

        <Image loader={() => news.image ?? Logo}
               src={ hasError ? Logo : (news.image ?? Logo)}
               borderRadius={2}
               height={320}
               width={320}
               unoptimized
               onError={e => setError(true)}
               alt={news.title}/>

        <Box sx={{position: "absolute", bottom: 24}}>
            <Typography sx={{fontSize: '10px',
                textAlign: 'left', px: 2,
                fontWeight: "fontWeightLight", color: 'background.paper'}}>
              By  {news.source.name}
            </Typography>

            <Typography sx={{fontSize: '16',
                textAlign: 'left', px: 2,
                fontWeight: "fontWeightBold", color: 'background.paper'}}>
                {news.title}
            </Typography>
        </Box>


    </Box>
}

export default Headlines