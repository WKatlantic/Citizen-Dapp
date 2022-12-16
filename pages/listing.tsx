import {
  Box,
  Button,
  Divider,
  Grid,
  Hidden,
  MenuItem,
  Select,
  Stack,
  styled,
  TextField,
  Typography,
  Container,
  useMediaQuery,
} from '@mui/material'
import axios from 'axios'
import Image from 'next/image'
import { useState, useContext, useEffect } from 'react'
import SubmitButton from '../src/components/SubmitButton'
import useCitiToken from '../src/store/web3/useCitiToken'
import ProjectTable from '../src/components/SubPages/listingSection/ProjectTable'
import LockBox from '../src/components/SubPages/listingSection/LockBox'
import {
  PROJECT_STATUS,
  PROJECT_TYPE,
  BLOCKCHAINS,
} from '../src/config/constants'
import useSubmission from '../src/store/web3/useSubmission'

function NA() {
  return (
    <Typography fontSize={18} fontWeight="bold">
      NA
    </Typography>
  )
}

function NAUSD() {
  return (
    <Typography fontSize={18} fontWeight="bold" color="#53CBFF">
      ($NA)
    </Typography>
  )
}

function Tick() {
  return (
    <Typography
      component="span"
      bgcolor="#AD45FF"
      borderRadius="4px"
      fontSize="12px"
      px="2px"
      py="1px"
      mx="2px"
    >
      ✓
    </Typography>
  )
}

export default function Listing() {
  const mdDown = useMediaQuery('(max-width: 1200px)')

  // Project type state
  const [projectType, selectPT] = useState<string>(PROJECT_TYPE[0])

  // Project status state
  const [projectStatus, selectPS] = useState<string>(PROJECT_STATUS[0])

  const [projectName, setProjectName] = useState<string>('')
  const [projectSymbol, setProjectSymbol] = useState<string>('')
  const [contractAddress, setContractAddress] = useState<string>('')
  const [website, setWebsite] = useState<string>('')
  const [bullishReason, setBullishReason] = useState<string>('')
  const [validation, setValidation] = useState<boolean>(false)
  const [selectedChain, selectChain] = useState<string>(BLOCKCHAINS[0])
  const [pending, setPending] = useState<boolean>(false)

  const { isConnected, balanceOf, account, web3 } = useCitiToken()

  const [citiAmount, setCitiAmount] = useState<any>(5);

  useEffect(() => {
    const validate = async () => {
      if(isConnected && account !== null && web3 !== null) {
          setCitiAmount(Number(await balanceOf(account)));
      }
    }
    validate()
  }, [balanceOf, account, isConnected, web3])

  const {
    minBalanceForSubmit,
    isFreeMember,
    isNFTSubmission,
    submitForFree,
    submitWithBNB,
    submitWithNFT,
  } = useSubmission()
  
  return (
    <Grid>
    <Container sx={{mt:5, mb:12}}>
      {
        (citiAmount >= 10000) ? (
          <Grid>
            <ProjectTable userRole={0}/>
          </Grid>
        ) : (
          <Grid>
            <ProjectTable userRole={1}/>
            <LockBox/>
        </Grid>
        )
      }
    </Container>
    
  </Grid>
  );
};

const CustomContainer = styled(Box)`
  position: relative;
  background-color: rgba(28, 31, 50, 0.4);
  border-radius: 15px;
`

const CustomContainer1 = styled(CustomContainer)`
  background: linear-gradient(to left, #353dfc, #b31df1);
  padding: 25px 30px;
`

const CustomRadioButton = styled(Button)`
  background-color: rgba(127, 67, 255, 0.21);
  border-radius: 5px;
  color: inherit;
  font-size: 10px;
  padding: 2px 20px;
  margin-right: 8px;
  margin-top: 4px;
  text-transform: uppercase;
  min-height: 26px;
  min-width: 105px;
  &:hover {
    background-color: #b4abf5;
  }
  &.selected {
    background-color: #b4abf5;
  }
`

const CustomTextField = styled(TextField)`
  background-color: rgba(127, 67, 255, 0.21);
  border-radius: 5px;
  // & > div:hover {
  //   border-inline: #ff43f7;
  // }
  & > div > input {
    padding: 4px 8px;
  }
  & > div.MuiInputBase-multiline {
    padding: 8px 8px;
    & > textarea {
      min-height: 80px;
    }
  }
`

const CustomSelect = styled(Select)`
  background-color: rgba(127, 67, 255, 0.21);
  & > div {
    padding: 4px 8px;
  }
  & svg {
    color: inherit;
  }
`

const Submit = styled(Button)`
  background: linear-gradient(to right, #b31df1, #353dfc 200%);
  border-radius: 5px;
  height: auto;
  padding: 2px 30px;
  min-height: auto;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 20px;
`
