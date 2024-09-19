import { Box, Button, Stack, Typography, useTheme } from '@mui/material'
import Image from 'next/image'
import Verified from '../../../public/images/verified-icon.svg'
import { supportedChains } from '../../constants/chains'
import { useChainContext } from '../../contexts/ChainContext/hooks'
import { AlignedRow } from '../Box/AlignedRow'
import {
  ModalButton,
  ModalCancelButton,
  ModalOutlineButton,
} from '../Button/ModalButton'
import theme from '../../theme'
import { SuccessAlert, WarningAlert } from '../Alert/InfoAlert'
import { NetworkDropdown } from '../Dropdowns/NetworkDropdown'
import { useMemo, useState } from 'react'
import { AccessToken } from '../../hooks/useAccessToken'
import { formatAddress } from '../../utils/formatAddress'
import { format } from 'date-fns'

interface CompliantCardProps {
  loading: boolean
  onCheckCompliance: () => void
  onMintToken: () => void
  onBridgeToken: (sourceChainId: number) => void
  mintLoading: boolean
  bridgeLoading: boolean
  isAuthorized: boolean
  accessToken: AccessToken | null
}

export const CompliantCard = ({
  loading,
  onCheckCompliance,
  onMintToken,
  onBridgeToken,
  mintLoading,
  bridgeLoading,
  isAuthorized,
  accessToken,
}: CompliantCardProps) => {
  const [sourceChainId, setSourceChainId] = useState<number>(0)
  const theme = useTheme()

  const onSelectSourceChain = (chainId: number) => {
    setSourceChainId(chainId)
  }

  const onBridge = () => {
    onBridgeToken(sourceChainId)
  }

  const expiresAt = useMemo(() => {
    if (!accessToken) return ''
    return format(new Date(+accessToken.expiresAt * 1000), 'PPP')
  }, [accessToken])
  return (
    <Stack
      spacing={theme.spacing(4)}
      width={'100%'}
    >
      <Stack spacing={theme.spacing(1)}>
        <AlignedRow width={'100%'}>
          <Typography variant='heading-2xl'>
            Verify your wallet address
          </Typography>
          <ModalButton
            title='Refresh'
            onClick={onCheckCompliance}
          />
        </AlignedRow>
        <SuccessAlert text='Your wallet address has been verified' />
      </Stack>

      <Stack spacing={theme.spacing(1)}>
        <Typography
          variant='heading-2xl'
          sx={{
            textAlign: 'left',
          }}
        >
          Mint access token
        </Typography>

        {!isAuthorized || !accessToken ? ( // Haven't mint token access
          <Stack spacing={theme.spacing(1)}>
            <WarningAlert
              text={`You currently do not have an access token. An access token is required to proceed with accessing our platform’s features and services. You can either choose to mint a access token or`}
            />

            <Box
              sx={{
                background: 'white',
                padding: '16px',
                borderRadius: '12px',
                width: '100%',
              }}
            >
              <Stack
                sx={{
                  width: '100%',
                  background: theme.palette.other.primary.p950,
                  padding: '54px 12px',
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px dashed rgba(56, 78, 183, 0.30)',
                }}
              >
                <ModalButton
                  title='Mint access token'
                  loading={mintLoading}
                  onClick={onMintToken}
                  sx={{
                    width: '100%',
                  }}
                />

                <Stack
                  direction={'row'}
                  justifyContent={'space-between'}
                  width={'100%'}
                  spacing={theme.spacing(2)}
                >
                  <NetworkDropdown onSelect={onSelectSourceChain} />
                  <ModalOutlineButton
                    title='Bridge from another chain'
                    loading={bridgeLoading}
                    onClick={onBridge}
                    sx={{
                      width: '100%',
                    }}
                  />
                </Stack>
              </Stack>
            </Box>
          </Stack>
        ) : (
          // Minted token
          <Box
            sx={{
              background: theme.palette.other.neutral.n50,
              padding: '24px',
              borderRadius: '12px',
              border: '1px solid rgba(61, 76, 68, 0.00)',
            }}
          >
            <Box
              sx={{
                background: theme.palette.other.primary.p950,
                padding: '12px 20px',
                borderRadius: '12px',
                border: `1px solid ${theme.palette.primary.main}`,
              }}
            >
              <AlignedRow width={'100%'}>
                <Typography
                  variant='body-sm'
                  fontWeight={600}
                  color='black'
                >
                  {formatAddress(accessToken.receiverAddress)}
                </Typography>
                <Stack
                  direction={'row'}
                  spacing={theme.spacing(0.5)}
                  alignItems={'center'}
                >
                  <Image
                    src='/images/time-icon.svg'
                    alt='time'
                    width={18}
                    height={18}
                  />
                  <Typography
                    variant='body-sm'
                    color='black'
                  >
                    Validate until <b>{expiresAt}</b>
                  </Typography>
                </Stack>
              </AlignedRow>
            </Box>
          </Box>
        )}
      </Stack>
    </Stack>
  )
}