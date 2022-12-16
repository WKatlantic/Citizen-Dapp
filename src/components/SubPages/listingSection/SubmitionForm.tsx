import React, { useCallback } from "react";
import { useContext, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { makeStyles } from "@mui/styles";
import { styled } from '@mui/material/styles';
import { Container, Grid, Stack, Typography, Button, Box, Paper, Table, Divider,  MenuItem, Select} from '@mui/material';
import { GlobalContext, Web3ModalContext } from '../../../contexts';
import { useYam } from '../../../hooks';
import ConnectButton from '../ConnectButton';
import LoginUser from '../LoginUser';
import Image from 'next/image';
import axios from 'axios';
import { API } from '../../../config';


const DISCORD = "/images/icons/Discord1.png";

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
    marginTop:'20px',
    padding:'30px',
    paddingLeft:'40px',
    lineWidth:'1px',
    borderRadius: '20px',
    background: 'rgba(28, 31, 50, 0.35)',
    height:'100%',
  },

  SubBox1: {
    marginTop:'20px',

    borderRadius: '20px',
    background: 'rgba(28, 31, 50, 0.35)',
    height:'100%',
  },

  SubBox2: {
    
  },

  customBoxStyle1: {
    marginTop:'20px',
    padding:'15px',
    lineWidth:'1px',
    borderRadius: '20px',
    background: 'linear-gradient(to left, #353DFC, #B31DF1)',  
    height:'100%',
  },

  customBoxStyle2: {
    marginTop:'20px',
    padding:'15px',
    lineWidth:'1px',
    borderRadius: '20px',
    background:'#111111',
    height:'100%',
  },

  uploadButton: {
    padding: '5px 30px',
    width:'300px',
    marginBottom: '10px',
    background:'#7F43FF',
    cursor: 'pointer',
    borderRadius: '5px',
    fontSize: '12px',
    textTransform: 'uppercase'
  },

  applyButton : {
    background:'#6419C8',
    width:'150px',
    height:'40px',
    fontSize:'15px',
    borderRadius:'10px',
  },
  submitButton : {
    background:'linear-gradient(to right, #FF43F7,#9E2EF6)',
    width:'150px',
    height:'30px',
    fontSize:'15px',
    borderRadius:'5px',
  },
  customSelectButton : {
    background:'rgba(127, 67, 255, 0.21)',
    width:'120px',
    height:'25px',
    fontSize:'10px',
    fontWeight:'normal',
    marginBottom:'5px',
    cursor: 'pointer',
    borderRadius:'5px',
  },

  typeSelectBox: {
    width:'100px',
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
    background: 'linear-gradient(to right, #9E2EF6,#23D0C6)',
    height:'auto',
    borderRadius:'10px',
    marginTop:'8%',
    width:'100%',
    padding:'30px',
    

  },
  mintButton : {
    background:'linear-gradient(to right, #996096,#9E2EF6)',
    width:'200px',
    fontSize:'13px',

  },

  customInput: {
    width:'120px',
    height:'25px',
    background:'rgba(127, 67, 255, 0.21)',
    borderRadius:'5px',
    color:'white',
    marginBottom:'10px',
    fontColor:'white',
  },
  customInput1: {
    width:'180px',
    height:'25px',
    background:'rgba(127, 67, 255, 0.21)',
    borderRadius:'5px',
    border:'none',
    color:'white',
    marginBottom:'10px',
    fontColor:'white',
  },

  customCheck: {
    width:'15px',
    height:'15px',
    fontSize:'12px',
    backgroundColor:'#AD45FF',
    textAlign:'center',
    border:'none',
    borderRadius:'5px',
    padding:'2px',
    paddingTop:'0px',
    marginTop:'4px',
  },

