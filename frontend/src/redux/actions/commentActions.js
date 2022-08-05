import axios from 'axios';
import {
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAIL,
  EDIT_REVIEW_REQUEST,
  EDIT_REVIEW_SUCCESS,
  EDIT_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  VIEW_REVIEW_REQUEST,
  VIEW_REVIEW_SUCCESS,
  VIEW_REVIEW_FAIL,
  VIEW_ALL_REVIEWS_REQUEST,
  VIEW_ALL_REVIEWS_SUCCESS,
  VIEW_ALL_REVIEWS_FAIL,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAIL,
} from '../constants/reviewConstrants.js';
import { toast } from 'react-toastify';

export const createReview = (reviewDetails) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_REVIEW_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      '/api/reviews/createpost',
      reviewDetails,
      config
    );

    dispatch({
      type: CREATE_REVIEW_SUCCESS,
      payload: data,
    });

    toast.success(`Review Created successfully!`);
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    toast.error(`Error: ${err}`);
    dispatch({
      type: CREATE_REVIEW_FAIL,
      payload: err,
    });
  }
};

export const editReview =
  (reviewId, reviewDetails) => async (dispatch, getState) => {
    try {
      dispatch({
        type: EDIT_REVIEW_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/reviews/${reviewId}`,
        reviewDetails,
        config
      );

      dispatch({
        type: EDIT_REVIEW_SUCCESS,
        payload: data,
      });

      toast.success(`Review Edited successfully!`);
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      toast.error(`Error: ${err}`);
      dispatch({
        type: EDIT_REVIEW_FAIL,
        payload: err,
      });
    }
  };

export const deleteReview = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_REVIEW_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/reviews/${id}`, config);
    dispatch({
      type: DELETE_REVIEW_SUCCESS,
    });

    dispatch(viewAllReviews());

    toast.success(`Review Deleted successfully!`);
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    toast.error(`Error: ${err}`);
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: err,
    });
  }
};

export const viewReview = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: VIEW_REVIEW_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const {
      posts: {
        viewPost: { current_post },
      },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const postId = current_post.id;
    const { data } = await axios.post(
      '/api/reviews/getreview',
      { postId },
      config
    );
    dispatch({
      type: VIEW_REVIEW_SUCCESS,
      payload: data,
    });
    // console.log(getState());
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    toast.error(`Error: ${err}`);
    dispatch({
      type: VIEW_REVIEW_FAIL,
      payload: err,
    });
  }
};

export const viewAllReviews = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: VIEW_ALL_REVIEWS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/reviews/`, config);

    dispatch({
      type: VIEW_ALL_REVIEWS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    toast.error(`Error: ${err}`);
    dispatch({
      type: VIEW_ALL_REVIEWS_FAIL,
      payload: err,
    });
  }
};

export const searchAction = (search) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SEARCH_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/reviews/search`, search, config);

    dispatch({
      type: SEARCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    toast.error(`Error: ${err}`);
    dispatch({
      type: SEARCH_FAIL,
      payload: err,
    });
  }
};
