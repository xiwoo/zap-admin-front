
import * as React from 'react';

import { 
  Avatar, Box, Divider, Stack, Typography,
} from '@mui/material';

import { styled } from '@mui/material/styles';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';

import {
  HomeRounded, AnalyticsRounded, PeopleRounded, AssignmentRounded,
} from '@mui/icons-material';

import MenuContent from '../MenuContent';
import CardAlert from '../CardAlert';

import SelectContent from './SelectContent';
import OptionsMenu from './OptionsMenu';


const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

export default function SideMenu() {

  const mainListItems = [
    { id: 0, text: 'Home', icon: <HomeRounded /> },
    { 
      id: 1, text: '회원관리', icon: <AnalyticsRounded />,
      childrenMenu: [
        { id: 4, text: '신규 가입자 목록 조회', icon: <AssignmentRounded /> },
        { id: 5, text: '회원 정보 조회', icon: <AssignmentRounded /> },
        { id: 6, text: '신고 회원 조회', icon: <AssignmentRounded /> },
      ],
    },
    { id: 2, text: '상품관리', icon: <PeopleRounded />,
      childrenMenu: [
        { id: 7, text: '결제 상품 관리', icon: <AssignmentRounded /> }
      ]
    },
    { id: 3, text: '관리자 관리', icon: <AssignmentRounded />, },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          mt: 'calc(var(--template-frame-height, 0px) + 4px)',
          p: 1.5,
        }}
      >
        <SelectContent />
      </Box>
      <Divider />
      <Box
        sx={{
          overflow: 'auto',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <MenuContent listMenu={mainListItems} />
        {/* <CardAlert /> */}
      </Box>
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Avatar
          sizes="small"
          alt="Riley Carter"
          src="/static/images/avatar/7.jpg"
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: 'auto' }}>
          <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
            Riley Carter
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            riley@email.com
          </Typography>
        </Box>
        <OptionsMenu />
      </Stack>
    </Drawer>
  );
}