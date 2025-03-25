
import * as React from 'react';

import {
  List, ListItem, ListItemButton, ListItemIcon, ListItemText, 
  Stack,
  IconButton,
  Collapse,
} from '@mui/material';

import {
  SettingsRounded, InfoRounded, HelpRounded, ExpandLess, ExpandMore,
} from '@mui/icons-material';

import { ListMenu } from '@/types';

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRounded /> },
  { text: 'About', icon: <InfoRounded /> },
  { text: 'Feedback', icon: <HelpRounded /> },
];

const createListMenu = (item: ListMenu, idx: number, menuOpenState: [ Record<number, boolean>, Function ], handleClick: Function) => {

  const { id, text, icon } = item;
  const [ menuOpen, setMenuOpen ] = menuOpenState;
  const isOpen = menuOpen[id];

  return (
    <div key={idx} >
      <ListItem 
        disablePadding sx={{ display: 'block' }}
        secondaryAction={ item.childrenMenu &&
          (
            <IconButton edge="end" aria-label="delete" className='h-6 w-6 rounded-full border-none'
              onClick={() => handleClick(id)}
            >
              { isOpen ? <ExpandLess /> : <ExpandMore /> }
            </IconButton>
          ) 
        }
      >
        <ListItemButton selected={id === 0}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      </ListItem>
      {
        item.childrenMenu &&
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.childrenMenu.map((subItem, subIdx) => createListMenu(subItem, subIdx, menuOpenState, handleClick))}
          </List>
        </Collapse>
      }
    </div>
  )
}

const collectMenuIds = (menuList: ListMenu[]): number[] => {
  return menuList.reduce((acc: number[], item) => {
    acc.push(item.id);  // 현재 항목의 id 추가
    if (item.childrenMenu) { // 자식 메뉴가 있으면 자식 메뉴의 id도 추가
      item.childrenMenu.forEach(child => acc.push(child.id));
    }
    return acc;
  }, []);
}

const MainContent = ( { listMenu }: { listMenu: ListMenu[] } ) => {

  const menuOpenState = React.useState<Record<number, boolean>>( collectMenuIds(listMenu).reduce((obj, id) => ({...obj, [id]: false}), {}) );

  const [ menuOpen, setMenuOpen ] = menuOpenState;

  const handleClick = (openId: number) => {
    setMenuOpen({
      ...menuOpen,
      [openId]: !menuOpen[openId]
    });
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>

      <List dense key={'main-0'}>
        {listMenu.map((item, idx) => createListMenu(item, idx, menuOpenState, handleClick))}
      </List>

      <List dense key={'secondary'}>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

    </Stack>
  );
}

export default MainContent;