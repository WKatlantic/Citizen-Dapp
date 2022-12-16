import { BiPlusCircle } from 'react-icons/bi'
import { RiImageFill } from 'react-icons/ri'
import { AiOutlineUser } from 'react-icons/ai'
import { BsFillBookmarkPlusFill } from 'react-icons/bs'
import { BsList } from 'react-icons/bs'
import { AiOutlineHeart } from 'react-icons/ai'
import { MdCollectionsBookmark } from 'react-icons/md'
import { MdSwapCalls } from 'react-icons/md'
import { MdOutlineNoteAlt } from 'react-icons/md'
import { createElement } from 'react'
import { Route } from '../types/Route'

export const routes: Route[] = [
  {
    name: 'listing',
    url: '/listing',
    key: 'listing',
    icon: createElement(BsList),
    divider: false,
  },
  {
    name: 'My account',
    url: '/myaccount',
    key: 'MyAccount',
    icon: createElement(AiOutlineUser),
    divider: true,
  },
  {
    name: 'Fundraisings',
    url: '/fundraisings',
    key: 'Fundraisings',
    icon: createElement(BsFillBookmarkPlusFill),
    divider: false,
  },
  {
    name: 'Presale',
    url: '/presale',
    key: 'Presale',
    icon: createElement(MdCollectionsBookmark),
    divider: true,
  },
  {
    name: 'Dashboard',
    url: '/',
    key: 'Dashboard',
    icon: createElement(BiPlusCircle),
    divider: false,
  },
  {
    name: 'Swap',
    url: '/swap',
    key: 'Swap',
    icon: createElement(MdSwapCalls),
    divider: true,
  },
  {
    name: 'Mint NFT',
    url: '/mint-nft',
    key: 'MintNFT',
    icon: createElement(RiImageFill),
    divider: true,
  },
  {
    name: 'Merch',
    url: '/merch',
    key: 'Merch',
    icon: createElement(AiOutlineHeart),
    divider: false,
  },
  {
    name: 'GitBook',
    url: '/gitbook',
    key: 'GitBook',
    icon: createElement(MdOutlineNoteAlt),
    divider: false,
  },
]
