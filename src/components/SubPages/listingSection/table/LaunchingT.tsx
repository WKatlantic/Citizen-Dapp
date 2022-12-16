import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { makeStyles } from "@mui/styles";
import { styled } from '@mui/material/styles';
import { Container, Grid, Typography, Box , InputLabel, Button, MenuItem, Select, Stack, Rating, Divider} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Image from 'next/image';
import axios from 'axios';
import { BASE_URL } from '../../../../config/constants'
import MiniFooter from './../MiniFooter';

const CITI = "/images/citizen/whiteciti.png";
const CHAT = "/images/utils/chat.png";

const BADGE1 = "/images/citizen/gold-badge.png";
const BADGE2 = "/images/citizen/silver.png";
const BADGE3 = "/images/citizen/bronze.png";

const POOCOIN = "/images/icons/Poocoin-icon.png";
const DEXTOOLS = "/images/icons/Dextools-icon.png";
const DEXSCREENER = "/images/icons/Dexscreener.png";

const TWITTERP = "/images/icons/Twitter.png";
const TELEGRAMP = "/images/icons/Telegram.png";
const WORLDP = "/images/icons/Web.png";

const BSC = "/images/icons/chain/bsc.png";

const useStyles = makeStyles(() => ({

  customBoxStyle: {
    marginTop:'3px',
    padding:'10px',
    lineWidth:'1px',
    borderRadius: '10px',
    width:'100%',
    minWidth:'1100px',
    display:'flex',
    // flexDirection:'row',
    // justifyContent:'space-between',
  },

  tableheader: {
    paddingTop:'10px',
    paddingBottom:'10px',
    paddingLeft:'0px',
    paddingRight:'0px',
    lineWidth:'1px',
    width:'100%',
    minWidth:'1100px',
    display:'flex',
    flexDirection:'row',
    background: 'rgba(44, 47, 71, 0.3)', 
    borderRadius:'20px',
  },

  customCardView: {
    textAlign:'left',
    width:'120px',
    minWidth:'120px',
  },

  searchStyle: {
    borderColor:'none',
    height:'25px',
    width:'200px',
    borderRadius:'7px',
    paddingLeft:'15px',
    fontWeight:'bold',
    outline:'none',
    border:'none',
    marginTop:'1px',
    marginLeft:'150px',
  },


  customIconsView: {
    textAlign:'left',
    width:'130px',
    minWidth:'130px',
  },

  centerRowStyle:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
  },

  cardHeader: {
    color: 'white',
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginBottom:'10px',
  },

  colCenter: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },

  selectOption: {
    border: '1px solid none',
    width:'110px',
    background: 'rgba(54, 38, 101, 0.6)',
    "& .MuiSelect-select": {
      backgroundColor: 'transparent',
      fontFamily: 'Montserrat',
      fontWeight: 400,
      color: 'lightgray',
      width:'100px',
      paddingTop:'3px',
      paddingBottom:'3px',
      margin:'0px',
      fontSize:'9px',
    },
    
    "& svg": {
      fill: 'white' 
    }
  },

  menuItemStyle: {
    color:'#AB6FE9',
    fontSize:'10px',
  },

  ratingStar: {
    '& span': {
      color: 'white'
    }
  },

}));

