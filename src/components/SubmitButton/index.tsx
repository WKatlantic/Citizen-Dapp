import { Button, styled } from '@mui/material'

const SubmitButton = styled(Button)`
  border-radius: 15px;
  text-transform: uppercase;
  background: linear-gradient(89deg, #353dfc 0%, #b31df1 100%);
  color: inherit;
  font-weight: bold;
  min-height: 36px;
  height: fit-content;
  padding: 10px 16px;
  font-size: 12px;
  box-shadow: 0px 9px 19px rgb(28 0 96 / 50%);
  &:hover {
    background: linear-gradient(89deg, #353dfc 0%, #b31df1 20%);
  }
`

export default SubmitButton
