import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import Divider from '@mui/material/Divider';
import { Box } from '@mui/material';

function MessageList() {
  const items = [ // Example data
  { name: 'John Doe', avatar: 'avatar1.png', message: 'Hi there, How are you?', time: '09:00' },
  { name: 'Jessie Woo', avatar: 'avatar2.png', message: 'Working with you like dream!', time: '08:50', unread: 5 },
  { name: 'Amelia Nelson', avatar: 'avatar3.png', message: 'Hi there, How are you?', time: '08:30', unread: 5 },
]
  return (
    <Box sx={{
      width: 360,
      bgcolor: 'background.paper',
      borderRadius: 2,
      boxShadow: 5,
      border: 1,
      borderColor: 'divider',
      overflow: 'hidden',
    }}>
      <List disablePadding>
        {items.map((item, index, array) => (
          <React.Fragment key={item.name}>
            <ListItem 
              alignItems="flex-start"
              secondaryAction={
                <ListItemSecondaryAction>
                  <Typography variant="caption" fontWeight="bold">
                    {item.time}
                  </Typography>
                </ListItemSecondaryAction>
              }
            >
              <ListItemAvatar>
                <Badge
                  overlap="circular"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  badgeContent={item.unread ? item.unread : null}
                  color="primary"
                >
                  <Avatar alt={item.name} src={item.avatar} />
                </Badge>
              </ListItemAvatar>
              <ListItemText
                primary={item.name}
                secondary={item.message}
                primaryTypographyProps={{ fontWeight: 'fontWeightMedium' }}
                secondaryTypographyProps={{ noWrap: true }}
                sx={{ my: 0, overflow: 'hidden' }}
              />
            </ListItem>
            {index < array.length - 1 && (
              <Divider variant="fullWidth" component="li" />
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}

export default MessageList;
