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
  useMediaQuery,
} from '@mui/material'
import axios from 'axios'
import Image from 'next/image'
import { useState, useContext, useEffect } from 'react'
import SubmitButton from '../src/components/SubmitButton'
import useCitiToken from '../src/store/web3/useCitiToken'
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

export default function MyAccountPage() {
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
  const {
    minBalanceForSubmit,
    isFreeMember,
    isNFTSubmission,
    submitForFree,
    submitWithBNB,
    submitWithNFT,
  } = useSubmission()

  const handleSubmit = async () => {
    const data = {
      account,
      projectType,
      projectStatus,
      projectName,
      projectSymbol,
      contractAddress,
      bullish: bullishReason,
      website,
      chainType: selectedChain,
    }

    setPending(true)
    await axios
      .post('/api/users/create-project', data)
      .then(async (res) => {
        var ret: { status: boolean; tx?: any }
        if (await isFreeMember()) {
          ret = await submitForFree(res.data.data)
        } else if (await isNFTSubmission()) {
          ret = await submitWithNFT(res.data.data)
        } else {
          ret = await submitWithBNB(res.data.data)
        }
        console.log(ret)
        if (!ret.status) {
          await axios.post('/api/users/remove-project', {
            _id: res.data.data,
          })
        } else {
          await axios.post('/api/users/confirm-project', {
            _id: res.data.data,
            txHash: ret.tx.transactionHash,
          })
        }
        setPending(false)
      })
      .catch((err) => {
        console.log('Server Connecting Error', err.message)
        setPending(false)
      })
  }

  useEffect(() => {
    const validate = async () => {
      setValidation(
        isConnected &&
          account !== null &&
          web3 !== null &&
          Number(await balanceOf(account)) >=
            Number(await minBalanceForSubmit()),
      )
    }
    validate()
  }, [balanceOf, account, isConnected, web3, minBalanceForSubmit])

  return (
    <>
      {validation ? (
        <Box>
          <Grid container spacing={3} gridAutoRows={1}>
            <Grid item lg={8} md={7} sm={6} xs={12}>
              <CustomContainer px="30px" py="25px" height="100%">
                <Stack justifyContent="center" height="100%" spacing={1}>
                  <Typography fontSize={23} color="#FF43F7">
                    Features you can enjoy with VIP Access
                  </Typography>
                  <Typography component="span">
                    <Tick />
                    &nbsp;Submit Projects for listings at
                    <Typography component="span" color="#9665FF">
                      &nbsp;Zero cost
                    </Typography>
                  </Typography>
                  <Typography component="span">
                    <Tick />
                    &nbsp;Access to alpha chatroom on Discord
                  </Typography>
                  <Typography component="span">
                    <Typography component="span">🔥</Typography>&nbsp;Earn
                    hourly CITI Rewards
                  </Typography>
                  <Typography component="span">
                    <Typography component="span">🔥</Typography>&nbsp;Earn CITI
                    Revenue from dividend pool
                  </Typography>
                  <Typography component="span">
                    <Tick />
                    &nbsp;Receive Tips & Kudos
                  </Typography>
                </Stack>
              </CustomContainer>
            </Grid>
            <Grid item lg={4} md={5} sm={6} xs={12}>
              <CustomContainer px="30px" py="30px">
                <Stack direction="row" spacing={1} alignItems="end" mb={3}>
                  <Typography fontSize={20} fontWeight="bold">
                    My Profile
                  </Typography>
                  <Typography
                    variant={'body2'}
                    color="#9665FF"
                    lineHeight={2.0}
                  >
                    | Username
                  </Typography>
                </Stack>
                <Stack spacing={2}>
                  <Box>
                    <Typography>scout Wallet Address</Typography>
                    <Typography
                      color="#FF43F7"
                      component="span"
                      textOverflow="wrap"
                    >
                      0xkjsahbdb1u2357450973000000
                    </Typography>
                  </Box>
                  <Box>
                    <Typography>scout Username</Typography>
                    <Typography
                      color="#FF43F7"
                      component="span"
                      textOverflow="wrap"
                    >
                      Crypto_Pumpkin
                    </Typography>
                  </Box>
                  <Box>
                    <Typography>scout Telegram Username</Typography>
                    <Typography
                      color="#FF43F7"
                      component="span"
                      textOverflow="wrap"
                    >
                      Crypto_Pumpkin
                    </Typography>
                  </Box>
                  <Box>
                    <Typography>scout Twitter Profile Link</Typography>
                    <Typography color="#FF43F7" component="span">
                      https://twitter.com/Crypto_Pumpkin
                    </Typography>
                  </Box>
                </Stack>
              </CustomContainer>
            </Grid>
            <Grid item lg={8} md={7} sm={6} xs={12}>
              <CustomContainer1
                height="100%"
                display="flex"
                alignItems="center"
              >
                <Stack
                  direction="row"
                  spacing={4}
                  alignItems="center"
                  justifyContent="space-around"
                  width="100%"
                >
                  <Image
                    src="/images/app/discord.png"
                    alt="discord"
                    width={60}
                    height={60}
                  />
                  <Typography
                    fontSize={20}
                    fontWeight="bold"
                    display={mdDown ? 'none' : 'block'}
                  >
                    Alpha Discord Channel exclusively for NFT Holders
                  </Typography>
                  <SubmitButton>Connect</SubmitButton>
                </Stack>
              </CustomContainer1>
            </Grid>
            <Grid item lg={4} md={5} sm={6} xs={12}>
              <CustomContainer1>
                <Typography fontSize={20} fontWeight="bold" mb={2}>
                  Your balance
                </Typography>
                <Stack direction="row" justifyContent="space-between" mb={1}>
                  <Typography>Total CITI Balance</Typography>
                  <NA />
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography>USD Value</Typography>
                  <NA />
                </Stack>
              </CustomContainer1>
            </Grid>
            <Grid item lg={8} md={7} sm={6} xs={12}>
              <Stack spacing={3}>
                <CustomContainer>
                  <Box mx="30px" my="30px">
                    <Typography
                      fontSize={20}
                      fontWeight="bold"
                      component="span"
                    >
                      Collect your hourly Rewards&nbsp;
                      <Typography
                        fontSize={13}
                        lineHeight={2.2}
                        color="rgb(171, 111, 233)"
                        component="span"
                      >
                        | Username
                      </Typography>
                    </Typography>
                  </Box>
                  <CustomContainer px="30px" py="15px">
                    <Grid spacing={2} container>
                      <Grid item lg={4} xs={6}>
                        <Typography>Rewards Collect</Typography>
                        <Stack direction="row" spacing={2}>
                          <NA />
                          <NAUSD />
                        </Stack>
                      </Grid>
                      <Grid item lg={4} xs={6}>
                        <Typography>Rewards Pending</Typography>
                        <Stack direction="row" spacing={2}>
                          <NA />
                          <NAUSD />
                        </Stack>
                      </Grid>
                      <Grid item lg={4} xs={12}>
                        <Box display="flex" justifyContent="center">
                          <SubmitButton>Claim Rewards</SubmitButton>
                        </Box>
                      </Grid>
                    </Grid>
                  </CustomContainer>
                </CustomContainer>
                <CustomContainer>
                  <Typography
                    fontSize={20}
                    fontWeight="bold"
                    mx="30px"
                    my="20px"
                  >
                    Collect Rewards for Approved Listings
                  </Typography>
                  <CustomContainer px="30px" py="15px">
                    <Grid spacing={2} container>
                      <Grid item lg={4} xs={6}>
                        <Typography>Rewards Collect</Typography>
                        <Stack direction="row" spacing={2}>
                          <NA />
                          <NAUSD />
                        </Stack>
                      </Grid>
                      <Grid item lg={4} xs={6}>
                        <Typography>Rewards Pending</Typography>
                        <Stack direction="row" spacing={2}>
                          <NA />
                          <NAUSD />
                        </Stack>
                      </Grid>
                      <Grid item lg={4} xs={12}>
                        <Box display="flex" justifyContent="center">
                          <SubmitButton>Claim Rewards</SubmitButton>
                        </Box>
                      </Grid>
                    </Grid>
                  </CustomContainer>
                </CustomContainer>
                <CustomContainer>
                  <Typography
                    fontSize={20}
                    fontWeight="bold"
                    mx="30px"
                    my="20px"
                  >
                    Collect your CITI Revenue
                  </Typography>
                  <CustomContainer px="30px" py="15px">
                    <Grid spacing={2} container>
                      <Grid item lg={4} xs={6}>
                        <Typography>Rewards Collect</Typography>
                        <Stack direction="row" spacing={2}>
                          <NA />
                          <NAUSD />
                        </Stack>
                      </Grid>
                      <Grid item lg={4} xs={6}>
                        <Typography>Rewards Pending</Typography>
                        <Stack direction="row" spacing={2}>
                          <NA />
                          <NAUSD />
                        </Stack>
                      </Grid>
                      <Grid item lg={4} xs={12}>
                        <Box display="flex" justifyContent="center">
                          <SubmitButton>Claim Rewards</SubmitButton>
                        </Box>
                      </Grid>
                    </Grid>
                  </CustomContainer>
                </CustomContainer>
              </Stack>
            </Grid>
            <Grid item lg={4} md={5} sm={6} xs={12}>
              <CustomContainer px="30px" pt="30px" pb="20px" height="100%">
                <Typography fontSize={20} fontWeight="bold" mb={3}>
                  Your Listing and Submissions
                </Typography>
                <Stack spacing={2}>
                  <Box>
                    <Typography>Rewards Collected</Typography>
                    <Typography color="#54FEA2">NA</Typography>
                  </Box>
                  <Box>
                    <Typography>Rewards Collected</Typography>
                    <Typography color="#54FEA2">NA</Typography>
                  </Box>
                  <Box>
                    <Typography>Rewards Collected</Typography>
                    <Typography color="#54FEA2">NA</Typography>
                  </Box>
                  <Box color="#FF43F7">
                    <Typography>Rewards Collected</Typography>
                    <Typography>NA</Typography>
                  </Box>
                </Stack>
              </CustomContainer>
            </Grid>
            <Grid item xs={12}>
              <CustomContainer px="30px" py="30px">
                <Stack
                  justifyContent="space-between"
                  spacing={2}
                  direction="row"
                  mb={3}
                >
                  <Stack flexWrap="wrap" direction="row" spacing={2}>
                    <Typography fontSize={20} fontWeight="bold">
                      Submit Projects
                    </Typography>
                    <Typography fontSize={20}>Multi-chain Supported</Typography>
                  </Stack>
                  <Button>Generate</Button>
                </Stack>
                <Grid container spacing={4}>
                  <Grid item lg={5} sm={12} px={2} py={3}>
                    <Typography mt={2}>
                      Kindly fill up the form according to your request. If your
                      request(s) are not accommodated by this form, please email
                      to support@citiWorld.io
                    </Typography>
                    <CustomContainer px="15px" py="20px" mt={4}>
                      <Typography
                        color="#FF43F7"
                        fontWeight="bold"
                        fontSize={16}
                      >
                        Paid Sponsors NA BNB
                      </Typography>
                      <Typography>(Non NFT Holders)</Typography>
                      <Stack spacing={1} mt={2} ml={1}>
                        <Typography lineHeight={1.3}>
                          On Approval, your submitted project will be made live
                          with appropriate badge.
                        </Typography>
                        <Typography>NA BNB Goes to CITI Treasury</Typography>
                        <Typography>
                          NA BNB for CITI Buyback & Revenue Pool
                        </Typography>
                        <Typography>NA BNB to Vetter</Typography>
                        <Typography pt={1}>
                          Upon rejection, NA BNB will be refunded.
                        </Typography>
                      </Stack>
                      <Typography
                        mt={2}
                        color="#FF43F7"
                        fontWeight="bold"
                        fontSize={16}
                      >
                        VIP Sponsors NA BNB
                      </Typography>
                      <Typography>(Non NFT Holders)</Typography>
                      <Typography mt={2} lineHeight={1.3} ml={1}>
                        On Approval, your submitted project will be made live
                        with appropriate badge.
                      </Typography>
                      <Typography mt={1} ml={1}>
                        NA BNB to Vetter
                      </Typography>
                      <Typography mt={2} color="#54FEA2">
                        Scouts can earn upto 100 CITI upon approval.
                      </Typography>
                    </CustomContainer>
                  </Grid>
                  <Grid item lg={7} sm={12}>
                    <CustomContainer>
                      <CustomContainer px="30px" py="30px">
                        <Typography
                          color="#FF43F7"
                          fontWeight="bold"
                          fontSize={16}
                          mb={2}
                        >
                          Fill Project Info
                        </Typography>
                        <Divider color="#EBEBEB" />
                        <Stack spacing={3} mt={2}>
                          <Box>
                            <Typography>1. Project Type</Typography>
                            <Stack direction="row" flexWrap="wrap" mx={2}>
                              {PROJECT_TYPE.map((type, index) => (
                                <CustomRadioButton
                                  className={`${
                                    type === projectType ? 'selected' : ''
                                  }`}
                                  key={index}
                                  onClick={() => selectPT(type)}
                                >
                                  {type}
                                </CustomRadioButton>
                              ))}
                            </Stack>
                          </Box>
                          <Box>
                            <Typography>2. Status</Typography>
                            <Stack direction="row" flexWrap="wrap" mx={2}>
                              {PROJECT_STATUS.map((status, index) => (
                                <CustomRadioButton
                                  className={`${
                                    status === projectStatus ? 'selected' : ''
                                  }`}
                                  key={index}
                                  onClick={() => selectPS(status)}
                                >
                                  {status}
                                </CustomRadioButton>
                              ))}
                            </Stack>
                          </Box>
                          <Box>
                            <Typography>3. Project Name</Typography>
                            <Box mx={2}>
                              <CustomTextField
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                              />
                            </Box>
                          </Box>
                          <Box>
                            <Typography>4. Symbol</Typography>
                            <Box mx={2}>
                              <CustomTextField
                                value={projectSymbol}
                                onChange={(e) =>
                                  setProjectSymbol(e.target.value)
                                }
                              />
                            </Box>
                          </Box>
                          <Box>
                            <Typography>5. Blockchain</Typography>
                            <Box mx={2}>
                              <CustomSelect
                                value={selectedChain}
                                onChange={(e) =>
                                  selectChain(e.target.value as string)
                                }
                                fullWidth
                              >
                                {BLOCKCHAINS.map((chain, index) => (
                                  <MenuItem key={index} value={chain}>
                                    {chain}
                                  </MenuItem>
                                ))}
                              </CustomSelect>
                            </Box>
                          </Box>
                          <Box>
                            <Typography>6. Contract Address</Typography>
                            <Box mx={2}>
                              <CustomTextField
                                value={contractAddress}
                                onChange={(e) =>
                                  setContractAddress(e.target.value)
                                }
                                fullWidth
                              />
                            </Box>
                          </Box>
                          <Box>
                            <Typography>7. WebSite</Typography>
                            <Box mx={2}>
                              <CustomTextField
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                                fullWidth
                              />
                            </Box>
                          </Box>
                          <Box>
                            <Typography>
                              8. What makes this project BULLISH?
                            </Typography>
                            <Box mx={2}>
                              <CustomTextField
                                value={bullishReason}
                                onChange={(e) =>
                                  setBullishReason(e.target.value)
                                }
                                multiline
                                fullWidth
                              />
                            </Box>
                          </Box>
                        </Stack>
                      </CustomContainer>
                    </CustomContainer>
                    <Submit onClick={handleSubmit} disabled={pending}>
                      {pending ? 'Pending...' : 'Submit'}
                    </Submit>
                  </Grid>
                </Grid>
              </CustomContainer>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box mt={20}>
          <Typography fontSize={20} fontWeight="bold">
            🤦‍♀️ Oops! Looks like you are disconnected or don’t have enough CITI
            balance to view this page.
          </Typography>
          <Stack direction="row" mt={2}>
            <Typography fontSize={20} fontWeight="bold" component="span">
              Please connect your wallet with&nbsp;
              <Typography
                fontSize={20}
                fontWeight="bold"
                component="span"
                color="#FF43F7"
              >
                10,000 CITI
              </Typography>
              &nbsp;to access MyAccount page.
            </Typography>
          </Stack>
        </Box>
      )}
    </>
  )
}

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
