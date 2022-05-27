import React from 'react';
import SearchComponent from './../components/SearchComponent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CoverImage from './../assets/pghunt-landing.svg';
import { Paper } from '@mui/material';
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
      <img
        src={CoverImage}
        style={{
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