customInput2: {
  width:'70%',
  height:'25px',
  background:'rgba(127, 67, 255, 0.21)',
  borderRadius:'5px',
  color:'white',
  border:'none',
  marginBottom:'10px',
  fontColor:'white',
},
  
  editButton: {
    height:'18px',
    paddingLeft:'10px',
    paddingRight:'10px',
    fontSize:'10px',
    background: "linear-gradient(93.11deg, rgba(94, 58, 197, 0.65) 12.41%, rgba(158, 46, 247, 0.65) 100%)",
    borderRadius:'5px',
  },

  customInput3: {
    width:'300px',
    height:'80px',
    background:'rgba(127, 67, 255, 0.21)',
    borderRadius:'5px',
    color:'white',
    marginBottom:'10px',
    fontColor:'white',
  },

  selectOption: {
    border: '1px solid none',
    width:'180px',
    // background: 'rgba(54, 38, 101, 0.6)',
    background:'rgba(127, 67, 255, 0.21)',
    "& .MuiSelect-select": {
      backgroundColor: 'transparent',
      fontFamily: 'Montserrat',
      fontWeight: 400,
      color: 'lightgray',
      width:'180px',
      paddingTop:'3px',
      paddingBottom:'3px',
      margin:'0px',
      fontSize:'12px',
    },
    
    "& svg": {
      fill: 'white' 
    }
  },

  menuItemStyle: {
    color:'#AB6FE9',
    fontSize:'12px',
  },

}));

