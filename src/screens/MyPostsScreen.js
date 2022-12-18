import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { viewAllPosts } from './../redux/actions/postActions';
import Grid from '@mui/material/Grid';
import MyPGPostCard from './../components/MyPGPostCard';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Bottom } from './Bottom';
import { Paper } from '@mui/material';
import { grey } from '@mui/material/colors';

const MyPostsScreen = () => {
  const dispatch = useDispatch();
  const { all_posts } = useSelector((state) => state.posts?.viewAllPosts);
  useEffect(() => {
    dispatch(viewAllPosts());
  }, [dispatch]);
  return (
    <>
      <Box sx={{ m: 3 }}>
        <Paper
          elevation={1}
          sx={{
            background: '#bb86fc',
            py: 1,
            mb: 4,
            maxWidth: 300,
            mx: 'auto',
          }}
        >
          <Typography
            variant="h4"
            sx={{ textAlign: 'center', color: '#fff' }}
            gutterBottom
          >
            Your PG
          </Typography>
        </Paper>
        <Grid container spacing={2} alignItems="space-around">
          {all_posts?.map((post) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              sx={{ display: 'flex' }}
              key={post.postid}
            >
              {post && (
                <MyPGPostCard
                  postid={post.postid}
                  name={post.name}
                  address={post.address}
                  photo={post.photo}
                />
              )}{' '}
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default MyPostsScreen;
