'use client'
import * as React from 'react';

import type {} from '@mui/x-date-pickers/themeAugmentation';
import type {} from '@mui/x-charts/themeAugmentation';
import type {} from '@mui/x-data-grid-pro/themeAugmentation';
import type {} from '@mui/x-tree-view/themeAugmentation';
import { alpha } from '@mui/material/styles';
import { Box, Stack } from '@mui/material';

import AppTheme from '@/components/common/AppTheme';

import {
  AppNavbar,
  Header,
  MainGrid,
  SideMenu,
} from '@/components/dashboard';

import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from '@/components/dashboard/theme/customizations';

import {
  HomeRounded, AnalyticsRounded, PeopleRounded, AssignmentRounded,
} from '@mui/icons-material';


export default function Dashboard() {



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
    <AppTheme themeComponents={({
      ...chartsCustomizations,
      ...dataGridCustomizations,
      ...datePickersCustomizations,
      ...treeViewCustomizations,
    })}>
      
      <Box sx={{ display: 'flex' }}>

        <SideMenu listMenu={mainListItems} />
        <AppNavbar listMenu={mainListItems} />

        {/* Main content */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: 
              theme.cssVariables ? `rgba(${theme.palette.background.default} / 1)`
              : 
              alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            <MainGrid />
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}