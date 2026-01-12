import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

function RenderRow({name}) {

  return (
    <ListItem  component="div" disablePadding>
      <ListItemButton>
        <ListItemText sx={{textAlign:"center"}} primary={name} />
      </ListItemButton>
    </ListItem>
  );
}

export default RenderRow