import {
  Box,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemText,
  styled,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import { Menu, Twitter, Telegram, Reddit, GitHub } from '@mui/icons-material'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ReactNode, useState } from 'react'
import { routes } from '../../config/routes'

function SocialLink(props: { href: string; children: ReactNode }) {
  return (
    <Link href={props.href} target="_blank" passHref>
      <CustomIconButton>{props.children}</CustomIconButton>
    </Link>
  )
}

function NavPanel() {
  const router = useRouter()

  return (
    <NavPanelWrapper>
      <DrawerLogo
        src="/images/app/header_logo.png"
        width={200}
        height={40}
        onClick={() => router.push('/')}
        alt=""
      />
      <Box overflow={'auto'} mb={3}>
        <List>
          {routes.map((route) => (
            <NavLink
              href={route.url}
              className={`${route.divider ? 'divide' : ''}`}
              key={route.name}
              passHref
            >
              <ListItem
                button
                key={route.key}
                selected={router.asPath === route.url}
              >
                {route.icon}
                <ListItemText primary={route.name} />
              </ListItem>
            </NavLink>
          ))}
        </List>
      </Box>
      <TrendWrapper>
        <Paragraph>CITI&nbsp;</Paragraph>
        <Paragraph>$ 120&nbsp;</Paragraph>
        <Paragraph>+ 3.8%&nbsp;</Paragraph>
        <Image
          alt="trendup"
          src={'/images/app/trendup.png'}
          width={17}
          height={15}
        />
      </TrendWrapper>
      <Stack spacing={2} ml={3} mt={2}>
        <Box>
          <Paragraph fontSize={12} fontWeight={'bold'} color="white">
            Get in touch
          </Paragraph>
          <Link href="mailto: infor@CitiWorld.io">
            <Paragraph fontSize={12}>infor@CitiWorld.io</Paragraph>
          </Link>
        </Box>
        <Stack direction={'row'} spacing={1}>
          <SocialLink href="https://twitter.com/CitiToken?t=QDx8pIZhdGkklB4hYYcHqA&s=09/">
            <Twitter />
          </SocialLink>
          <SocialLink href="https://t.me/CitizensOfficial/">
            <Telegram />
          </SocialLink>
          <SocialLink href="">
            <Reddit />
          </SocialLink>
          <SocialLink href="">
            <Image src="/images/app/Tiktok.png" width={11} height={12} alt="" />
          </SocialLink>
          <SocialLink href="">
            <Image
              src="/images/app/facebook.png"
              width={8}
              height={12}
              alt=""
            />
          </SocialLink>
          <SocialLink href="">
            <GitHub />
          </SocialLink>
        </Stack>
        <Box>
          <Paragraph fontSize={12}>@ 2022, All rights reserved.</Paragraph>
          <Paragraph fontSize={12}>Citizens Digital LLC</Paragraph>
        </Box>
      </Stack>
    </NavPanelWrapper>
  )
}

export default function NavMenu(props: {}) {
  const [open, toggleDrawer] = useState<boolean>(false)
  const router = useRouter()

  return (
    <NavMenuWrapper>
      <Hidden mdDown>
        <NavPanel />
      </Hidden>
      <Hidden mdUp>
        <CustomToolbar>
          <Image
            src="/images/app/header_logo.png"
            width={150}
            height={30}
            alt=""
          />
          <IconButton
            color="inherit"
            onClick={() => toggleDrawer((_open) => !_open)}
          >
            <Menu />
          </IconButton>
        </CustomToolbar>
        <Drawer
          anchor={'left'}
          open={open}
          onClose={() => toggleDrawer(false)}
          SlideProps={{ style: { background: 'transparent' } }}
        >
          <NavPanel />
        </Drawer>
      </Hidden>
    </NavMenuWrapper>
  )
}

const CustomIconButton = styled(IconButton)`
  background-color: #22253f;
  width: 32px;
  height: 30px;
  & > svg {
    color: #3e5aca;
    font-size: 14px;
  }
`

const Paragraph = styled(Typography)`
  font-size: 12px;
  color: #b986fd;
`

const TrendWrapper = styled(Box)`
  width: fit-content;
  margin: 0px 16px;
  padding: 2px 4px;
  display: flex;
  border: 1px solid;
  border-radius: 15px;
  border-color: #b986fd;
  & > :nth-of-type(2) {
    font-weight: bold;
  }
  & > :nth-of-type(3) {
    color: #64de19;
  }
`

const DrawerLogo = styled(Image)`
  margin-bottom: 80px;
  cursor: pointer;
`

const CustomToolbar = styled(Toolbar)`
  background-color: rgba(24, 26, 32, 0.8);
  justify-content: space-between;
  min-height: 0px;
`

const NavPanelWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 40px 30px 30px 30px;
  background-color: rgba(24, 26, 47, 0.85);
  width: 350px;
`

const NavMenuWrapper = styled(Box)`
  @media screen and (min-width: 900px) {
    width: 350px;
  }
  @media screen and (max-width: 899px) {
    position: sticky;
    width: 100vw;
  }
`

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  & > div > :first-of-type {
    margin: 0 8px 0 0;
  }
  & span {
    font-size: 13px;
  }
  &.divide > div {
    margin-bottom: 20px;
  }
  & > div {
    padding: 8px 16px;
    margin-bottom: 2px;
  }
  & > div {
    border-radius: 10px;
    &.Mui-selected {
      background-color: #7f43ff;
    }
    &:hover {
      background-color: rgba(20, 26, 47);
    }
  }
`
