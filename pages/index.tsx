import {
  Button,
  Box,
  Grid,
  styled,
  Stack,
  Typography,
  TextField,
} from '@mui/material'
import { ContentCopy } from '@mui/icons-material'
import Image from 'next/image'
import Link from 'next/link'
import SubmitButton from '../src/components/SubmitButton'
// import {CopyToClipboard} from 'react-copy-to-clipboard'

function NA() {
  return (
    <Typography fontSize={18} fontWeight="bold">
      NA
    </Typography>
  )
}

export default function Home() {
  return (
    <Box>
      <Grid
        container
        spacing={3}
        gridAutoRows="max-content"
        mb={3}
        alignItems="stretch"
      >
        <Grid item lg={8} md={6} xs={12} height="100%">
          <CustomContainer px="30px" py="25px">
            <Typography fontSize={22} fontWeight="bold">
              Access trusted
            </Typography>
            <Typography fontSize={22} mb={1} fontWeight="bold">
              and reliable DeFi opportunity
            </Typography>
            <Link
              href="https://t.me/CitizensOfficial"
              passHref
              target="_blank"
              style={{ color: '#3396F2', marginLeft: '8px' }}
            >
              t.me/CitizensOfficial
            </Link>
            <TagTypo>Only with CITI</TagTypo>
            <UnderlayedImage
              src="/images/app/diagram.png"
              alt="diagram"
              priority={true}
              width={280}
              height={120}
            />
          </CustomContainer>
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
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
      </Grid>
      <Grid container spacing={3}>
        <Grid item lg={8} md={6} xs={12}>
          <Stack spacing={3}>
            <CustomContainer>
              <Stack
                direction="row"
                alignItems="end"
                spacing={2}
                mx="30px"
                my="20px"
              >
                <Typography fontSize={20} fontWeight="bold">
                  CITI Status
                </Typography>
                <Typography
                  fontSize={13}
                  lineHeight={2.2}
                  color="rgb(171, 111, 233)"
                >
                  | Holders: Ann Black
                </Typography>
              </Stack>
              <CustomContainer px="30px" py="15px">
                <Grid container spacing={1}>
                  <Grid item lg={3} md={6} sm={3} xs={6}>
                    <Typography>Current Price</Typography>
                    <NA />
                  </Grid>
                  <Grid item lg={3} md={6} sm={3} xs={6}>
                    <Typography>Current Price</Typography>
                    <NA />
                  </Grid>
                  <Grid item lg={3} md={6} sm={3} xs={6}>
                    <Typography>Current Price</Typography>
                    <NA />
                  </Grid>
                  <Grid item lg={3} md={6} sm={3} xs={6} color="#FF43F7">
                    <Typography>Burned supply</Typography>
                    <NA />
                  </Grid>
                </Grid>
              </CustomContainer>
            </CustomContainer>
            <CustomContainer>
              <Typography fontSize={20} fontWeight="bold" mx="30px" my="20px">
                Your CITI wallet
              </Typography>
              <CustomContainer px="30px" py="15px">
                <Grid container spacing={1}>
                  <Grid item lg={3} md={6} sm={3} xs={6}>
                    <Typography>Wallet</Typography>
                    <NA />
                  </Grid>
                  <Grid item lg={3} md={6} sm={3} xs={6}>
                    <Typography>CITI Balance</Typography>
                    <NA />
                  </Grid>
                  <Grid item lg={3} md={6} sm={3} xs={6}>
                    <Typography>CITI $ Value</Typography>
                    <NA />
                  </Grid>
                  <Grid item lg={3} md={6} sm={3} xs={6} color="#FF43F7">
                    <Typography>Daily Sell Limit - CITI</Typography>
                    <NA />
                  </Grid>
                </Grid>
              </CustomContainer>
            </CustomContainer>
            <CustomContainer px="30px" py="25px">
              <Typography fontSize={20} fontWeight="bold" mb="20px">
                Your Referral Earings
              </Typography>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={2}
                flexWrap="wrap"
                mb={2}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  flexGrow={2}
                  my={1}
                >
                  <CustomTextField />
                  <ContentCopy fontSize="small" />
                </Stack>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography>Rewards Collected</Typography>
                    <NA />
                  </Box>
                  <Box>
                    <Typography>Rewards Pending</Typography>
                    <NA />
                  </Box>
                </Stack>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Button>Generate</Button>
                <SubmitButton>Claim Rewards</SubmitButton>
              </Stack>
            </CustomContainer>
          </Stack>
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <CustomContainer px="30px" pt="60px" pb="30px" height="100%">
            <Grid container spacing={2} mb={3}>
              <Grid item xs={6}>
                <Stack direction="row" spacing={1}>
                  <Typography variant="body2">Hourly Rewards</Typography>
                  <Image
                    src="/images/app/gift.png"
                    alt=""
                    width={15}
                    height={15}
                  />
                </Stack>
                <NA />
              </Grid>
              <Grid item xs={6}>
                <Stack direction="row" spacing={1}>
                  <Typography variant="body2">Listing Rewards</Typography>
                  <Image
                    src="/images/app/gift.png"
                    alt=""
                    width={15}
                    height={15}
                  />
                </Stack>
                <NA />
              </Grid>
              <Grid item xs={6}>
                <Stack direction="row" spacing={1}>
                  <Typography variant="body2">Revenue Claims</Typography>
                  <Image
                    src="/images/app/gift.png"
                    alt=""
                    width={15}
                    height={15}
                  />
                </Stack>
                <NA />
              </Grid>
              <Grid item xs={6}>
                <Stack direction="row" spacing={1}>
                  <Typography variant="body2">Revenue Claims</Typography>
                  <Image
                    src="/images/app/gift.png"
                    alt=""
                    width={15}
                    height={15}
                  />
                </Stack>
                <NA />
              </Grid>
            </Grid>
            <Typography fontSize={13}>
              <Image src="/images/app/gift.png" alt="" width={15} height={15} />
              &nbsp; Learn how to get exclusive rewards and dividends from CITI
              ecosystem here.
            </Typography>
          </CustomContainer>
        </Grid>
      </Grid>
    </Box>
  )
}

const UnderlayedImage = styled(Image)`
  position: absolute;
  right: 30px;
  top: 20px;
`

const CustomTextField = styled(TextField)`
  width: 100%;
  & fieldset {
    border-color: #ff43f7;
    border-radius: 10px;
  }
  & input {
    padding: 8px;
  }
`

const CustomContainer = styled(Box)`
  position: relative;
  background-color: rgba(28, 31, 50, 0.4);
  border-radius: 15px;
`

const CustomContainer1 = styled(CustomContainer)`
  background: linear-gradient(to left, #353dfc, #b31df1);
  padding: 25px 30px;
`

const TagTypo = styled(Typography)`
  position: absolute;
  right: 20px;
  top: 20px;
  width: fit-content;
  font-size: 13px;
  border: 1px solid rgb(224, 184, 255);
  border-radius: 15px;
  padding: 2px 4px;
  color: rgb(224, 184, 255);
  @media screen and (max-width: 1100px) {
    right: 10px;
    top: 5px;
    font-size: 11px;
  }
  @media screen and (max-width: 900px) {
    right: 20px;
    top: 20px;
    font-size: 13px;
  }
`
