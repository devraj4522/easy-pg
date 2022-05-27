import React from 'react';
import SearchComponent from './../components/SearchComponent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CoverImage from './../assets/pghunt-landing.svg';
import travelImage from './../assets/travel.svg';

import { Button, Grid, Paper } from '@mui/material';
import { grey } from '@mui/material/colors';
import { SlideShow } from '../components/SlideShow';
import { Bottom } from './Bottom';

const HomeScreen = () => {
  return (
    <>
      <Paper
        elevation={1}
        sx={{ borderRadius: 0, background: '#2d2942', p: 1, px: 6, mb: 5 }}
      >
        <Box sx={{ mx: { xs: 0, md: '15%' } }}>
          <Typography
            variant="h2"
            gutterBottom
            component="div"
            sx={{
              textAlign: 'center',
              color: '#fff',
              fontSize: {
                xs: '1.5rem',
                sm: '2rem',
                md: '2.5rem',
              },
              my: '70px',
              fontWeight: 700,
            }}
          >
            Feel Like Your Home, Best Accomodation
          </Typography>
          <SearchComponent isHome={true} />
        </Box>
      </Paper>

      <SlideShow sx={{ mt: '600px' }} />
      <Grid
        container
        sx={{
          boxSizing: 'border-box',
          my: 5,
          p: 3,
          paddingX: { md: 18, xs: 2 },
          background: '#f2f2f2',
        }}
        spacing={3}
        alignItems="space-between"
      >
        <Grid item xs={12} md={6}>
          <Typography
            varient="h2"
            sx={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, mb: 2 }}
          >
            Live in a room that takes your comfort to new heights
          </Typography>
          <Typography
            varient="body1"
            sx={{ fontSize: 18, lineHeight: 1.7, mb: 7, mt: 4 }}
          >
            Our spacious rooms are nourished with all the essential furniture,
            pleasant interiors and provide ultimate comfort to everyone. The
            common area is filled with everything you need to refresh your mind,
            soul and to take a break from the hard day.
          </Typography>
          <Button variant="outlined" color="primary">
            Primary
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <img
            src={travelImage}
            style={{
              width: '80%',
              // marginTop: 5,
              // position: 'relative',
              // bottom: 0,
              // height: '50vh',
              // zIndex: -1,
              // left: '50%',
              // right: '50%',
              // transform: 'translateX(-50%)',
            }}
            alt="landing page cover"
          />
        </Grid>
      </Grid>
      <img
        src={'https://bookmypg.co.in/assets/front/images/city-slider.png'}
        style={{
          width: '100%',
          marginTop: 5,
          // position: 'fixed',
          bottom: -1,
          // height: '50vh',
          // zIndex: -1,
          // left: '50%',
          // right: '50%',
          // transform: 'translateX(-50%)',
        }}
        alt="landing page cover"
      />
    </>
  );
};

export default HomeScreen;
