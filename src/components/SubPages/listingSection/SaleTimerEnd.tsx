import React, { useCallback, useMemo } from "react";
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import type { NextPage } from 'next';
import { makeStyles } from "@mui/styles";
import { styled } from '@mui/material/styles';
import { Container, Grid, Stack, Typography} from '@mui/material';
import { GlobalContext, Web3ModalContext } from '../../../contexts';
import { API } from '../../../config';

const useStyles = makeStyles(() => ({
    fontTitle:{
        fontSize:'22px',
        fontWeight:'bold',
        color:'#FF43F7',
    },
}));

interface Props {
    finishTimes?: number;
    handleEnd: (val:any)=>void;
  }
  const SaleTimerEnd: NextPage<Props> = (props:Props) => {
    const classes = useStyles(); 
    const finishTimes = useMemo(() => props.finishTimes, [props]);

    const [timelimit,setTimelimit] = useState<number>(0);
    const [mdays,setMdays] = useState(0); 
    const [mhours,setMhours] = useState(0);
    const [mminutes,setMminutes] = useState(0);
    const [mseconds,setMseconds] = useState(0);
    const [deadTimer, setDeadTimer] = useState<boolean>(false);
    
    // console.log("This whole page is rerendered.");
    useEffect(() => {   
      const timeCalc = async () => {
        try {
            const tempDate = await axios.post(`${API}api/users/get-date`);
            setTimelimit(Number(finishTimes) - new Date(tempDate.data.date).getTime()/1000);
            setInterval(()=>{
                setTimelimit(val => val - 1);
            }, 1000);
        } catch (error) {
          console.log(error);
        }
      };
      if(finishTimes) timeCalc();
    }, [finishTimes]);  
    

    useEffect(() => {   
        const timerStatus = async () => {
          try {
              if(timelimit < 0) {
                  setDeadTimer(true);
                  props.handleEnd(3);
                } else {
                  setDeadTimer(false);
              }
          } catch (error) {
            console.log(error);
          }
        };
        timerStatus();
      }, [timelimit,finishTimes]);  


  
    const toTwoDigit = (val:any) => {
      if (String(val).length === 1)
        return "0" + val;
      return val;
    }
  
      return (
          <>
          {
       !deadTimer ? (
            <Grid container>
                <Typography className={classes.fontTitle}>
                    Ends in&nbsp;&nbsp;&nbsp;
                </Typography>

                <Typography className={classes.fontTitle}>
                    {toTwoDigit(Math.floor(timelimit/(3600*24)))} :&nbsp;
                </Typography>

                <Typography className={classes.fontTitle}>
                    {toTwoDigit(Math.floor((timelimit%(3600*24))/3600))} :&nbsp;
                </Typography>

                <Typography className={classes.fontTitle}>
                    {toTwoDigit(Math.floor((timelimit%3600)/60))} :&nbsp;
                </Typography>

                <Typography className={classes.fontTitle}>
                    {toTwoDigit(Math.floor(timelimit%60))}
                </Typography>
            </Grid>
          ) : (
            <Grid container>
                <Typography className={classes.fontTitle}>
                    Ended &nbsp;&nbsp;&nbsp;
                </Typography>

                <Typography className={classes.fontTitle}>
                    00 :&nbsp;
                </Typography>

                <Typography className={classes.fontTitle}>
                    00 :&nbsp;
                </Typography>

                <Typography className={classes.fontTitle}>
                    00 :&nbsp;
                </Typography>

                <Typography className={classes.fontTitle}>
                    00
                </Typography>
            </Grid>
          )
          }
          </>
      );
  };
  
  export default SaleTimerEnd;
  
  
  