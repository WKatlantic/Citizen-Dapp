import { Snackbar, Alert, SnackbarCloseReason } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/redux/store'
import { useNotification } from '../../store/redux/hooks/useNotification'

export const Notification = (): JSX.Element => {
  const notification = useSelector((state: RootState) => state.notification)
  const { clearNotification } = useNotification()

  const handleClose = (_: unknown, reason?: SnackbarCloseReason) =>
    reason !== 'clickaway' && clearNotification()

  return (
    <Snackbar
      open={notification.open}
      autoHideDuration={notification.timeout}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        variant="filled"
        onClose={handleClose}
        severity={notification.type}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  )
}
