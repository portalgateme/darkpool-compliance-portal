import {
  Button,
  CircularProgress,
  Stack,
  SxProps,
  Typography,
  styled,
  useTheme,
} from '@mui/material'

const StyledModalButton = styled(Button)(({ theme }) => {
  return {
    color: theme.palette.secondary.main,
    padding: '12px 20px',
    height: '48px',
  }
})

interface ModalButtonProps {
  onClick: () => void
  disabled?: boolean
  loading?: boolean
  title: string
  sx?: SxProps
}

export const ModalButton: React.FC<ModalButtonProps> = ({
  onClick,
  disabled = false,
  loading = false,
  title,
  sx,
}) => {
  const theme = useTheme()

  return (
    <StyledModalButton
      onClick={onClick}
      disableRipple
      disabled={disabled}
      sx={sx}
    >
      <Stack
        alignItems={'center'}
        justifyContent={'center'}
        direction={'row'}
      >
        {loading && (
          <CircularProgress
            size={20}
            sx={{ marginRight: '10px', color: theme.palette.other.primary.p50 }}
          />
        )}
      </Stack>{' '}
      <Typography
        variant='button'
        color={theme.palette.secondary.main}
      >
        {title}
      </Typography>
    </StyledModalButton>
  )
}

export const StyledModalOutlineButton = styled(Button)(({ theme }) => {
  return {
    color: theme.palette.secondary.main,
    background: theme.palette.other.primary.p800,
    border: `1px solid ${theme.palette.primary.main}`,
    padding: '12px 20px',
    height: '48px',
  }
})

export const ModalOutlineButton: React.FC<ModalButtonProps> = ({
  onClick,
  disabled = false,
  loading = false,
  title,
  sx,
}) => {
  const theme = useTheme()

  return (
    <StyledModalOutlineButton
      onClick={onClick}
      disableRipple
      disabled={disabled}
      sx={sx}
    >
      <Stack
        alignItems={'center'}
        justifyContent={'center'}
        direction={'row'}
      >
        {loading && (
          <CircularProgress
            size={20}
            sx={{ marginRight: '10px' }}
          />
        )}
      </Stack>{' '}
      <Typography
        variant='button'
        color={theme.palette.secondary.main}
      >
        {title}
      </Typography>
    </StyledModalOutlineButton>
  )
}

export const ModalCancelButton = styled(Button)(({ theme }) => {
  return {
    color: '#BBD0C5',
    height: '48px',
    padding: '12px 20px',
    background: '#17181C',
    border: '1px solid #576E63',
    '&:hover': {
      backgroundColor: '#17181C',
    },
  }
})

export const ModalSmallButton = styled(Button)(({ theme }) => {
  return {
    color: theme.palette.secondary.main,
    padding: '6px 8px',
    height: '32px',
    fontSize: '0.875rem',
    lineHeight: '114.286%',
    fontWeight: '600',
    letterSpacing: '-0.21px',
    gap: '8px',
  }
})
