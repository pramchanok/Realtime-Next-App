/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { usePathname } from 'next/navigation';
import { io } from 'socket.io-client';
import CloudOff from '@mui/icons-material/CloudOff';
import Cloud from '@mui/icons-material/Cloud';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }: any) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}));

export default function NavbarBreadcrumbs() {
  const pathname = usePathname();
  const socketClient = io('http://localhost:4000');
  const [isConnected, setIsConnected] = React.useState(false);

  React.useEffect(() => {
    if (socketClient.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socketClient.on('connect', onConnect);
    socketClient.on('disconnect', onDisconnect);
    return () => {
      socketClient.off('connect', onConnect);
      socketClient.off('disconnect', onDisconnect);
      socketClient.disconnect();
    }
  }, []);

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      {isConnected ? <Cloud color='success'></Cloud> : <CloudOff color='error'></CloudOff>}
      <Typography variant="h5">ยินดีต้อนรับ</Typography>
      <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
        {pathname}
      </Typography>
    </StyledBreadcrumbs>
  );
}
