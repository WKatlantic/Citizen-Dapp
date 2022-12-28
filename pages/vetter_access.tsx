import {
  Box,
  Button,
  Divider,
  Grid,
  Select,
  styled,
  Stack,
  TextField,
  Typography,
  MenuItem,
} from '@mui/material'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState, useCallback } from 'react'
import {
  PROJECT_TYPE,
  PROJECT_STATUS,
  BLOCKCHAINS,
  VETTING_STATUS,
  LISTING_TYPE,
} from '../src/config/constants'
import useSubmission from '../src/store/web3/useSubmission'
import SubmitButton from '../src/components/SubmitButton'
import LoadingRow from '../src/components/LoadingRow'
import { useNotification } from '../src/store/redux/hooks/useNotification'
import { useDextool } from '../src/store/redux/hooks';

const DEX = ['PSC', 'Uniswap', 'Apeswap', 'Babyswap']
const DEX_URL: { [key: string]: string } = {
  PSC: 'https://pancakeswap.finance/info/token/',
  Uniswap: 'https://info.uniswap.org/#/tokens/',
  Apeswap: 'https://info.apeswap.finance/token/',
  Babyswap: 'https://home.babyswap.finance/info/token',
}
const CHART = [
  {
    name: 'Poocoin',
    image: 'Poocoin-icon.png',
  },
  {
    name: 'Dexscreener',
    image: 'dexscreener.png',
  },
  {
    name: 'Dextools',
    image: 'Dextools-icon.png',
  },
]
const UTILITY = [
  'Meme',
  'Finance',
  'Gaming',
  'Metaverse',
  'Fitness',
  'Activity',
  'Blockchain',
  'Dex',
]
const BADGE = [
  { name: 'Gold', icon: '/images/app/badge/gold.png' },
  { name: 'Silver', icon: '/images/app/badge/silver.png' },
  { name: 'Bronze', icon: '/images/app/badge/bronze.png' },
  { name: 'None', icon: '/images/app/badge/' },
]
function ProjectInfo(props: { project: any; update: Function }) {
  const [project, setProject] = useState<any>(props.project)
  const [chain, setChain] = useState<string>(props.project.chainType)
  const [selectedChain, selectChain] = useState<string>(BLOCKCHAINS[3])
  const [projectType, setProjectType] = useState<string>(props.project.projectType)
  const [projectName, setProjectName] = useState<string>(props.project.projectName)
  const [projectSymbol, setProjectSymbol] = useState<string>(
    props.project.projectSymbol,
  )
  const [contractAddress, setContractAddress] = useState<string>(
    props.project.contractAddress,
  )
  const [customExp, setCustomExp] = useState<string>('')
  const { displayNotification } = useNotification()

  useEffect(() => {
    setChain(props.project.chainType)
    setProjectType(props.project.projectType)
    setProjectName(props.project.projectName)
    setProjectSymbol(props.project.projectSymbol)
    setContractAddress(props.project.contractAddress)
  }, [props.project])

  const isValid = useCallback(() => {
    if (projectName === '' || projectSymbol === '' || contractAddress === '')
      return false
    if (chain === selectedChain && customExp === '') return false
    return (
      projectType !== project.projectType ||
      projectName !== project.projectName ||
      projectSymbol !== project.projectSymbol ||
      contractAddress !== project.contractAddress ||
      chain !== project.chainType
    )
  }, [
    chain,
    selectedChain,
    customExp,
    projectType,
    projectName,
    projectSymbol,
    contractAddress,
    project,
  ])

  const handleSaving = useCallback(async () => {
    const res = await axios.post('/api/users/edit-project', {
      ...project,
      projectType,
      projectName,
      projectSymbol,
      contractAddress,
      chainType: chain,
    })
    if (res.data.success === true) {
      displayNotification({
        type: 'success',
        message: 'Project information changed.',
      })
      props.update()
    } else {
      displayNotification({
        type: 'error',
        message: 'Project information failed.',
      })
    }
  }, [
    projectType,
    projectName,
    project,
    projectSymbol,
    contractAddress,
    chain,
  ])

  const blockchainHandler = (_chain:any, _index:number) => {
    // if(chain == _chain) {
    // setChain((chain) => 
    //   chain === BLOCKCHAINS[_index] ? '' : BLOCKCHAINS[_index],
    // )
    // }
    if(chain == _chain) {
      // setChain("asdfasdf");
      setChain(BLOCKCHAINS[_index]);
    }
  }

  return (
    <CustomContainer px="25px" py="25px">
      <Typography fontSize={18} fontWeight="bold" color="#ff43f7" mb={2}>
        Project Info
      </Typography>
      <Divider color="gray" />
      <Stack spacing={3} mt={3}>
        <Box>
          <Typography>1. Project Type</Typography>
          <Stack flexWrap="wrap" mx={1} mt={1} direction="row" spacing={1}>
            {PROJECT_TYPE.map((type, index) => (
              <CustomRadioButton
                key={index}
                onClick={() => setProjectType(type)}
                className={type === projectType ? 'selected' : ''}
              >
                {type}
              </CustomRadioButton>
            ))}
          </Stack>
        </Box>
        <Box>
          <Typography>2. Blockchain</Typography>
          <Stack spacing={1} mx={1} mt={1}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Image
                src="/images/app/chain/bsc.png"
                alt="bsc"
                width={16.77}
                height={16.77}
              />
              <CustomRadioButton
                className={chain === BLOCKCHAINS[0] ? 'selected' : ''}
                // onClick={() =>
                //     setChain((chain) => 
                //       chain === BLOCKCHAINS[0] ? '' : BLOCKCHAINS[0],
                //     )
                // }
                onClick = {() => blockchainHandler("Binance Smart Chain", 0)}
              >
                BSC
              </CustomRadioButton>
              <Box flexGrow={1}>
                <CustomTextField
                  placeholder="Enter Link"
                  fullWidth
                  value={
                    chain !== BLOCKCHAINS[0]
                      ? ''
                      : `https://testnet.bscscan.com/address/${contractAddress}`
                  }
                  InputProps={{ readOnly: true }}
                />
              </Box>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Image
                src="/images/app/chain/eth.png"
                alt="eth"
                width={16.77}
                height={16.77}
              />
              <CustomRadioButton
                className={chain === BLOCKCHAINS[1] ? 'selected' : ''}
                // onClick={() =>
                //   setChain((chain) =>
                //     chain === BLOCKCHAINS[1] ? '' : BLOCKCHAINS[1],
                //   )
                // }
                onClick = {() => blockchainHandler("Ethereum", 1)}
              >
                ETH
              </CustomRadioButton>
              <Box flexGrow={1}>
                <CustomTextField
                  placeholder="Enter Link"
                  fullWidth
                  value={
                    chain !== BLOCKCHAINS[1]
                      ? ''
                      : `https://etherscan.io/address/${contractAddress}`
                  }
                  InputProps={{ readOnly: true }}
                />
              </Box>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Image
                src="/images/app/chain/sol.png"
                alt="sol"
                width={16.77}
                height={16.77}
              />
              <CustomRadioButton
                className={chain === BLOCKCHAINS[2] ? 'selected' : ''}
                // onClick={() =>
                //   setChain((chain) =>
                //     chain === BLOCKCHAINS[2] ? '' : BLOCKCHAINS[2],
                //   )
                // }
                onClick = {() => blockchainHandler("Solana" , 2)}
              >
                SOL
              </CustomRadioButton>
              <Box flexGrow={1}>
                <CustomTextField
                  placeholder="Enter Link"
                  fullWidth
                  value={
                    chain !== BLOCKCHAINS[2]
                      ? ''
                      : `https://solscan.io/token/${contractAddress}`
                  }
                  InputProps={{ readOnly: true }}
                />
              </Box>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <CustomSelect
                defaultValue={BLOCKCHAINS[3]}
                className={chain === selectedChain ? 'selected' : ''}
              >
                {BLOCKCHAINS.filter((_, index) => index > 2).map(
                  (_chain, index) => (
                    <MenuItem
                      value={_chain}
                      key={index}
                      onClick={() => {
                        selectChain(_chain),
                          setChain((chain) => (chain === _chain ? '' : _chain))
                      }}
                    >
                      {_chain}
                    </MenuItem>
                  ),
                )}
              </CustomSelect>
              <Box flexGrow={1}>
                <CustomTextField
                  placeholder="Enter Link"
                  value={customExp}
                  onChange={(e) => setCustomExp(e.target.value)}
                  fullWidth
                  InputProps={{ readOnly: chain !== selectedChain }}
                />
              </Box>
            </Stack>
          </Stack>
        </Box>
        <Box>
          <Typography>3. Project Name</Typography>
          <Box mx={1} mt={1}>
            <CustomTextField
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </Box>
        </Box>
        <Box>
          <Typography>4. Symbol</Typography>
          <Box mx={1} mt={1}>
            <CustomTextField
              value={projectSymbol}
              onChange={(e) => setProjectSymbol(e.target.value)}
            />
          </Box>
        </Box>
        <Box>
          <Typography>5. Contract Address</Typography>
          <Box mx={1} mt={1}>
            <CustomTextField
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              fullWidth
            />
          </Box>
        </Box>
      </Stack>
      <Box mt={4}>
        <CustomButton disabled={!isValid()} onClick={handleSaving}>
          Save changes
        </CustomButton>
      </Box>
    </CustomContainer>
  )
}

