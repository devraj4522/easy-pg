import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import PGCard from '../components/PGCard';

const FavoritesScreen = () => {
  // current names
  const names = ['Sumit PG', 'Royal PG', 'Smart PG', 'Youth PG'];
  const images = [
    'https://is1-3.housingcdn.com/01c16c28/08585b06b6a981fd3b63fe58553edef7/v0/fs/3_bhk_apartment-for-sale-bikasipura-Bangalore-hall.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCbKqa9MWE5f0z8qki-3Fs6iD4X1DtWkdsSkeH4SslxoiSC2975NqS-pjZb_IuJv_3Ds0&usqp=CAU',
    'https://im.proptiger.com/1/505740/81/ivory-heights-images-for-main-other-of-ncc-ivory-heights-9665744.jpeg',
    'https://media-cdn.tripadvisor.com/media/vr-splice-j/0b/39/3b/14.jpg',
  ];
  return (
    <Box sx={{ m: 4, mx: 'auto', maxWidth: 1200 }}>
      <Typography variant="h4" gutterBottom component="div">
        Favorites
      </Typography>
      <Grid container spacing={4}>
        {names.map((name, id) => (
          <Grid key={id} item xs={12} md={4}>
            <PGCard
              photo={images[id]}
              name={name}
              address="#24 some colony Bangalore, 560078"
              amenities=""
              createdAt={Date.now()}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FavoritesScreen;
