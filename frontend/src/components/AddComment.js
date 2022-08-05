import {
  Grid,
  Paper,
  FormControl,
  FormLabel,
  FormHelperText,
  TextField,
  Button,
  ButtonGroup,
  IconButton,
  Rating,
  Box,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useDispatch, useSelector } from 'react-redux';
import HoverRating from './HoverRating';
import { createReview } from '../redux/actions/commentActions';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddComment = () => {
  const [title, setTile] = useState('');
  const [body, setBody] = useState('');
  const [url, setUrl] = useState('');
  const [rating, setRating] = useState(1);
  const { current_post } = useSelector((state) => state.posts?.viewPost);
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewFormat = {
      post: current_post.id,
      title: title,
      description: body,
      rating: rating,
      media: url,
    };
    dispatch(createReview(reviewFormat));
    setBody('');
    setTile('');
    setUrl('');
    setRating(1);
    history(0);
  };

  return (
    <Paper
      sx={{
        mt: 3,
        mx: { xs: 1, sm: 5 },
        maxWidth: 'sm',
      }}
      elevation={0}
      component="form"
      onSubmit={async (e) => {
        handleSubmit(e);
      }}
    >
      <h1>Submit Your Review</h1>
      <FormControl fullWidth>
        <FormLabel
          sx={{ fontSize: '1.3rem', fontWeight: '700', lineHeight: '0.5' }}
          component="h4"
        >
          How Do You Like..
        </FormLabel>
        <TextField
          placeholder="How was your experience.."
          sx={{ paddingTop: 0.3 }}
          value={title}
          onChange={(e) => setTile(e.target.value)}
        />
        <TextField
          placeholder="Add Url"
          sx={{ paddingTop: 1 }}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <TextField
          placeholder="Explain A Bit.."
          sx={{ paddingTop: 1 }}
          fullWidth={true}
          id="text"
          multiline
          minRows={4}
          maxRows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <ButtonGroup
          disableElevation
          sx={{ my: 2, justifyContent: 'space-between' }}
          variant={'outlined'}
          color="secondary"
          aria-label="outlined secondary button group"
        >
          <HoverRating setValue={setRating} />

          <Button
            type="submit"
            size="large"
            color="secondary"
            variant="contained"
          >
            Submit Review
          </Button>
        </ButtonGroup>
      </FormControl>
    </Paper>
  );
};

export default AddComment;