function LaunchInfo(props: { project: any; update: Function }) {
  const [project, setProject] = useState<any>(props.project)
  const [selectedChart, selectChart] = useState<string>(CHART[0].name)
  const [utilities, setUtilities] = useState<string>(props.project.utility || '')
  const [upcomingDate, setUpcomingDate] = useState<string>(
    new Date(props.project.launchDate).toISOString().slice(0, 10),
  )
  const [dexes, setDexes] = useState<any>([])
  const [taxesBuy, setTaxesBuy] = useState<number>(props.project.taxesBuy || 0)
  const [taxesSell, setTaxesSell] = useState<number>(props.project.taxesSell || 0)
  const [bullish, setBullish] = useState<string>(props.project.bullish || '')
  const { displayNotification } = useNotification()
  const {fetchDexData} = useDextool();
//   async function handleDex (_dex:any) {

//     const dexDate = await fetchDexData(projectName);

//     for(let i=0; i<dexDate.results.length; i++) {
//         if(dexDate.results[i].id.exchange.includes( _dex)) {                
//             if (_dex == "pancakev2") {
//                 setDex({...dex , [_dex]: 'https://pancakeswap.finance/info/token/' + dexDate.results[i].id.token})
//                 break;
//             } else if (_dex.includes("uni")) {
//                 setDex({...dex , [_dex]: 'https://info.uniswap.org/#/tokens/' + dexDate.results[i].id.token})
//                 break;
//             } else if (_dex.includes ("ape")) {
//                 setDex({...dex , [_dex]: 'https://info.apeswap.finance/token/' + dexDate.results[i].id.token})
//                 break;
//             } else if(_dex.includes ("baby")) {
//                 setDex({...dex , [_dex]: 'https://home.babyswap.finance/info/token' + dexDate.results[i].id.token})
//                 break;
//             }
//         }
//     }
// }

  useEffect(() => {
    
    setUtilities(props.project.utility || '')
    setUpcomingDate(new Date(props.project.launchDate).toISOString().slice(0, 10))
    setTaxesBuy(props.project.taxesBuy || 0)
    setTaxesSell(props.project.taxesSell || 0)
    setBullish(props.project.bullish || '')
  }, [props.project])

  const isValid = useCallback(() => {
    return (
      upcomingDate !==
        new Date(project.launchDate).toISOString().slice(0, 10) ||
      taxesBuy !== project.taxesBuy ||
      taxesSell !== project.taxesSell ||
      utilities !== project.utility ||
      bullish !== project.bullish
    )
  }, [upcomingDate, taxesBuy, taxesSell, utilities, bullish, project])

  const handleSaving = useCallback(async () => {
    const res = await axios.post('/api/users/edit-project', {
      ...project,
      upcomingDate,
      taxesBuy,
      taxesSell,
      utility: utilities,
      bullish,
    })
    if (res.data.success === true) {
      displayNotification({
        type: 'success',
        message: 'Project information changed.',
      })
      props.update()
    } else {
      displayNotification({
        type: 'error',
        message: 'Project information failed.',
      })
    }
  }, [upcomingDate, taxesBuy, taxesSell, utilities, bullish, project])

  return (
    <CustomContainer px="25px" py="25px">
      <Typography fontSize={18} fontWeight="bold" color="#ff43f7" mb={2}>
        Launch Info
      </Typography>
      <Divider color="gray" />
      <Stack spacing={3} mt={3}>
        <Box>
          <Typography>1. Launch Date</Typography>
          <Stack flexWrap="wrap" direction="row" mt={1} mx={1} spacing={2}>
            <CustomRadioButton>Upcoming</CustomRadioButton>
            <CustomDatePicker
              id="date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={upcomingDate}
              onChange={(e) =>
                setUpcomingDate(
                  new Date(e.target.value).toISOString().slice(0, 10),
                )
              }
            />
          </Stack>
        </Box>
        <Box>
          <Typography>2. DEX</Typography>
          <Stack spacing={1} mx={1} mt={1}>

            {DEX.map((dex: string, index) => (
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                key={index}
              >
                <CustomRadioButton
                  className={dexes.includes(dex) ? 'selected' : ''}
                  onClick={() =>
                    setDexes((_dexes: any[]) =>
                      _dexes.includes(dex)
                        ? dexes.filter((_dex: any) => _dex != dex)
                        : [...dexes, dex],
                    )
                  }
                >
                  {dex}
                </CustomRadioButton>
                <Box flexGrow={1}>
                  <CustomTextField
                    value={
                      dexes.includes(dex)
                        ? `${DEX_URL[dex]}${project.contractAddress}`
                        : ''
                    }
                    placeholder="Enter Link"
                    fullWidth
                  />
                </Box>
              </Stack>
            ))}
            {/* <Stack direction="row" spacing={1} alignItems="center">
              <CustomRadioButton
                className={dexes.includes('Other') ? 'selected' : ''}
                onClick={() =>
                  setDexes((_dexes: any[]) =>
                    _dexes.includes('Other')
                      ? dexes.filter((_dex: any) => _dex != 'Other')
                      : [...dexes, 'Other'],
                  )
                }
              >
                Other
              </CustomRadioButton>
              <Box flexGrow={1}>
                <CustomTextField placeholder="Enter Link" fullWidth />
              </Box>
            </Stack> */}
          </Stack>
        </Box>
        <Box>
          <Typography>3. Chart</Typography>
          <Box mx={1} mt={1}>
            <Stack spacing={1}>
              {CHART.map((chart, index) => (
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  key={index}
                >
                  <Image
                    src={`/images/app/chart/${chart.image}`}
                    alt="bsc"
                    width={20}
                    height={20}
                  />
                  <CustomRadioButton
                    className={selectedChart === chart.name ? 'selected' : ''}
                    onClick={() => selectChart(chart.name)}
                  >
                    {chart.name}
                  </CustomRadioButton>
                  <Box flexGrow={1}>
                    <CustomTextField placeholder="Enter Link" fullWidth />
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Box>
        </Box>
        <Box>
          <Typography>4. Taxes</Typography>
          <Box mx={1} mt={1}>
            <Stack direction="row" spacing={1}>
              <CustomTextField
                type="number"
                value={taxesBuy}
                onChange={(e) => setTaxesBuy(Number(e.target.value))}
                style={{ width: '70px' }}
              />
              <Typography>Buy Tax %</Typography>
              <CustomTextField
                type="number"
                value={taxesSell}
                onChange={(e) => setTaxesSell(Number(e.target.value))}
                style={{ width: '70px' }}
              />
              <Typography>Sell tax %</Typography>
            </Stack>
          </Box>
        </Box>
        <Box>
          <Typography>5. Utility</Typography>
          <Box mx={1} mt={1}>
            <Stack direction="row" flexWrap="wrap">
              {UTILITY.map((utility, index) => (
                <Box px="3px" py="3px" key={index}>
                  <CustomRadioButton
                    className={utilities.includes(utility) ? 'selected' : ''}
                    onClick={() =>
                      setUtilities((utilities) =>
                        utilities.includes(utility + ' ')
                          ? utilities.replace(utility + ' ', '')
                          : utilities + utility + ' ',
                      )
                    }
                  >
                    {utility}
                  </CustomRadioButton>
                </Box>
              ))}
            </Stack>
            <Box
              border="1px solid #483779"
              borderRadius={2}
              padding={1}
              width="100%"
              height="32px"
              bgcolor="#281A48"
              mt={1}
              fontSize={10}
            >
              {utilities}
            </Box>
          </Box>
        </Box>
        <Box>
          <Typography fontSize={17} color="#ff43f7">
            What makes this project BULLISH?
          </Typography>
          <Box mx={1} mt={1}>
            <CustomTextField
              multiline
              value={bullish}
              onChange={(e) => setBullish(e.target.value)}
              placeholder="Enter relevant info & features of the project"
              fullWidth
            />
          </Box>
        </Box>
      </Stack>
      <Box mt={4}>
        <CustomButton disabled={!isValid()} onClick={handleSaving}>
          Save changes
        </CustomButton>
      </Box>
    </CustomContainer>
  )
}

function PresaleInfo(props: { project: any; update: Function }) {
  const [project, setProject] = useState<any>(props.project)
  const initialPlatforms = { pinksale: '', platform1: '', platform2: '' }
  const [whitelist, setWhitelist] = useState<boolean>(
    props.project.whitelist.available,
  )
  const [wlink, setWlink] = useState<string>(props.project.whitelist.link || '')
  const [upcomingDate, setUpcomingDate] = useState<string>(
    new Date(props.project.presaleDate).toISOString().slice(0, 10),
  )
  const [platforms, setPlatforms] = useState<any>({
    ...initialPlatforms,
    ...props.project.presalePlatform,
  })
  const { displayNotification } = useNotification()

  useEffect(() => {
    setWhitelist(props.project.whitelist.available)
    setWlink(props.project.whitelist.link || '')
    setUpcomingDate(new Date(props.project.presaleDate).toISOString().slice(0, 10))
    setPlatforms({
      ...initialPlatforms,
      ...props.project.presalePlatform,
    })
  }, [props.project])

  const isValid = () => {
    return (
      upcomingDate !==
        new Date(project.presaleDate).toISOString().slice(0, 10) ||
      whitelist !== project.whitelist.available ||
      wlink !== project.whitelist.link ||
      JSON.stringify(platforms) !==
        JSON.stringify({
          ...initialPlatforms,
          ...project.presalePlatform,
        })
    )
  }

  const handleSaving = useCallback(async () => {
    const res = await axios.post('/api/users/edit-project', {
      ...project,
      presaleDate: new Date(upcomingDate),
      whitelist: {
        available: whitelist,
        link: wlink,
      },
      presalePlatform: platforms,
    })
    if (res.data.success === true) {
      displayNotification({
        type: 'success',
        message: 'Presale information changed.',
      })
      props.update()
    } else {
      displayNotification({
        type: 'error',
        message: 'Presale information failed.',
      })
    }
  }, [wlink, whitelist, upcomingDate, platforms, project])

  return (
    <CustomContainer px="25px" py="25px">
      <Typography fontSize={18} fontWeight="bold" color="#ff43f7" mb={2}>
        Fill Presale Info
      </Typography>
      <Divider color="gray" />
      <Stack spacing={3} mt={3}>
        <Box>
          <Typography>1. Presale Date</Typography>
          <Stack
            flexWrap="wrap"
            direction="row"
            mt={1}
            mx={1}
            alignItems="center"
            spacing={2}
          >
            <CustomRadioButton>Upcoming</CustomRadioButton>
            <CustomDatePicker
              id="date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={upcomingDate}
              onChange={(e) =>
                setUpcomingDate(
                  new Date(e.target.value).toISOString().slice(0, 10),
                )
              }
            />
          </Stack>
        </Box>
        <Box>
          <Typography>2. Whitelist Available</Typography>
          <Stack direction="row" spacing={1} mx={1} mt={1}>
            <CustomRadioButton1
              className={whitelist ? '' : 'selected'}
              onClick={() => setWhitelist(false)}
            >
              No
            </CustomRadioButton1>
            <CustomRadioButton1
              className={!whitelist ? '' : 'selected'}
              onClick={() => setWhitelist(true)}
            >
              Yes
            </CustomRadioButton1>
            <Box flexGrow={1}>
              <CustomTextField1
                placeholder="Paste Link Here / Add more info"
                value={wlink}
                onChange={(e) => setWlink(e.target.value)}
                fullWidth
              />
            </Box>
          </Stack>
        </Box>
        <Box>
          <Typography>3. Presale Platform & Link</Typography>
          <Stack spacing={1} mx={1} mt={1}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Box
                width="80px"
                bgcolor="#FFF"
                color="#000"
                padding={1}
                borderRadius={1}
                height="26px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize={12}
              >
                Pinksale
              </Box>
              <Box flexGrow={1}>
                <CustomTextField
                  value={platforms.pinksale}
                  onChange={(e) =>
                    setPlatforms({ ...platforms, pinksale: e.target.value })
                  }
                  placeholder="Enter Link"
                />
              </Box>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Box
                width="80px"
                bgcolor="#FFF"
                color="#000"
                padding={1}
                borderRadius={1}
                height="26px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize={12}
              >
                Platform 1
              </Box>
              <Box flexGrow={1}>
                <CustomTextField
                  value={platforms.platform1}
                  onChange={(e) =>
                    setPlatforms({ ...platforms, platform1: e.target.value })
                  }
                  placeholder="Enter Link"
                />
              </Box>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Box
                width="80px"
                bgcolor="#FFF"
                color="#000"
                padding={1}
                borderRadius={1}
                height="26px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize={12}
              >
                Platform 2
              </Box>
              <Box flexGrow={1}>
                <CustomTextField
                  value={platforms.platform2}
                  onChange={(e) =>
                    setPlatforms({ ...platforms, platform2: e.target.value })
                  }
                  placeholder="Enter Link"
                />
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Stack>
      <Box mt={4}>
        <CustomButton disabled={!isValid()} onClick={handleSaving}>
          Save changes
        </CustomButton>
      </Box>
    </CustomContainer>
  )
}

function TeamInfo(props: { project: any; update: Function }) {
  const [project, setProject] = useState<any>(props.project)
  const [teamReview, setTeamReview] = useState<string>(props.project.teamReview || '')
  const [teamOfficialEmail, setTeamOfficialEmail] = useState<string>(
    props.project.teamOfficialEmail || '',
  )
  const [teamRegisteredName, setTeamRegisteredName] = useState<string>(
    props.project.teamRegisteredName || '',
  )
  const { displayNotification } = useNotification()

  useEffect(() => {
    setTeamReview(props.project.teamReview || '')
    setTeamOfficialEmail(props.project.teamOfficialEmail || '')
    setTeamRegisteredName(props.project.teamRegisteredName || '')
  }, [props.project])

  const isValid = useCallback(() => {
    return (
      teamReview !== project.teamReview ||
      teamOfficialEmail !== project.teamOfficialEmail ||
      teamRegisteredName !== project.teamRegisteredName
    )
  }, [teamReview, teamOfficialEmail, teamRegisteredName, project])

  const handleSaving = useCallback(async () => {
    const res = await axios.post('/api/users/edit-project', {
      ...project,
      teamReview,
      teamOfficialEmail,
      teamRegisteredName,
    })
    if (res.data.success === true) {
      displayNotification({
        type: 'success',
        message: 'Team information changed.',
      })
      props.update()
    } else {
      displayNotification({
        type: 'error',
        message: 'Team information failed.',
      })
    }
  }, [teamReview, teamOfficialEmail, teamRegisteredName, project])

  return (
    <CustomContainer px="25px" py="25px">
      <Typography fontSize={18} fontWeight="bold" color="#ff43f7" mb={2}>
        Team Info
      </Typography>
      <Divider color="gray" />
      <Stack spacing={2} mt={3}>
        <Box>
          <Typography>1. Team Review</Typography>
          <Box mx={1} mt={1}>
            <CustomTextField
              placeholder="Enter name of core team members"
              value={teamReview}
              onChange={(e) => setTeamReview(e.target.value)}
              multiline
              fullWidth
            />
          </Box>
        </Box>
        <Box>
          <Typography>2. Official Email</Typography>
          <Box mx={1} mt={1}>
            <CustomTextField
              placeholder="Ppumpkinteam@farm.com"
              value={teamOfficialEmail}
              onChange={(e) => setTeamOfficialEmail(e.target.value)}
              fullWidth
            />
          </Box>
        </Box>
        <Box>
          <Typography>3. Registered business name</Typography>
          <Box mx={1} mt={1}>
            <CustomTextField
              value={teamRegisteredName}
              onChange={(e) => setTeamRegisteredName(e.target.value)}
              multiline
              fullWidth
            />
          </Box>
        </Box>
      </Stack>
      <Box mt={4}>
        <CustomButton disabled={!isValid()} onClick={handleSaving}>
          Save changes
        </CustomButton>
      </Box>
    </CustomContainer>
  )
}

function OfficialInfo(props: { project: any; update: Function }) {
  const [project, setProject] = useState<any>(props.project);
  const [website, setWebsite] = useState<string>(props.project.website || '')
  const [telegram, setTelegram] = useState<string>(props.project.telegram || '')
  const [twitter, setTwitter] = useState<string>(props.project.twitter || '')
  const [appLink, setAppLink] = useState<string>(props.project.appLink || '')
  const { displayNotification } = useNotification()

  useEffect(() => {
    setWebsite(props.project.website || '')
    setTelegram(props.project.telegram || '')
    setTwitter(props.project.twitter || '')
    setAppLink(props.project.appLink || '')
  }, [props.project])

  const isValid = useCallback(() => {
    return (
      website !== project.website ||
      telegram !== project.telegram ||
      twitter !== project.twitter ||
      appLink !== project.appLink
    )
  }, [website, telegram, twitter, appLink, project])

  const handleSaving = useCallback(async () => {
    const res = await axios.post('/api/users/edit-project', {
      ...project,
      website,
      telegram,
      twitter,
      appLink,
    })
    if (res.data.success === true) {
      displayNotification({
        type: 'success',
        message: 'Team information changed.',
      })
      props.update()
    } else {
      displayNotification({
        type: 'error',
        message: 'Team information failed.',
      })
    }
  }, [website, telegram, twitter, appLink, project])

  return (
    <CustomContainer px="25px" py="25px">
      <Typography fontSize={18} fontWeight="bold" color="#ff43f7" mb={2}>
        Official Info
      </Typography>
      <Divider color="gray" />
      <Stack spacing={2} mt={3}>
        <Stack direction="row" justifyContent="end">
          <Typography flexGrow={1} width={150}>
            1. Website
          </Typography>
          <CustomTextField
            fullWidth
            placeholder="Official Website Link"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </Stack>
        <Stack direction="row" justifyContent="end">
          <Typography flexGrow={1} width={150}>
            2. Telegram
          </Typography>
          <CustomTextField
            fullWidth
            placeholder="Official Telegram Chatroom"
            value={telegram}
            onChange={(e) => setTelegram(e.target.value)}
          />
        </Stack>
        <Stack direction="row" justifyContent="end">
          <Typography flexGrow={1} width={150}>
            3. Twitter
          </Typography>
          <CustomTextField
            fullWidth
            placeholder="Official Twitter Link"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
          />
        </Stack>
        <Stack direction="row" justifyContent="end">
          <Typography flexGrow={1} width={150}>
            4. App Link
          </Typography>
          <CustomTextField
            fullWidth
            placeholder="Official App Link"
            value={appLink}
            onChange={(e) => setAppLink(e.target.value)}
          />
        </Stack>
        <Box>
          <Typography flexGrow={1}>5. Project Logo</Typography>
          <Stack mx={1} mt={1} direction="row" alignItems="center" spacing={2}>
            <Image
              src="/images/app/whiteciti.png"
              alt="whiteciti"
              style={{ borderRadius: '100%' }}
              width={50}
              height={50}
            />
            <Box>
              <Box
                fontSize={12}
                bgcolor="#6419C8A0"
                style={{ cursor: 'pointer' }}
                px={4}
                py="4px"
                borderRadius="10px"
                width="fit-content"
              >
                Upload
              </Box>
              <Typography mt={1}>
                Dimensions 200*200px Max Size 200kb
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Stack>
      <Box mt={4}>
        <CustomButton disabled={!isValid()} onClick={handleSaving}>
          Save changes
        </CustomButton>
      </Box>
    </CustomContainer>
  )
}

function ProjectDetail(props: {
  project: any
  index: number
  editHandler: Function
}) {
  const { project, index } = props
  const { getProjectInfo } = useSubmission()
  const [projectInfo, setProjectInfo] = useState<any>(null)

  const _getProjectInfo = useCallback(async () => {
    const info = await getProjectInfo(project._id)
    if (info.status) {
      setProjectInfo(info.data)
      info.data.feedback
    }
  }, [getProjectInfo])

  useEffect(() => {
    _getProjectInfo()
  }, [getProjectInfo, project])

  return (
    <CustomContainer px="20px" pt="15px" pb="10px">
      <Box overflow="auto">
        {projectInfo === null ? (
          <LoadingRow cols={9} />
        ) : (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={4}
            width="max-content"
            pb="5px"
          >
            <Typography>{index + 1}.</Typography>
            <Box>
              <Typography fontWeight="bold">Project</Typography>
              <Typography>{project.projectName}</Typography>
            </Box>
            <Box>
              <Typography>Submitted On</Typography>
              <Typography fontWeight="bold">
                {new Date(project.createdAt).toDateString()}
              </Typography>
            </Box>
            <Box>
              <Typography>Project Status</Typography>
              <Typography fontWeight="bold">{project.projectStatus}</Typography>
            </Box>
            <Box>
              <Typography>Vetting Status</Typography>
              <Typography
                fontWeight="bold"
                color={
                  projectInfo.permission === '0'
                    ? 'inherit'
                    : projectInfo.permission === '1'
                    ? '#54FEA2'
                    : '#A0102f'
                }
              >
                {projectInfo.permission === '0'
                  ? 'Pending'
                  : projectInfo.permission === '1'
                  ? 'Passed'
                  : 'Rejected'}
              </Typography>
            </Box>
            <Box>
              <Typography>
                Approvals{' '}
                <Typography component="span" fontWeight="bold">
                  {projectInfo.approvalNumber}
                </Typography>
              </Typography>
              <Typography>
                Rejections{' '}
                <Typography component="span" fontWeight="bold">
                  {projectInfo.assessedNumber - projectInfo.approvalNumber}
                </Typography>
              </Typography>
            </Box>
            <Box>
              <Typography>Status - Listing</Typography>
              <Typography
                fontWeight="bold"
                color={project.liveOnDapp ? `#54FEA2` : 'inherit'}
              >
                {project.liveOnDapp ? 'Live On dApp' : 'Not Live'}
              </Typography>
            </Box>
            <Button>Review</Button>
            <Button onClick={() => props.editHandler(project)}>Edit</Button>
          </Stack>
        )}
      </Box>
    </CustomContainer>
  )
}

export default function VetterAccess() {
  const [projects, setProjects] = useState<any[]>([])
  const [currentProject, setCurrentProject] = useState<any>(null)
  const [projectStatus, setProjectStatus] = useState<string>('All')
  const [vettingStatus, setVettingStatus] = useState<number>(0)
  const [submitType, setSubmitType] = useState<number>(0)
  const [pendingProjects, togglePendingProjects] = useState<boolean>(false)
  const {
    getProjectInfo,
    approve,
    reject,
    account,
    isVetter,
    VetterAssessment,
  } = useSubmission()
  const [badge, setBadge] = useState<string>('None')
  const [feedback, setFeedback] = useState<string>('')
  const [permission, togglePermission] = useState<boolean>(false)
  const [vetterAssessment, setAssessement] = useState<number>(0)
  const { displayNotification } = useNotification()

  const getProjects = useCallback(async () => {
    const _oldCurrentId = currentProject ? currentProject._id : ''
    setCurrentProject(null)
    togglePendingProjects(true)
    var data = projectStatus === 'All' ? {} : { projectStatus }
    const res = await axios.post('/api/users/get-projects', data)
    if (res.data.success) {
      if (vettingStatus === 0 && submitType === 0) {
        setCurrentProject(
          res.data.data.find(
            (_project: any) => _project._id === _oldCurrentId,
          ) || null,
        )
        setProjects(res.data.data)
        togglePendingProjects(false)
        return
      }
      var result: any[] = []
      for (var i = 0; i < res.data.data.length; i++) {
        const project = res.data.data[i]
        const info = await getProjectInfo(project._id)
        var ret = true
        if (vettingStatus !== 0)
          ret = ret && Number(info.data.permission) === vettingStatus - 1
        if (submitType !== 0) {
          ret =
            ret &&
            Number(info.data.submissionType) < submitType * 2 &&
            Number(info.data.submissionType) >= submitType * 2 - 2
        }
        if (ret) {
          result.push(project)
        }
      }
      setCurrentProject(
        result.find((_project: any) => _project._id === _oldCurrentId) || null,
      )
      setProjects(result)
      togglePendingProjects(false)
    }
  }, [projectStatus, vettingStatus, submitType, getProjectInfo, currentProject])

  const getAssessmentStatus = useCallback(async () => {
    if (currentProject !== null) {
      const res = await VetterAssessment(currentProject._id)
      if (res.status === true) {
        console.log(res.data)
        setAssessement(res.data)
      }
    }
  }, [VetterAssessment, currentProject])

  useEffect(() => {
    if (permission) getProjects()
  }, [permission])

  useEffect(() => {
    const getPermission = async () => {
      const res = await isVetter()
      togglePermission(res)
    }
    getPermission()
  }, [isVetter])

  useEffect(() => {
    getAssessmentStatus()
  }, [getAssessmentStatus])

  const editHandler = (_project: any) => {
    setCurrentProject(_project)
  }

  const approveHandler = async () => {
    const res = await approve(currentProject._id)
    if (res.status === true) {
      axios.post('/api/users/edit-project', {
        ...currentProject,
        feedback: [
          ...currentProject.feedback,
          {
            vetter: account,
            text: feedback,
            badge,
          },
        ],
      })
      displayNotification({type: "success", message: "Approve project succeeded."})
      getProjects()
    }
  }

  const rejectHandler = async () => {
    const res = await reject(currentProject._id)
    if (res.status === true) {
      axios.post('/api/users/edit-project', {
        ...currentProject,
        feedback: [
          ...currentProject.feedback,
          {
            vetter: account,
            text: feedback,
            badge,
          },
        ],
      })
      displayNotification({type: "error", message: "Approve project failed."})
      getProjects()
    }
  }

  return (
    <>
      {permission ? (
        <Stack spacing={2}>
          <CustomContainer px="60px" py="35px">
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <Box>
                <Typography>Wallet</Typography>
                <CustomTextField1 placeholder="Enter Wallet Address" />
              </Box>
              <Box>
                <Typography>Status</Typography>
                <Typography fontWeight="bold" color="#54FEA2">
                  Active
                </Typography>
              </Box>
              <Box>
                <Typography>Username</Typography>
                <Typography fontWeight="bold">Pumpkin_1</Typography>
              </Box>
              <Box>
                <Typography>Telegram</Typography>
                <Typography fontWeight="bold">Pumpkin_2</Typography>
              </Box>
              <Box>
                <Typography># Approvals</Typography>
                <Typography fontWeight="bold">03</Typography>
              </Box>
              <Box>
                <Typography># Rejections</Typography>
                <Typography fontWeight="bold">04</Typography>
              </Box>
              <Box>
                <Typography># Total Reviewed</Typography>
                <Typography fontWeight="bold">14</Typography>
              </Box>
            </Stack>
          </CustomContainer>
          <CustomContainer px="60px" py="35px">
            <Stack
              direction="row"
              flexWrap="wrap"
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack direction="row">
                <Typography>Select Timeline</Typography>
              </Stack>
              <Stack spacing={1} direction="row">
                <CustomSelect
                  value={projectStatus}
                  onChange={(e) => setProjectStatus(e.target.value as string)}
                >
                  <MenuItem value={'All'}>All</MenuItem>
                  {PROJECT_STATUS.map((status, index) => (
                    <MenuItem value={status} key={index}>
                      {status}
                    </MenuItem>
                  ))}
                </CustomSelect>
                <CustomSelect
                  value={vettingStatus}
                  onChange={(e) => setVettingStatus(e.target.value as number)}
                >
                  <MenuItem value={0}>All</MenuItem>
                  {VETTING_STATUS.map((status, index) => (
                    <MenuItem value={index + 1} key={index}>
                      {status}
                    </MenuItem>
                  ))}
                </CustomSelect>
                <CustomSelect
                  value={submitType}
                  onChange={(e) => setSubmitType(e.target.value as number)}
                >
                  <MenuItem value={0}>All</MenuItem>
                  {LISTING_TYPE.map((status, index) => (
                    <MenuItem value={index + 1} key={index}>
                      {status}
                    </MenuItem>
                  ))}
                </CustomSelect>
              </Stack>
            </Stack>
            {pendingProjects ? (
              <Stack alignItems="center" width="100%">
                <Image
                  src="/images/app/content-loading.gif"
                  alt=""
                  width={100}
                  height={100}
                />
              </Stack>
            ) : (
              <Stack1
                spacing={1}
                mt={2}
                pr={2}
                maxHeight="400px"
                overflow="auto"
              >
                {projects.length === 0 ? (
                  <Typography textAlign="center">No Projects</Typography>
                ) : (
                  projects.map((project, index) => (
                    <ProjectDetail
                      key={index}
                      project={project}
                      index={index}
                      editHandler={editHandler}
                    />
                  ))
                )}
              </Stack1>
            )}
          </CustomContainer>
          {currentProject !== null && (
            <>
              <CustomContainer px="60px" py="35px">
                <Typography fontSize={20} fontWeight="bold" mb={2}>
                  Project Details
                </Typography>
                <Divider color="gray" />
                <Grid container mt={1} spacing={3}>
                  <Grid item lg={6} xs={12}>
                    <Stack spacing={4}>
                      <ProjectInfo
                        project={currentProject}
                        update={getProjects}
                      />
                      <LaunchInfo
                        project={currentProject}
                        update={getProjects}
                      />
                    </Stack>
                  </Grid>
                  <Grid item lg={6} md={12}>
                    <Stack spacing={4}>
                      <PresaleInfo
                        project={currentProject}
                        update={getProjects}
                      />
                      <TeamInfo project={currentProject} update={getProjects} />
                      <OfficialInfo
                        project={currentProject}
                        update={getProjects}
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </CustomContainer>
              {vetterAssessment == 0 ? (
                <CustomContainer px="60px" py="35px">
                  <Typography fontSize={20} fontWeight="bold">
                    Vetting Status
                  </Typography>
                  <Divider color="gray" />
                  <Box mt={2}>
                    <Grid container spacing={3}>
                      <Grid item lg={4} md={6} xs={12}>
                        <Typography color="#ff43f7" mb={1}>
                          Feedback from Vetters
                        </Typography>
                        <CustomTextField
                          multiline
                          fullWidth
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                        />
                      </Grid>
                      <Grid item lg={8} md={6} xs={12}>
                        <Box mt={2}>
                          <Typography ml={2}>
                            Assign a badge to the listing
                          </Typography>
                          <Stack direction="row" flexWrap="wrap">
                            {BADGE.map((_badge, index) => (
                              <Box px="4px" py="4px" key={index}>
                                <CustomRadioButton
                                  className={
                                    badge === _badge.name ? 'selected' : ''
                                  }
                                  onClick={() => setBadge(_badge.name)}
                                >
                                  {_badge.name}
                                  <Image
                                    src={_badge.icon}
                                    alt=""
                                    width={17}
                                    height={17}
                                  />
                                </CustomRadioButton>
                              </Box>
                            ))}
                          </Stack>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                  <Stack direction="row" spacing={2} mt={3}>
                    <ApproveButton color="success" onClick={approveHandler}>
                      Approve
                    </ApproveButton>
                    <RejectButton color="error" onClick={rejectHandler}>
                      Reject
                    </RejectButton>
                  </Stack>
                </CustomContainer>
              ) : (
                <></>
              )}
            </>
          )}
        </Stack>
      ) : (
        <Box mt={20}>
          <Typography fontSize={20} fontWeight="bold">
            🤦‍♀️ Oops! Looks like you are disconnected or not be a vetter.
          </Typography>
          <Stack direction="row" mt={2}>
            <Typography fontSize={20} fontWeight="bold" component="span">
              Please connect your wallet.
            </Typography>
          </Stack>
        </Box>
      )}
    </>
  )
}

const ApproveButton = styled(Button)`
  text-transform: none;
`

const RejectButton = styled(Button)`
  text-transform: none;
`

const CustomSelect = styled(Select)`
  background-color: rgba(127, 67, 255, 0.21);
  width: 116px;
  font-size: 12px;
  font-weight: bold;
  &.selected {
    background-color: #b4abf5;
  }
  & > div {
    padding: 6px 8px;
  }
  & svg {
    color: inherit;
  }
`

const CustomContainer = styled(Box)`
  position: relative;
  background-color: rgba(28, 31, 50, 0.5);
  border-radius: 12px;
`

const CustomRadioButton = styled(Button)`
  background-color: rgba(127, 67, 255, 0.21);
  border-radius: 3px;
  color: inherit;
  font-size: 10px;
  padding: 2px;
  text-transform: uppercase;
  min-height: 26px;
  min-width: 90px;
  &:hover {
    background-color: #b4abf5;
  }
  &.selected {
    background-color: #b4abf5;
  }
`

const CustomRadioButton1 = styled(CustomRadioButton)`
  min-width: 40px;
`

const CustomTextField = styled(TextField)`
  background-color: white;
  border-radius: 4px;
  // & > div:hover {
  //   border-inline: #ff43f7;
  // }
  & > div > input {
    padding: 5px 10px;
    color: black;
    font-size: 12px;
  }
  & > div.MuiInputBase-multiline {
    padding: 8px 8px;
    & > textarea {
      min-height: 80px;
      color: black;
      font-size: 12px;
    }
  }
`

const CustomTextField1 = styled(CustomTextField)`
  background-color: #483779;
  & > div > input {
    color: white;
  }
  & > div.MuiInputBase-multiline {
    & > textarea {
      color: white;
    }
  }
`

const CustomButton = styled(SubmitButton)`
  border-radius: 10px;
  width: fit-content;
  padding: 2px 26px;
  font-size: 12px;
`
const Stack1 = styled(Stack)`
  font-size: 13px;
  & p,
  span {
    font-size: 13px;
  }
`
const CustomDatePicker = styled(TextField)`
  background-color: #483779;
  border-radius: 5px;
  & input {
    font-size: 12px;
    padding: 5px 10px;
    &[type='date']::-webkit-calendar-picker-indicator {
      filter: invert(1);
      position: absolute;
      left: 5%;
    }
    &::-webkit-datetime-edit-fields-wrapper {
      position: relative;
      left: 10%;
    }
    &::-webkit-datetime-edit {
      position: relative;
      left: 10%;
    }
  }
`
