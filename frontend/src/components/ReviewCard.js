import React, { useState, useEffect, useCallback, useRef } from 'react';
import { withStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Box, CardMedia, Rating } from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { viewReview } from '../redux/actions/commentActions';
import {
  blue,
  green,
  grey,
  lightBlue,
  pink,
  purple,
} from '@mui/material/colors';

const styles = {
  card: {},
  cardHeader: {
    padding: '1.5rem',
    lineHeight: 1,
  },
  cardContent: {
    paddingTop: '4px',
  },
  heading: {
    fontWeight: '600',
    color: '#9e9e9e',
  },
};

function ReviewCard(props) {
  const { current_post } = useSelector((state) => state.posts?.viewPost);
  const dispatch = useDispatch();
  const { current_review } = useSelector((state) => state.reviews?.viewReview);

  useEffect(() => {
    dispatch(viewReview(current_post.id));
  }, [dispatch, viewReview, current_post]);

  const { classes, avatarSrc, name, review } = props;

  return (
    <>
      {current_review?.map((item, index) => (
        <Card
          key={index}
          className={classes.card}
          sx={{
            mt: 3,
            mx: { xs: 1, sm: 5 },
            maxWidth: '800px',
          }}
        >
          <CardHeader
            classes={{ root: classes.cardHeader }}
            avatar={<Avatar src={avatarSrc} />}
            sx={{
              background: grey[50],
              px: { xs: 1, sm: 5 },
            }}
            component="div"
            title={
              <>
                <h3
                  style={{
                    color: '#64778b',
                    fontSize: '1.2rem',
                    marginBottom: '0.5rem',
                    marginTop: '0.5rem',
                    color: '#6D28D9',
                  }}
                >
                  {item.title}
                </h3>
                <Typography
                  component={'h3'}
                  sx={{
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    pl: '0.1rem',
                    pt: 0.3,
                    color: grey[700],
                    fontWeight: 600,
                  }}
                >
                  {item.createdBy.userName}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                  component="div"
                >
                  <Rating
                    sx={{ p: '-1px' }}
                    value={item.rating}
                    max={5}
                    readOnly
                  />{' '}
                  <Typography
                    varient="body2"
                    sx={{
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      color: grey[50],
                      py: 0.5,
                      px: 1,
                      borderRadius: 2,
                      background: '#A855F7',
                    }}
                  >
                    {new Date(item.createdAt).toLocaleDateString('en-us', {
                      day: 'numeric',
                      year: 'numeric',
                      month: 'short',
                    })}
                  </Typography>
                </Box>
              </>
            }
          />
          <CardContent
            classes={{ root: classes.cardContent }}
            sx={{ p: 0, m: 0, mt: -1 }}
          >
            {/* <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                px: 1,
                py: 2,
              }}
              component="div"
            ></Box> */}
            <CardMedia
              component="img"
              height="350"
              sx={{ borderRadius: 0, m: 0, p: 0 }}
              src={
                item.media.length
                  ? item.media[0]
                  : `https://images.oyoroomscdn.com/uploads/hotel_image/104304/2b9c39bfa91cc571.jpg`
              }
              loading="lazy"
            />

            <Box>
              <Typography component="p" sx={{ px: 1, pt: 1 }}>
                <span style={{ fontWeight: 600 }}>Description:</span>{' '}
                {' ' + item.description}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export default withStyles(styles)(ReviewCard);