const ListingULA: NextPage = () => {

  const classes = useStyles(); 
  
  const globalContext = useContext(GlobalContext);

  const { account } = useContext(Web3ModalContext);

  const yamClient = useYam();


  const [hrDisableStatus, setHrDisableStatus] = useState<any>(false);


  // const [projectType, setProjectType] = useState<any>("");

  // const [status, setStatus] = useState<any>("");

  // const [blockchain, setBlockchain] = useState<any>("");

  // const [projectName,setProjectName] = useState<any>("");

  // const [symbol,setSymbol] = useState<any>("");

  // const [contractAddress,setContractAddress] = useState<any>("");

  // const [webSite,setWebSite] = useState<any>("");

  // const [extraMsg,setExtraMsg] = useState<any>("");

  const [projectType, setProjectType] = useState<any>("");

  const [status, setStatus] = useState<any>("");

  const [chainType, setChainType] = useState<any>("");
  
  const [projectName,setProjectName] = useState<any>("");

  const [symbol,setSymbol] = useState<any>("");

  const [contractAddress,setContractAddress] = useState<any>("");

  const [webSite,setWebSite] = useState<any>("");


  const [dex, setDex] = useState<any>({}); //array

  const [chart,setChart] = useState<any>({}) //chart

  const [blockchain, setBlockchain] = useState<any>({});//array



  const [taxfrom, setTaxfrom] = useState<any>("");//tax

  const [taxto, setTaxto] = useState<any>("");//tax

  const[utility, setUtility] = useState<any>();

  const[bullish, setBullish] = useState<any>("");


  const [launchDate, setLaunchDate] = useState<any>(new Date(0/0/0));

  const[presaleDate,setPresaleDate] = useState<any>(new Date(0/0/0));

  const[whitelistAvaliable, setWhitelistAvaliable] = useState<any>("");

  const[presaleLink,setPresaleLink] = useState<any>({});

  const[teamReview,setTeamReview] = useState<any>("");

  const[officalEmail, setOfficialEmail] = useState<any>("");

  const[regestereddBusiName, setRegersteredBusiName] = useState<any>("");

  const[website,setWebsite] = useState<any>("");

  const[telegram,setTelegram] = useState<any>("");

  const[twitter,setTwitter] = useState<any>("");

  const[applink,setApplink] = useState<any>("");

  const[date, setDate] = useState<any>("");

  const[approveState, setApproveState] = useState<any>("");

  const[badge, setBadge] = useState<any>("");

  const[feedback, setFeedback] = useState<any>("");



  // useEffect(() => {
  //   const ClaimInit = async () => {
  //     try {
  //       if(yamClient != undefined) {
  //           const hriDisableRes = await yamClient.contracts.contractsMap['REWARD'].methods.getCurrentTime(account).call();
  //           setHrDisableStatus(hriDisableRes);
  //       } 
  //     } catch (error) {
  //         console.log(error);
  //       } 
  //     };
  //     ClaimInit();
  //   }, [yamClient]);

  

 
  const handleSubmit = async () => {
    try {
      const data = {
        account,
        projectType,
        status,
        chainType,
        projectName,
        symbol,
        contractAddress,
        launchDate,

        blockchain,
        dex,
        chart,

        taxfrom,
        taxto,
        utility,
        presaleDate,
        whitelistAvaliable ,
        //presaleLink,
        teamReview,
        officalEmail ,
        regestereddBusiName,
        website,
        telegram,
        twitter,
        applink,
        badge,
        approveState,
        date,
        bullish,
      }
      console.log(data)


      const res = await axios.post(`${API}api/users/create-project`, data)
      const dbindex = res.data.data;


      if(yamClient != undefined) {
          const listtype = await yamClient.contracts.contractsMap['SUBMITION'].methods.isFreeSubmition(account).call();
        if(listtype == true) {
          const nftlisting  = await yamClient.contracts.contractsMap['SUBMITION'].methods.submitWithNFT(account, dbindex).send({from:account, gas: 250000});
        } else {
          const bnblisting = await yamClient.contracts.contractsMap['SUBMITION'].methods.submitWithBNB(account, dbindex).send({from:account, value:30000000000000000});
        }
        console.log(listtype);
      }

    } catch(error) {
      console.log(error);
    }

  }




  
  const handleClaimHourlyReward = async () => {
    if(yamClient != undefined) {
      const hriDisableRes = await yamClient.contracts.contractsMap['REWARD'].methods.getCurrentTime(account).call();
      setHrDisableStatus(hriDisableRes);
      if(hriDisableRes) {
        const hrRewardRes = await yamClient.contracts.contractsMap['REWARD'].methods.claimRewards().send({from:account});
      } else {
        alert("Your Reward is not ready yet!");
      }
    } 
  }

  
  const [age, setAge] = React.useState('');

  return (
  <Grid>
    <Container>
      <Grid lg={12} md={12} xs={12} sx={{display:'flex', justifyContent:'right', mb:"50px",}}>
        <Stack direction="row" spacing={15}>
          <ConnectButton/>
          <LoginUser/>
        </Stack>
      </Grid>
      <Grid container lg={12} md={12} sm={12} xs={12} spacing={2}>
        <Grid lg={8} md={8} sm={12} xs={12} item >
          <Box className={classes.customBoxStyle} sx={{pl:10}}>
            <Grid container>
              <Typography sx={{fontSize:'23px', fontWeight:'bold', color:'#FF43F7', mt:10}}>Features you can enjoy with VIP Access</Typography>
            </Grid>
            <Grid sx={{ml:1, mt:3}}>
              <Stack direction='row' spacing={1} sx={{mb:1}}> 
                <Typography className={classes.customCheck}>✓</Typography>
                <Typography sx={{fontSize:'15px'}}>Submit Projects for listings at</Typography>
                <Typography sx={{color:'#9665FF'}}>Zero cost</Typography>
              </Stack>
              <Stack direction='row' spacing={1} sx={{mb:1}}>
                <Typography className={classes.customCheck}>✓</Typography>
                <Typography sx={{fontSize:'15px'}}>Access to alpha chatroom on Discord</Typography>
              </Stack>
              <Stack direction='row' spacing={1} sx={{mb:1}}>
                <Typography >🔥</Typography>
                <Typography sx={{fontSize:'15px'}}>Earn hourly CITI Rewards</Typography>
              </Stack>
              <Stack direction='row' spacing={1} sx={{mb:1}}>
                <Typography >🔥</Typography>
                <Typography sx={{fontSize:'15px'}}>Earn CITI Revenue from dividend pool</Typography>
              </Stack>
              <Stack direction='row' spacing={1} sx={{mb:8}}>
                <Typography className={classes.customCheck}>✓</Typography>
                <Typography sx={{fontSize:'15px'}}>Receive Tips & Kudos</Typography>
              </Stack>
            </Grid>
          </Box>
        </Grid>
        
        <Grid lg={4} md={4} sm={12} xs={12} item>
          <Box className={classes.SubBox1}>
          <Stack sx={{mb:2, pt:5, pl:5}} direction="row" spacing={1}>
            <Typography sx={{fontSize:'20px', fontWeight:'bold'}}>My Profile</Typography>
            <Typography sx={{fontSize:'12px', color:'#AB6FE9', pt:1}}>| Username</Typography>
          </Stack>
          
          <Box sx={{borderRadius:'20px', p:5}}>
              <Stack spacing={1} sx={{mb:2}}>
                <Typography sx={{fontSize:'14px', mr:5, fontWeight:'bold'}}>scout Wallet Address</Typography>
                <Typography sx={{fontSize:'14px', color:'#FF43F7'}}>0xkjsahbdb1u2357450973000000</Typography>
              </Stack>

              <Stack spacing={1} sx={{mb:2}}>
                <Typography sx={{fontSize:'14px', mr:5, fontWeight:'bold'}}>scout Username</Typography>
                <Stack direction="row"   spacing={1}>
                  <Typography sx={{fontSize:'14px', color:'#FF43F7'}}>Crypto_Pumpkin</Typography>
                  {/* <Button className={classes.editButton}>Edit</Button> */}
                </Stack>
              </Stack>

              <Stack spacing={1} sx={{mb:2}}>
                <Typography sx={{fontSize:'14px', mr:5, fontWeight:'bold'}}>scout Telegram Username</Typography>
                <Stack direction="row" spacing={1}>
                  <Typography sx={{fontSize:'14px', color:'#FF43F7'}}>Crypto_Pumpkin</Typography>
                  {/* <Button className={classes.editButton}>Edit</Button> */}
                </Stack>
              </Stack>

              <Stack spacing={1} sx={{mb:2}}>
                <Typography sx={{fontSize:'14px', mr:5, fontWeight:'bold'}}>scout Twitter Profile Link</Typography>
                <Stack direction="row" spacing={1}>
                  <Typography sx={{fontSize:'14px', color:'#FF43F7'}}>https://twitter.com/Crypto_Pumpkin</Typography>
                  {/* <Button className={classes.editButton}>Edit</Button> */}
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Grid>

        <Grid lg={12} md={12} sm={12} xs={12} item container spacing={2}>

          <Grid lg={8} md={8} sm={12} xs={12} item>
            <Box className={classes.customBoxStyle1} display="flex" justifyContent="center">
              <Stack direction="row" spacing={3} sx={{pt:4}}>
                <Stack direction="row" spacing={3}>
                  <Box><Image alt="discord" src={DISCORD} width={'60px'} height={'60px'}/></Box>
                  <Typography>
                    <Typography sx={{fontSize:"20px", fontWeight:"bold"}}>Alpha Discord Channel</Typography>
                    <Typography sx={{fontSize:"20px", fontWeight:"bold"}}>exclusively for NFT Holders</Typography>
                  </Typography>
                </Stack>
                <Button sx={{mt:6, width:'120px', borderRadius:'15px'}}>connect</Button>
              </Stack>
            </Box>
          </Grid>

          <Grid lg={4} md={4} xs={12} item>
            <Box className={classes.customBoxStyle1}>
                <Grid lg={12}>
                  <Typography sx={{fontSize:'20px', fontWeight:'bold', mb:2}}>Your balance</Typography>
                </Grid>
                
                <Stack direction="row" justifyContent="space-between">
                  <Box>
                    <Typography sx={{mb:1}}>Total CITI Balance</Typography>
                    <Typography>USD Value</Typography>
                  </Box>
                  <Box>
                    <Typography sx={{mb:1, fontSize:'18px', fontWeight:'bold'}}>$ 120</Typography>
                    <Typography sx={{fontSize:'18px', fontWeight:'bold'}}>$ 80</Typography>
                  </Box>
                </Stack>
              </Box>
          </Grid>
        </Grid>

        <Grid lg={12} md={12} sm={12} xs={12} item container spacing={2}>
        <Grid lg={8} md={8} sm={12} xs={12} item>

          <Grid lg={12} md={12} sm={12} xs={12} item>
            <Box className={classes.SubBox1}>
              <Stack direction="row" sx={{mb:2, pt:3, ml:3}}>
                <Typography sx={{fontSize:'20px', fontWeight:'bold'}}>Collect your hourly Rewards&nbsp;</Typography>
                <Typography sx={{fontSize:'12px', color:'#AB6FE9', pt:1}}>| Username</Typography>
              </Stack>
              <Grid lg={12} md={12} sm={12} xs={12} container sx={{p:3, background: 'rgba(27, 29, 51, 0.6)', borderRadius:'20px'}}>
              <Grid lg={4} md={4} sm={4} xs={4} item>
                    <Typography sx={{fontSize:'12px'}}>Rewards Collect</Typography>
                    <Stack direction="row" spacing={1}>
                      <Typography sx={{fontSize:'18px', fontWeight:'bold'}}>NA CITI</Typography>
                      <Typography sx={{fontSize:'18px', color:'#53CBFF', fontWeight:'bold'}}>($NA)</Typography>
                    </Stack>
                </Grid>

              <Grid lg={4} md={4} sm={4} xs={4} item>
                    <Typography sx={{fontSize:'12px'}}>Rewards Pending</Typography>
                    <Stack direction="row" spacing={1}>
                      <Typography sx={{fontSize:'18px', fontWeight:'bold'}}>NA CITI</Typography>
                      <Typography sx={{fontSize:'18px', color:'#53CBFF', fontWeight:'bold'}}>($NA)</Typography>
                    </Stack>
                </Grid>

              <Grid lg={4} md={4} sm={4} xs={4} item>
                  <Button onClick={() => handleClaimHourlyReward()} >Claim Reward</Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid lg={12} md={12} sm={12} xs={12} item>
            <Box className={classes.SubBox1}>
              <Typography sx={{fontSize:'20px', fontWeight:'bold', mb:2, pt:3, ml:3}}>Collect Rewards for Approved Listings</Typography>
              <Grid lg={12} md={12} sm={12} xs={12} container sx={{p:3, background: 'rgba(27, 29, 51, 0.6)', borderRadius:'20px'}}>
                <Grid lg={4} md={4} sm={4} xs={4} item>
                    <Typography sx={{fontSize:'12px'}}>Rewards Collected</Typography>
                    <Stack direction="row" spacing={1}>
                      <Typography sx={{fontSize:'18px', fontWeight:'bold'}}>NA CITI</Typography>
                      <Typography sx={{fontSize:'18px', color:'#53CBFF', fontWeight:'bold'}}>($NA)</Typography>
                    </Stack>
                </Grid>

                <Grid lg={4} md={4} sm={4} xs={4} item>
                    <Typography sx={{fontSize:'12px'}}>Rewards Pending</Typography>
                    <Stack direction="row" spacing={1}>
                      <Typography sx={{fontSize:'18px', fontWeight:'bold'}}>NA CITI</Typography>
                      <Typography sx={{fontSize:'18px', color:'#53CBFF', fontWeight:'bold'}}>($NA)</Typography>
                    </Stack>
                    hahahaha
                </Grid>

                <Grid lg={4} md={4} sm={4} xs={4} item>
                  <Button>Claim Reward</Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid lg={12} md={12} sm={12} xs={12} item>
            <Box className={classes.SubBox1}>
              <Typography sx={{fontSize:'20px', fontWeight:'bold', mb:2, pt:3, ml:3}}>Collect your CITI Revenue</Typography>
              <Grid lg={12} md={12} sm={12} xs={12} container sx={{p:3, background: 'rgba(27, 29, 51, 0.6)', borderRadius:'20px'}}>
                <Grid lg={4} md={4} sm={4} xs={4} item>
                    <Typography sx={{fontSize:'12px'}}>Rewards Collected</Typography>
                    <Stack direction="row" spacing={1}>
                      <Typography sx={{fontSize:'18px', fontWeight:'bold'}}>NA CITI</Typography>
                      <Typography sx={{fontSize:'18px', color:'#53CBFF', fontWeight:'bold'}}>($NA)</Typography>
                    </Stack>
                </Grid>

                <Grid lg={4} md={4} sm={4} xs={4} item>
                    <Typography sx={{fontSize:'12px'}}>Rewards Pending</Typography>
                    <Stack direction="row" spacing={1}>
                      <Typography sx={{fontSize:'18px', fontWeight:'bold'}}>NA CITI</Typography>
                      <Typography sx={{fontSize:'18px', color:'#53CBFF', fontWeight:'bold'}}>($NA)</Typography>
                    </Stack>
                </Grid>

                <Grid lg={4} md={4} sm={4} xs={4} item>
                  <Button>Claim Reward</Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>

        </Grid>

        <Grid lg={4} md={4} sm={12} xs={12} item>
          <Grid lg={12} md={12} sm={12} xs={12} item  sx={{height:'97%'}}>
            <Box className={classes.customBoxStyle}>
              <Typography sx={{fontSize:'20px', fontWeight:'bold', mb:5}}>Your Listing and Submissions</Typography>
              
              <Grid lg={12} md={12} sm={12} xs={12} container sx={{mb:10}}>
                <Grid lg={12} md={12} sm={12} xs={12} item>
                  <Typography sx={{fontSize:'14px'}}>Rewards Collected</Typography>
                  <Typography sx={{fontSize:'18px', fontWeight:'bold', color:'#54FEA2', mb:2}}>NA</Typography>
                </Grid>
                <Grid lg={12} md={12} sm={12} xs={12} item>
                  <Typography sx={{fontSize:'14px'}}>Rewards Collected</Typography>
                  <Typography sx={{fontSize:'18px', fontWeight:'bold', color:'#54FEA2', mb:2}}>Pumpkin_inu</Typography>
                </Grid>
                <Grid lg={12} md={12} sm={12} xs={12} item>
                  <Typography sx={{fontSize:'14px'}}>Rewards Collected</Typography>
                  <Typography sx={{fontSize:'18px', fontWeight:'bold', color:'#54FEA2', mb:2}}>PumpkinChain</Typography>
                </Grid>
                <Grid lg={12} md={12} sm={12} xs={12} item>
                  <Typography sx={{fontSize:'14px', color:'#FF43F7'}}>Rewards Collected</Typography>
                  <Typography sx={{fontSize:'18px', fontWeight:'bold', color:'#FF43F7'}}>NA</Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        </Grid>
      



 
 
 
 
 

 
 
        <Grid lg={12} md={12} sm={12} xs={12} item>
          <Box className={classes.customBoxStyle}>
            <Stack sx={{diaplay:'flex', flexDirection:'row'}}>
              <Grid container>
                <Typography sx={{fontSize:'20px', fontWeight:'bold', mr:2}}>Submit Projects</Typography>
                <Typography sx={{fontSize:'20px'}}>Multi-chain Supported</Typography>
              </Grid>
              <Button className={classes.applyButton}>Generate</Button>
            </Stack>

            <Grid container>
              <Grid lg={5} md={5} sm={12} xs={12} sx={{p:3,pr:6}}>
                <Typography sx={{fontSize:'15px',mb:3}}>
                  Kindly fill up the form according to your request. If your request(s) are not accommodated by this form, please email to support@citiWorld.io
                </Typography>

                <Grid md={12}>
                  <Box sx={{background: 'rgba(50, 33, 91, 0.3)', borderRadius: '8px', padding:'8px'}}>
                    <Stack direction="row" spacing={3}>
                      <Typography sx={{color:'#FF43F7', fontWeight:'bold'}}>Paid Sponsors</Typography>
                      <Typography sx={{color:'#FF43F7', fontWeight:'bold'}}>Cost NA BNB</Typography>
                    </Stack>
                    
                    <Typography sx={{fontSize:'14px', mb:2}}>
                      (Non NFT Holders)
                    </Typography>

                      <Typography sx={{fontSize:'14px'}}>
                      On Approval, your submitted project will be made live with appropriate badge.
                      </Typography>
                      <Typography sx={{fontSize:'14px'}}>
                      NA  BNB Goes to CITI Treasury 
                      </Typography>
                      <Typography sx={{fontSize:'14px'}}>
                      NA  BNB for CITI Buyback & Revenue Pool
                      </Typography>
                      <Typography sx={{fontSize:'14px', mb:2}}>
                      NA  BNB to Vetter
                      </Typography>
                      <Typography sx={{fontSize:'14px', mb:2}}>
                      Upon rejection, NA BNB will be refunded.
                      </Typography>

                    <Stack direction="row" spacing={3}>
                      <Typography sx={{color:'#FF43F7', fontWeight:'bold'}}>VIP Sponsors</Typography>
                      <Typography sx={{color:'#FF43F7', fontWeight:'bold'}}>NA BNB</Typography>
                    </Stack>

                    <Typography sx={{fontSize:'14px', mb:2}}>
                      (Non NFT Holders)
                    </Typography>

                    <Typography sx={{fontSize:'14px'}}>
                        On Approval, your submitted project will be made live with appropriate badge.
                    </Typography >
                    <Typography sx={{fontSize:'14px', mb:2}}>
                        NA BNB to Vetter
                    </Typography>

                    <Typography sx={{color:'#54FEA2', fontSize:'14px'}}>
                        Scouts can earn upto $100 CITI upon approval.
                    </Typography>

                  </Box>
                </Grid>
              </Grid>


              <Grid lg={7} md={7} sm={12} xs={12}>
                <Grid lg={12} md={12} sm={12} xs={12} sx={{background: 'rgba(18, 9, 38, 0.5)', borderRadius: '8px', p:3, pr:6, mt:2}}>
                  <Typography sx={{color:'#FF43F7', fontWeight:'bold'}}>Fill Project Info</Typography>
                  <Divider sx={{width:'100%', background:'gray', mt:2}}></Divider>
                  <Typography sx={{fontSize:'15px', mt:2}}>1. Project Type</Typography>
                  <Grid container sx={{mt:1,pl:2,mb:2}}>
                    <Button className={classes.customSelectButton} sx={{mr:2}} onClick={() => setProjectType("Token")}>token</Button>
                    <Button className={classes.customSelectButton} onClick={() => setProjectType("NFT")}>NFT</Button>
                  </Grid>

                  <Typography sx={{fontSize:'15px'}}>2. Status</Typography>
                  <Stack direction="row" spacing={1} sx={{mt:1,pl:2, mb:2}}>
                    <Button className={classes.customSelectButton} onClick={() => setStatus("Presale")}>Presale</Button>
                    <Button className={classes.customSelectButton} onClick={() => setStatus("Launching")}>Launching</Button>
                    <Button className={classes.customSelectButton} onClick={() => setStatus("Launched")}>Launched</Button>
                  </Stack>

                  <Typography sx={{fontSize:'15px'}}>3. Project Name</Typography>
                  <Grid container sx={{mt:1,pl:2,mb:2}}>
                    <input type="text" className={classes.customInput1} onChange={(e) => setProjectName(e.target.value)}/>
                  </Grid>

                  <Typography sx={{fontSize:'15px'}}>4. Symbol</Typography>
                  <Grid container sx={{mt:1,pl:2,mb:2}}>
                    <input type="text" className={classes.customInput1} onChange={(e) => setSymbol(e.target.value)}/>
                  </Grid>
                  
                  <Typography sx={{fontSize:'15px'}}>{"5. Blockchain"}</Typography>
                  <Grid container sx={{mt:1,pl:2,mb:2}}>
                    <Select defaultValue="1" className={classes.selectOption} onChange={(e) => setChainType(e.target.value)}>
                      <MenuItem className={classes.menuItemStyle} value={'BSC'}>Binance Smart Chain</MenuItem>
                      <MenuItem className={classes.menuItemStyle} value={'Ethereum'}>Ethereum</MenuItem>
                      <MenuItem className={classes.menuItemStyle} value={'Avalanche'}>Avalanche</MenuItem>
                      <MenuItem className={classes.menuItemStyle} value={'Cardano'}>Cardano</MenuItem>
                      <MenuItem className={classes.menuItemStyle} value={'Chainalysis'}>Chainalysis KYT</MenuItem>
                      <MenuItem className={classes.menuItemStyle} value={'HyperledgerFabic'}>Hyperledger Fabic</MenuItem>
                      <MenuItem className={classes.menuItemStyle} value={'HyperledgerSawtooth'}>Hyperledger Sawtooth</MenuItem>
                      <MenuItem className={classes.menuItemStyle} value={'IBM'}>IBM Blockchain</MenuItem>
                      <MenuItem className={classes.menuItemStyle} value={'Polkadot'}>Polkadot</MenuItem>
                      <MenuItem className={classes.menuItemStyle} value={'Ripple'}>Ripple</MenuItem>
                      <MenuItem className={classes.menuItemStyle} value={'Solana'}>Solana</MenuItem>
                      <MenuItem className={classes.menuItemStyle} value={'TronDao'}>TronDao</MenuItem>
                      <MenuItem className={classes.menuItemStyle} value={'XDC'}>XDC Network</MenuItem>
                    </Select>
                  </Grid>

                  <Typography sx={{fontSize:'15px'}}>6. Contract Address</Typography>
                  <Grid container sx={{mt:1,pl:2,mb:2}}>
                    <input type="text" className={classes.customInput2} onChange={(e) => setContractAddress(e.target.value)}/>
                  </Grid>

                  <Typography sx={{fontSize:'15px'}}>7. WebSite</Typography>
                  <Grid container sx={{mt:1,pl:2,mb:2}}>
                  <input type="text" className={classes.customInput2} onChange={(e) => setWebSite(e.target.value)}/>
                  </Grid>
            
                  <Stack direction="row" spacing={1} sx={{mt:1, mb:1}}>
                    <Typography sx={{fontSize:'15px'}}>8. </Typography>
                    <Typography sx={{fontSize:'15px', fontWeight:'Bold'}}>What makes this project BULLISH?</Typography>
                  </Stack>
                  <Grid container sx={{mt:1,pl:2,mb:2}}>
                    <textarea className={classes.customInput3} style={{width:'100%', border:'none',}} onChange={(e) => setBullish(e.target.value)} rows={10} cols={30}></textarea>
                  </Grid>
                </Grid>
                <Button className={classes.submitButton} sx={{ml:2, mb:2, mt:3}} onClick={() => handleSubmit()}>Submit</Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>



      </Grid>
    </Container>
  </Grid>
  );
};

export default ListingULA;

