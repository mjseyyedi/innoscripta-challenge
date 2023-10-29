import {LatestNews} from "@/app/_types";
import {Box, Divider, Typography, useTheme} from "@mui/material";
import Link from '@mui/material/Link';
import Image from "next/image";

import {timeDiff} from "@/app/_utils";
import {useState} from "react";

const Logo =  "/images/newsLogo.png"

export const LatestNews = ({news} : {news: LatestNews}) => {
    const theme = useTheme()

    const now = new Date();
    const elapsedTime = timeDiff(now, new Date(news.publicationDate))
    const [hasError, setError] = useState<boolean>(false)


    return <Box mb={2}
                sx={{width: '100%', [theme.breakpoints.up('md')]: {
            // marginLeft: theme.spacing(1),
            width: '50%',
            boxSizing: 'border-box'
        }}}>
        <Box display="flex" pb={4} sx={{"&>img" : {
            borderRadius: theme.shape.borderRadius+"px"
        }
        }}>
            <Image loader={() => news.image ?? Logo}
                   src={ hasError ? Logo : (news.image ?? Logo)}
                   borderRadius={2}
                   height={120}
                   width={120}
                   unoptimized
                   onError={e => setError(true)}
                   alt={news.title}/>

            <Box ml={1} display="flex"
                 sx={{width: `calc(100% - 120px)`}}
                 flexDirection="column" justifyContent="space-between" >
                <Typography variant="subtitle2" sx={{fontWeight: "fontWeightBold", maxWidth: '80%'}}>
                    {news.title}
                </Typography>

                <Box display="flex" alignItems="center" justifyContent="flex-start" gap={2}>
                    <Link href={news.source.url}
                          sx={{fontSize: 12, maxWidth: '50%', whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                              overflow: 'hidden'}}
                          color={theme.palette.info.main}
                          underline="none">
                        {news.source.name}
                    </Link>
                    <Box sx={{width: '6px', height: '6px',
                        borderRadius: '50%',
                        backgroundColor: theme.palette.grey[500]}}/>

                    <Typography variant="subtitle2"
                                sx={{whiteSpace: 'nowrap', fontSize: 12}}
                                color={theme.palette.grey[500]}>
                        {elapsedTime}
                    </Typography>
                </Box>

            </Box>
        </Box>
        <Divider orientation="horizontal" />
    </Box>
}

export default LatestNews