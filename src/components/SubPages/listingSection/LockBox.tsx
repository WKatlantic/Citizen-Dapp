import React, { useCallback } from "react";
import type { NextPage } from 'next';
import { makeStyles } from "@mui/styles";
import { styled } from '@mui/material/styles';
import { Container, Grid, Stack, Typography, Button, Box, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Divider, Select, MenuItem , ListItem, FormControl, InputLabel} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Image from 'next/image';
import axios from 'axios';

const CITI = "/images/citizen/whiteciti.png";

const useStyles = makeStyles(() => ({
  centerRowStyle:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
  },
  detialRowStyle:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
  },
  customBoxStyle: {
    marginTop:'2%',
    padding:'20px',
    lineWidth:'1px',
    borderRadius: '10px',

    background:'#231643',
    boxShadow: '0px 0px 7px 8px rgba(0, 0, 0, 0.2)',
  },
  typeSelectBox: {
    width:'120px',
    borderRadius:'3px',
    background:'#231643',
    height:'30px',
    padding:'3px',
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    fontSize:'14px',

  },
  lockedBoxStyle : {
    background: 'rgba(44, 47, 71, 0.35)',
    height:'auto',
    borderRadius:'10px',
    marginTop:'8%',
    width:'100%',
    padding:'10px',
    paddingTop:'25px',
    paddingdown:'25px',
    boxShadow: '0px 0px 7px 8px rgba(0, 0, 0, 0.2)',

  },
  mintButton : {
    background:'linear-gradient(to right, #996096,#9E2EF6)',
    width:'150px',
    fontSize:'13px',
    height:'25px',
    borderRadius:'5px',

  },
  selectOption: {
    "& .MuiSelect-select": {
      backgroundColor: 'transparent',
      fontFamily: 'Montserrat',
      fontWeight: 400,
      color: 'white',
      width:'60px',
      fontSize:'15x',
    },
    "& svg": {
      fill: 'white'
    }
  },

  customCardView: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingLeft:'10px',
    paddingRight:'10px',
  },

  cardHeader: {
    color: 'white',
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginBottom:'10px',
  },

}));


const LockBox: NextPage = () => {
  const classes = useStyles(); 
    return (
        <Grid container className={classes.lockedBoxStyle}>
            <Grid item xs={12} className={classes.centerRowStyle}>
                <Box 
                component="img"
                src={'images/icons/Vector.png'}
                sx={{
                    // width: {lg:'20px', md:'15px', sm:'0px', xs:'0px'},
                    width:'15px',
                    height:'20px',
                    mr:1,
                }}
                ></Box>
                <Typography sx={{fontSize: {lg:'18px', sm:'12px', xs:'12px'}, fontWeight:'bold', flexDirection:'row', alignItems:'center'}}>UNLOCK ALL FEATURES TODAY</Typography>
            </Grid>

            <Grid item container xs={12} md={12} lg={12} sx={{pt:3,pl:{md:'15%', xs:'0%' },pr:{md:'15%', xs:'0%' }}}>
                <Grid lg={4} md={4} sm={6} xs={6} item className={classes.centerRowStyle} sx={{mb:2}}>
                    <Typography sx={{fontSize: {lg:'15px', xs:'12px'}}}>Get 10,000 CITI</Typography>
                </Grid>
                <Grid lg={4} md={4} sm={6} xs={6} item className={classes.centerRowStyle} >
                    <Typography sx={{fontSize: {lg:'15px', xs:'12px'}}}> Unlimited Acccess</Typography>
                </Grid>
                <Grid lg={4} md={4} sm={12} xs={12} item className={classes.centerRowStyle} sx={{mb:2}}>
                    <Button href="" className={classes.mintButton}>BUY CITI HERE</Button>
                </Grid>
            </Grid>

            <Grid item container xs={12} md={12} lg={12} sx={{pt:3,pl:{md:'15%', xs:'0%' },pr:{md:'15%', xs:'0%' }}}>
                <Grid lg={4} md={4} sm={6} xs={6} item className={classes.centerRowStyle} sx={{mb:2}}>
                    <Typography sx={{fontSize: {lg:'15px', xs:'12px'}}}>Get 1 Citizens NFT</Typography>
                </Grid>
                <Grid lg={4} md={4} sm={6} xs={6} item className={classes.centerRowStyle} sx={{mb:2}}>
                    <Typography sx={{fontSize: {lg:'15px', xs:'12px'}}}>Unlimited VIP Access</Typography>
                </Grid>
                <Grid lg={4} md={4} sm={12} xs={12} item className={classes.centerRowStyle} sx={{mb:2}}>
                    <Button href="" className={classes.mintButton}>BUY CITI HERE</Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default LockBox;
