import { Stack, Box, styled } from '@mui/material'

export default function LoadingRow(props: { cols: number }) {
  const { cols } = props

  return (
    <Stack direction="row" justifyContent="space-between" spacing={3} py="15px">
      {Array.from({ length: cols }).map((_, index) => (
        <LoadingSection key={index} />
      ))}
    </Stack>
  )
}

const LoadingSection = styled(Box)`
  background: linear-gradient(
    to right,
    #0000 0%,
    #fff5 45%,
    #fff5 55%,
    #0000 100%
  );
  animation-duration: 3s;
  animation-name: LoadingRowSection;
  animation-iteration-count: infinite;
  height: 25px;
  width: 100%;
  border-radius: 15px;
  background-size: 200% 100%;
`
