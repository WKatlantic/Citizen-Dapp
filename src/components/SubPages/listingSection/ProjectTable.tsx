
import { useEffect, useState, useContext } from 'react';
import type { NextPage } from 'next';
import { makeStyles } from "@mui/styles";
import { styled } from '@mui/material/styles';
import { Container, Grid, Typography, Box , InputLabel, Button, MenuItem, Select, Stack, Rating, Divider} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import Image from 'next/image';
import axios from 'axios';
import MiniFooter from './MiniFooter';
import PresaleT from './table/PresaleT';
import LaunchingT from './table/LaunchingT';
import LaunchedT from './table/LaunchedT';
// import ConnectButton from '../ConnectButton';
// import LoginUser from '../LoginUser';
// import { useYam } from '../../../hooks'
import { Web3Context } from '../../../context/Web3';
import useCitiToken from '../../../store/web3/useCitiToken'
import { typography } from '@mui/system';

const CITI = "/images/citizen/whiteciti.png";
const CHAT = "/images/utils/chat.png";

const BADGE1 = "/images/citizen/gold-badge.png";
const BADGE2 = "/images/citizen/silver.png";
const BADGE3 = "/images/citizen/bronze.png";

const TWITTERP = "/images/icons/Twitter.png";
const TELEGRAMP = "/images/icons/Telegram.png";
const WORLDP = "/images/icons/Web.png";

const BSC = "/images/icons/chain/bsc.png";

const useStyles = makeStyles(() => ({

  detialRowStyle:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
  },

  typeSelectBox: {
    background:'none',
    border:'none',
    outline:'none',
    height:'30px',
    marginBottom:'4px',
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    fontSize:'10px',
    borderRadius:'0px',
    boxShadow:'none',
  },

  bannerBox: {
    backgroundImage: 'url(images/app/gifbanner.gif)',
    backgroundSize:'100% 100%',
    backgroundRepeat:'no-repeat',
    borderRadius:"10px",
    marginTop:'10px',
  },
}));

interface Props {
  userRole?: number;
}

