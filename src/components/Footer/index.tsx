import { Box, Hidden, styled, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <FooterWrapper>
      <Stack
        direction="row"
        justifyContent={'space-between'}
        spacing={2}
        width="100%"
        mb={3}
      >
        <ToolLink href="">
          <Box>
            <Image
              src="/images/app/Citi-icon.png"
              alt=""
              width={30}
              height={30}
            />
            <Typography fontWeight="bold" fontSize={12}>
              citiworld.io
            </Typography>
          </Box>
        </ToolLink>
        <ToolLink href="https://www.coingecko.com/">
          <Box>
            <Image
              src="/images/app/Coingecko-icon.png"
              alt=""
              width={30}
              height={30}
            />
            <Typography fontWeight="bold" fontSize={12}>
              CoinGecko
            </Typography>
          </Box>
        </ToolLink>
        <ToolLink href="https://bscscan.com/">
          <Box>
            <Image
              src="/images/app/BSCScan-icon.png"
              alt=""
              width={30}
              height={30}
            />
            <Typography fontWeight="bold" fontSize={12}>
              BSCScan
            </Typography>
          </Box>
        </ToolLink>
        <ToolLink href="https://dextools.io/">
          <Box>
            <Image
              src="/images/app/Dextools-icon.png"
              alt=""
              width={30}
              height={30}
            />
            <Typography fontWeight="bold" fontSize={12}>
              Dextools
            </Typography>
          </Box>
        </ToolLink>
        <ToolLink href="https://coinmarketcap.com/">
          <Box>
            <Image
              src="/images/app/Coinmarketcap-icon.png"
              alt=""
              width={30}
              height={30}
            />
            <Typography fontWeight="bold" fontSize={12}>
              CMC
            </Typography>
          </Box>
        </ToolLink>
        <ToolLink href="https://poocoin.app/">
          <Box>
            <Image
              src="/images/app/Poocoin-icon.png"
              alt=""
              width={30}
              height={30}
            />
            <Typography fontWeight="bold" fontSize={12}>
              Poocoin
            </Typography>
          </Box>
        </ToolLink>
      </Stack>
      <Typography fontSize={12}>**Disclaimer</Typography>
      <Typography fontSize={12} textAlign="center">
        The Citizens team does its best to reduce the potential for scams to be
        listed, but bears no liability for others&#8189; actions outside of its
        control.
      </Typography>
    </FooterWrapper>
  )
}

const FooterWrapper = styled(Stack)`
  width: 100%;
  align-items: center;
  @media screen and (min-width: 1200px) {
    max-width: 900px;
    padding: 50px 32px 120px;
  }
  @media screen and (max-width: 1200px) {
    max-width: 900px;
    padding: 50px 32px 80px;
  }
  @media screen and (max-width: 899px) {
    max-width: 600px;
    padding: 30px 0px 20px;
  }
  @media screen and (max-width: 650px) {
    padding: 30px 20px 15px;
  }
`

const ToolLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-size: 12px;
  align-items: center;
  & > div {
    display: flex;
    gap: 3px;
    align-items: center;
  }
  @media screen and (max-width: 1050px) {
    & > div > p {
      display: none;
    }
  }
  @media screen and (max-width: 900px) {
    & > div > p {
      display: block;
    }
  }
  @media screen and (max-width: 650px) {
    & > div > p {
      display: none;
    }
  }
`