interface Props {
  userRole?: number;
}
  
  const LaunchingT: NextPage<Props> = (props:Props) => {
      
    const classes = useStyles(); 
    const {userRole} = props;
  
    const [presaleStatus, setPresaleStatus] = useState<any>("completed");
    const [launchStatus, setLaunchStatus] = useState<any>("completed");
  
    const filterLaunching = () => {
      if(launchStatus == "upcoming") {
        setLaunchStatus("completed");
      } else {
        setPresaleStatus("upcoming");
      }
    }
  
    const filterPresale = () =>  {
      if(presaleStatus == "upcoming") {
        setPresaleStatus("completed");
      } else {
        setPresaleStatus("upcoming");
      }
    }
  
    const [loading, setLoading] = useState(true);
  
    const [age, setAge] = useState('');
    const [listingData, setListingData] = useState([]);
  
    const getProjects = async() => {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}api/users/get-projects`);
      setListingData(res.data)
      setLoading(false);
    } 
    useEffect(() => {
      console.log("listingData")
      console.log(listingData)
      console.log(userRole);
    },[listingData])
  
    useEffect(() => {
      getProjects();
    },[])

    return (
    <>
        <Box sx={{direction:"row", display:"flex", justifyContent:"space-between", overflowY:'initial', overflowX: 'auto'}}>
          <Stack direction="row" spacing={1} sx={{mt:5}}>
            <Box>
              
              <Select defaultValue="1" className={classes.selectOption}>
              {/* <Typography sx={{fontSize:'15px'}}>3. Presale Platform & Link</Typography> */}
                <MenuItem value="1" className={classes.menuItemStyle}>All Time</MenuItem>
                <MenuItem value="2" className={classes.menuItemStyle}>Today</MenuItem>
                <MenuItem value="3" className={classes.menuItemStyle}>This Week</MenuItem>
                <MenuItem value="4" className={classes.menuItemStyle}>This month</MenuItem>
                
              </Select>
            </Box>

            <Box>
              
              <Select defaultValue="1" className={classes.selectOption}>
                <MenuItem value="1" className={classes.menuItemStyle}>All Dex</MenuItem>
                <MenuItem value="2" className={classes.menuItemStyle}>PanCakeSwap</MenuItem>
                <MenuItem value="3" className={classes.menuItemStyle}>UniSwap</MenuItem>
                <MenuItem value="4" className={classes.menuItemStyle}>BabySwap</MenuItem>
                <MenuItem value="5" className={classes.menuItemStyle}>SafemoonSwap</MenuItem>
              </Select>
            </Box>
             
            <Box>
              
              <Select defaultValue="1" className={classes.selectOption}>
                <MenuItem value="1" className={classes.menuItemStyle}>All Category</MenuItem>
                <MenuItem value="2" className={classes.menuItemStyle}>Finance</MenuItem>
                <MenuItem value="3" className={classes.menuItemStyle}>Gaming</MenuItem>
                <MenuItem value="4" className={classes.menuItemStyle}>Metaverse</MenuItem>
                <MenuItem value="5" className={classes.menuItemStyle}>Fitness</MenuItem>
                <MenuItem value="6" className={classes.menuItemStyle}>Earn Rewards</MenuItem>
                <MenuItem value="7" className={classes.menuItemStyle}>Staking</MenuItem>
                <MenuItem value="8" className={classes.menuItemStyle}>Blockchain</MenuItem>
                <MenuItem value="9" className={classes.menuItemStyle}>Marketplace</MenuItem>
                <MenuItem value="10" sx={{fontSize:"10px"}}>Meme</MenuItem>
              </Select>
            </Box>

            <Box>
              
              <Select defaultValue="1" className={classes.selectOption}>
                <MenuItem value="1" className={classes.menuItemStyle}>All Chains</MenuItem>
              </Select>
            </Box>

            <Box>
              
              <Select defaultValue="1" className={classes.selectOption}>
                <MenuItem value="1" className={classes.menuItemStyle}>All Badges</MenuItem>
                <MenuItem value="1" className={classes.menuItemStyle}>Gold</MenuItem>
                <MenuItem value="1" className={classes.menuItemStyle}>Silver</MenuItem>
                <MenuItem value="1" className={classes.menuItemStyle}>Bronze</MenuItem>
              </Select>
            </Box>

            <Box>
              <Typography sx={{fontSize:'12px',color:'#FB54FE'}}>ResetFilters&nbsp;&nbsp;&nbsp;</Typography>
            </Box>

            <Box>
              <input type="text" placeholder={"🔍︎ Search"} className={classes.searchStyle}/>
            </Box>
          </Stack>

  

          <Box>
            <Box>
              <Select defaultValue="1" className={classes.selectOption}  sx={{mt:5}}>
                <MenuItem value="1" sx={{fontSize:"10px"}}>Sort By</MenuItem>
              </Select>
            </Box>
          </Box>
        </Box>
            {loading ? (
                <Grid className={classes.centerRowStyle}>
                  <CircularProgress sx={{width:'300px', mt:1}}/>
                </Grid>
              )
            :null}

            <Container sx={{mt:1, overflow:'auto', padding:0, borderRadius:'20px'}}>
              <Box className={classes.tableheader}>
                
                <Box  sx={{width:'220px', minWidth:'220px', textAlign:'center'}}><Typography sx={{fontSize:'12px',fontWeight:"bold",mt:1}}>Name</Typography></Box>
                <Stack direction="row">
                  <Box className={classes.customCardView}>
                    <Typography sx={{fontSize:'12px', fontWeight:'bold', mt:1}}>Date</Typography>
                  </Box>

                  <Box className={classes.customCardView}>
                    <Typography sx={{fontSize:'12px', fontWeight:'bold', mt:1}}>DEX</Typography>
                  </Box>

                  <Box className={classes.customIconsView}>
                    <Typography sx={{ fontSize:'12px', fontWeight:'bold', mt:1}}>Chart</Typography>
                  </Box>

                  <Box className={classes.customCardView}>
                    <Typography sx={{ fontSize:'12px', fontWeight:'bold', mt:1}}>Category</Typography>
                  </Box>

                  <Box className={classes.customIconsView}>
                    <Typography sx={{fontSize:'12px', fontWeight:'bold', mt:1}}>Socials</Typography>
                  </Box>
                  
                  <Box className={classes.customCardView}>
                    <Typography sx={{fontSize:'12px', fontWeight:'bold', mt:1}}>Chain</Typography>
                  </Box>

                  <Grid><Typography sx={{fontSize:'12px',fontWeight:"bold",mt:1}}>Badge</Typography></Grid>
                </Stack>
                
              </Box>

            {listingData&&listingData.length>0&&listingData.filter((item:any, index)=>((index < 10) &&(item.status == "launching"))).map((item:any, index:any) => {
            return (
                <Box key={index} className={classes.customBoxStyle} sx={{background: 'rgba(27, 29, 51, 0.5)'}}>
                
                      <Stack direction="row" spacing={2} sx={{width:'220px', minWidth:'220px'}}>
                        <Typography sx={{mr:1, fontWeight:'bold', mt:1}}>{index+1}.</Typography>
                        <Image alt="cmc" src={CITI} width={50} height={50} style={{borderRadius:25}}/>
                        <Box>
                          <Typography sx={{fontWeight:'bold'}}>{item.projectName}</Typography>
                          <Typography sx={{fontSize:'12px'}}>Coin {index+1} tickers</Typography>
                        </Box>
                      </Stack>

                      <Stack direction="row">
                        <Box className={classes.customCardView}>
                        <Typography sx={{color:'#54FEA2', fontSize:'12px', fontWeight:'bold', mt:1}}>sept-20</Typography>
                        </Box>

                        <Box className={classes.customCardView}>
                          <Typography sx={{color:'#54FEA2', fontSize:'12px', mt:1}}>XYZ</Typography>
                        </Box>

                        <Box className={classes.customIconsView}>
                          <Stack direction="row" spacing={1} sx={{mt:1}}>
                            <Box><Image alt="poocoin" src={POOCOIN} width={20} height={18}/></Box>
                            <Box><Image alt="dexscreener" src={DEXSCREENER} width={20} height={18}/></Box>
                            <Box><Image alt="dextools" src={DEXTOOLS} width={20} height={18}/></Box>
                          </Stack>
                        </Box>

                        <Box className={classes.customCardView}>
                          <Typography sx={{color:'#54FEA2', fontSize:'12px', mt:1}}>XX,xx</Typography>
                        </Box>

                        <Box className={classes.customIconsView} sx={{mt:1}}>
                          <Stack direction="row" spacing={1}>
                            <Box><Image alt="twitter" src={TWITTERP} width={20} height={18}/></Box>
                            <Box><Image alt="telegram" src={TELEGRAMP} width={20} height={18}/></Box>
                            <Box><Image alt="world" src={WORLDP} width={20} height={18}/></Box>
                          </Stack>
                        </Box>

                        <Box className={classes.customCardView} sx={{fontWeight:'bold', mt:1}}>
                          <Box><Image alt="bsc" src={BSC} width={20} height={20}/></Box>
                        </Box>

                        <Grid sx={{mt:1}}>
                          <Image alt="GOLD" src={index===0?BADGE1:(index===1?BADGE2:BADGE3)} width={30} height={30}/>
                        </Grid> 
                      </Stack>
                  </Box>
                )
            })}
            </Container>
        
    </>
    );
};

export default LaunchingT;
    
    
    
    
    