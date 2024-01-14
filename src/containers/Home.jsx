import React from 'react';
import { Grid } from '@mui/material';

import Chat from './Chat'
import UserList from './UserList';

const HomePage = () => {

    return (
      <Grid container spacing={2}  className='home--container'>
      <Grid item xs={4}>
      <UserList />
      </Grid>
      <Grid item xs={8}>
       <Chat />
      </Grid>
    </Grid>
    );
  };
export default HomePage  