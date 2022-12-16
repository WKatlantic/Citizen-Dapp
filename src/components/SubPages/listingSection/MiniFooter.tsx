import React, { useCallback } from "react";
import { useContext, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { makeStyles } from "@mui/styles";
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import { Container, Grid, Stack, Typography, Box} from '@mui/material';

const useStyles = makeStyles(() => ({
    fontTitle:{
        fontSize:'12px',
    },
}));

const BADGE1 = "/images/app/badge/gold.png";
const BADGE2 = "/images/app/badge/silver.png";
const BADGE3 = "/images/app/badge/bronze.png";

const MiniFooter: NextPage = () => {
    return (
        <Grid sx={{mt:10}}>
            <Stack direction="row" justifyContent="center">
                <Typography>
                    <Typography sx={{fontSize:"12px", fontWeight:"bold"}} component="span">CITI&nbsp;BADGES</Typography>
                    <Typography sx={{fontSize:"12px"}} component="span"> - Projects receive badges after careful evaluation and due dilligence from CITI’s internal vetting team. </Typography>
                </Typography>
            </Stack>
            <Stack direction="row" justifyContent="center">
                <Typography>
                <Typography component="span" sx={{fontSize:"12px"}}>A&nbsp;</Typography>

                    <Typography component="span" sx={{fontSize:"12px", fontWeight:"bold"}}>GOLD&nbsp;</Typography>

                    <Typography component="span" sx={{fontSize:"12px"}}>badge</Typography>

                    <Box
                    component="img"
                    src={'/images/app/badge/gold.png'}
                    sx={{width:'20px', height:'20px'}}
                    ></Box>

                    <Typography component="span" sx={{fontSize:"12px"}}>
                        signifies that the project meets maximum standards followed by&nbsp;
                    </Typography>

                    <Typography component="span" sx={{fontSize:"12px", fontWeight:"bold"}}>
                        SILVER
                    </Typography>

                    <Box
                    component="img"
                    src={'/images/app/badge/silver.png'}
                    sx={{width:'20px', height:'20px'}}
                    ></Box>

                    <Typography component="span" sx={{fontSize:"12px"}}>
                        and then &nbsp;
                    </Typography>

                    <Typography component="span" sx={{fontSize:"12px", fontWeight:"bold"}}>
                        BRONZE
                    </Typography>
                    <Box
                    component="img"
                    src={'/images/app/badge/bronze.png'}
                    sx={{width:'20px', height:'20px'}}
                    ></Box>                
                </Typography>
            </Stack>
        </Grid>
    );
};

export default MiniFooter;