const ProjectTable: NextPage<Props> = (props:Props) => {
  const classes = useStyles(); 
  const {userRole} = props;
  const [tabStatus,setTabStatus] = useState<any>(0);

  // const { account } = useContext(Web3ModalContext);
  // const yamClient = useYam();
  const {balanceOf} = useCitiToken()
  const { isConnected, account, web3 } = useContext(Web3Context)
  
  const [citiAmount, setCitiAmount] = useState<any>(5);

  useEffect(() => {
    const validate = async () => {
      if(isConnected && account !== null && web3 !== null) {
          setCitiAmount(Number(await balanceOf(account)));
      }
    }
    validate()
  }, [balanceOf, account, isConnected, web3])
  
  const handleTabStatus = (id:any) =>  {
    setTabStatus(id);
  }

  return (
    <Grid>
      <Grid container>
      <Grid container spacing={3}>
      <Grid item container lg={12} md={12} sm={12} xs={12} sx={{mt: 8}}>
          <Grid item lg={8} md={0} xs={0}></Grid>
          <Grid item lg={4} md={12} xs={12} sx={{width:'100%', mb:2 , justifyContent:'right'}}>
            {/* <Stack direction="row" justifyContent="space-between">
              <ConnectButton/>
              <LoginUser/>
            </Stack> */}

            <Grid lg={12} md={12} xs={12} sx={{display:'flex', justifyContent:'left', mt:2}}>
                {
                  (citiAmount >= 10000) ? (
                    <Grid container sx={{direction:'row',justifyContent:"space-between"}}>
                      <Stack direction="row">
                        <Typography sx={{fontSize:'16px',}}>Access Type | </Typography>
                        <Typography sx={{fontSize:'16px',fontWeight:'bold'}}>&nbsp;Unlimited Access</Typography>
                      </Stack>
                    </Grid>
                  ) : (
                    <Grid container>
                      <Stack direction="row">
                        <Typography sx={{fontSize:'16px',}}>AccessType | </Typography>
                        <Typography sx={{fontSize:'16px',fontWeight:'bold'}}>&nbsp;Sneak Peek</Typography>
                      </Stack>
                    </Grid>
                  )
                }
            </Grid>
          </Grid> 
      </Grid>
      </Grid>


        <Box  className={classes.detialRowStyle} sx={{width:'100%'}}>
          <Grid item container lg={12} className={classes.detialRowStyle} sx={{mt:0, width:'100%'}} spacing={3}>
          <Grid lg={8} sm={12} xs={12} item >
            <Box  sx={{ background: 'rgba(35, 22, 67, 0.3)', borderRadius:'15px', padding:'15px',}}>
              <Grid lg={12} md={12} xs={12}>
                <Box>
                  <Typography sx={{mb:2}}>What are you looking for?</Typography>
                </Box>
                <Box sx={{display:'flex',overflow:'auto'}}>
                  <Box>
                    <Stack direction="row" sx={{ minWidth:'460px'}}>
                        <Button className={classes.typeSelectBox} sx={{ width: {lg:'130px', md:'120px', sm:'110px', xs:'110px'} }} onClick={() => handleTabStatus(0)}>Presales🔥</Button>
                        <Button className={classes.typeSelectBox} sx={{ width: {lg:'130px', md:'120px', sm:'110px', xs:'110px'} }} onClick={() => handleTabStatus(1)}>launching🔥</Button>
                        <Button className={classes.typeSelectBox} onClick={() => handleTabStatus(2)}>Launched</Button>
                        <Button className={classes.typeSelectBox}>NFTs</Button>
                        <Button className={classes.typeSelectBox}>Influencers</Button>
                    </Stack>
                  </Box>
                </Box>
              </Grid>
            </Box>
            {/* <Box sx={{background:'rgba(66, 38, 128, 0.58)' , mt:1, borderRadius:'15px', padding :'20px', pb:'100px'}}>
              <Grid lg={12} md={12} xs={12}>
                  <Typography sx={{fontSize:'20px', fontWeight:'bold', pl:'30px'}}>Featured Projects will show here!</Typography>
              </Grid>
            </Box> */}
            <Box className={classes.bannerBox} sx={{height:{lg:'150px',md:'130px', sm:'100px', xs:'80px' } }}>
              <Grid lg={12} md={12} xs={12}>
                  {/* <Typography sx={{fontSize:'20px', fontWeight:'bold', pl:'30px'}}>Featured Projects will show here!</Typography> */}
              </Grid>
            </Box>
          </Grid>



          <Grid lg={4} md={6} sm={12} xs={12} item sx={{}}>
            <Box sx={{background:'linear-gradient(100.53deg, rgba(158, 46, 247, 0.6) 7.76%, rgba(255, 67, 247, 0.6) 94.53%)', borderRadius:'15px'}}>
              <Box sx={{pl:'20px', pt:'30px',pb:'30px'}}>
                <Typography sx={{fontSize:'18px', fontWeight:'bold', pl:'30px'}}>Upcoming CITI Event 🎉</Typography>
              </Box>
              <Box sx={{background:'linear-gradient(93.14deg, rgba(43, 8, 117, 0.4) 11.28%, rgba(95, 7, 91, 0.4) 94.15%)', borderRadius:'15px', padding:'20px', pb:13}}>
                <Typography sx={{fontSize:'15px', pl:'30px'}}>CITI presale in October! 🎉</Typography>
                <Typography sx={{fontSize:'15px', pl:'30px'}}>CITI NFT Air drop in October!  🎉</Typography>
              </Box>
            </Box>
          </Grid>
          </Grid> 
        </Box>
      </Grid>
      {
        (tabStatus==0) ? (<PresaleT userRole={userRole} />):(
          (tabStatus==1) ? ( <LaunchingT userRole={userRole}/>) :(
            (tabStatus==2) ? (<LaunchedT userRole={userRole}/>) : (
              <></>
            )
          )
        )
      }
      <MiniFooter/>
  </Grid>
  );
};

export default ProjectTable;


